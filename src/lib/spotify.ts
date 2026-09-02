export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  previewUrl?: string | null;
  playedAt?: string;
  isPlaying: boolean;
}

export interface SpotifyData {
  tracks: SpotifyTrack[];
  current: SpotifyTrack | null;
}

export const SPOTIFY_REVALIDATE_SECONDS = 60;

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as SpotifyTokenResponse;
  return data.access_token;
}

export async function getSpotifyData(): Promise<SpotifyData | null> {
  const hasEnv = !!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET && process.env.SPOTIFY_REFRESH_TOKEN);
  if (!hasEnv) return null;

  try {
    const token = await getAccessToken();
    if (!token) return null;
    const headers = { Authorization: `Bearer ${token}` };

    let current: SpotifyTrack | null = null;

    try {
      const nowRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers,
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      });
      if (nowRes.status === 200) {
        const text = await nowRes.text();
        if (text) {
          const json = JSON.parse(text) as {
            is_playing: boolean;
            item: {
              name: string;
              artists: { name: string }[];
              album: { name: string; images: { url: string }[] };
              external_urls: { spotify: string };
              preview_url: string | null;
            };
          };
          if (json.item) {
            current = {
              name: json.item.name,
              artist: json.item.artists.map((a) => a.name).join(", "),
              album: json.item.album.name,
              image: json.item.album.images[0]?.url ?? "",
              url: json.item.external_urls.spotify,
              previewUrl: json.item.preview_url,
              isPlaying: json.is_playing,
            };
          }
        }
      }
    } catch {
      // ignore
    }

    const recentRes = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=7", {
      headers,
      // Don't use no-store here — allow Vercel Data Cache revalidate via route layer.
      // For direct getSpotifyData() calls (server component), we want manual revalidate control.
      // Use cache: no-store and let caller cache at route/page level via revalidate.
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!recentRes.ok) {
      if (current) return { tracks: [current], current };
      return null;
    }

    const recentJson = (await recentRes.json()) as {
      items: {
        track: {
          name: string;
          artists: { name: string }[];
          album: { name: string; images: { url: string }[] };
          external_urls: { spotify: string };
          preview_url: string | null;
        };
        played_at: string;
      }[];
    };

    const recentTracks: SpotifyTrack[] = recentJson.items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      album: item.track.album.name,
      image: item.track.album.images[0]?.url ?? "",
      url: item.track.external_urls.spotify,
      previewUrl: item.track.preview_url,
      playedAt: item.played_at,
      isPlaying: false,
    }));

    let tracks: SpotifyTrack[] = [];
    if (current && current.isPlaying) {
      tracks.push(current);
      for (const t of recentTracks) {
        if (tracks.length >= 7) break;
        if (t.name === current.name && t.artist === current.artist) continue;
        tracks.push(t);
      }
    } else {
      tracks = recentTracks.slice(0, 7);
    }

    return { tracks, current };
  } catch {
    return null;
  }
}
