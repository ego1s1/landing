import { NextResponse } from "next/server";
import { getSpotifyData, SPOTIFY_REVALIDATE_SECONDS } from "@/lib/spotify";

export const revalidate = 60;

export async function GET() {
  const hasEnv = !!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET && process.env.SPOTIFY_REFRESH_TOKEN);
  if (!hasEnv) {
    return NextResponse.json({ error: "Spotify not configured" }, { status: 503 });
  }

  try {
    const data = await getSpotifyData();
    if (!data) return NextResponse.json({ error: "Spotify API failed" }, { status: 502 });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${SPOTIFY_REVALIDATE_SECONDS}, stale-while-revalidate=120, stale-if-error=300`,
        "CDN-Cache-Control": `public, s-maxage=${SPOTIFY_REVALIDATE_SECONDS}, stale-while-revalidate=120`,
        "Vercel-CDN-Cache-Control": `public, s-maxage=${SPOTIFY_REVALIDATE_SECONDS}, stale-while-revalidate=120`,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
