import { NextRequest, NextResponse } from "next/server";

function getRedirectUri(req: NextRequest): string {
  if (process.env.SPOTIFY_REDIRECT_URI) return process.env.SPOTIFY_REDIRECT_URI;
  const origin = req.nextUrl.origin;
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return "http://127.0.0.1:3000/api/spotify/callback";
  }
  // Always use canonical prod URL for any vercel.app (previews would otherwise need whitelisting each deploy)
  return "https://ego1s1.vercel.app/api/spotify/callback";
}

export async function GET(req: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Missing SPOTIFY_CLIENT_ID" }, { status: 500 });
  }

  const redirectUri = getRedirectUri(req);
  const scope = "user-read-recently-played user-read-currently-playing";
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope,
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
