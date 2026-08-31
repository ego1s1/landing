import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(`Spotify auth error: ${error}`, { status: 400, headers: { "Content-Type": "text/html" } });
  }

  if (!code) {
    const expectedProd = "https://ego1s1.vercel.app/api/spotify/callback";
    const expectedLocal = "http://127.0.0.1:3000/api/spotify/callback";
    const html = `
      <html>
        <head><title>Spotify Link</title></head>
        <body style="font-family: monospace; padding: 2rem; background: #272e33; color: #d3c6aa; max-width: 700px; margin: 0 auto;">
          <h2>Link your Spotify</h2>
          <p style="color: #e67e80; background: #2e383c; border: 1px solid #4a555b; padding: 0.75rem; border-radius: 4px;"><strong>Fix “redirect_uri: Not matching”: </strong> Spotify requires an <em>exact</em> match.</p>
          <p>1. Go to <a href="https://developer.spotify.com/dashboard" target="_blank" style="color: #7fbbb3;">developer.spotify.com/dashboard</a> → Your App → <strong>Settings → Redirect URIs</strong></p>
          <p>2. Add <strong>both</strong> URIs exactly (no trailing slash) and click <strong>Save</strong>:</p>
          <pre style="background: #2e383c; border: 1px solid #4a555b; padding: 1rem; border-radius: 4px; font-size: 12px; overflow-x: auto;">${expectedProd}
${expectedLocal}</pre>
          <p>3. Ensure Vercel env has <code>SPOTIFY_CLIENT_ID</code> + <code>SPOTIFY_CLIENT_SECRET</code> → Redeploy if you just added them.</p>
          <p>4. Visit: <a href="/api/spotify/login" style="color: #7fbbb3;">/api/spotify/login</a> (use <code>http://127.0.0.1:3000</code> locally, not <code>localhost</code>) → Authorize → you’ll see your <code>refresh_token</code> here.</p>
          <p style="font-size: 12px; color: #9da9a0;">If you still see the error, the code sent <code>${getRedirectUri()}</code> — ensure <em>that exact string</em> is whitelisted above.</p>
        </body>
      </html>
    `;
    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse("Missing SPOTIFY_CLIENT_ID/SECRET env", { status: 500 });
  }

  function getRedirectUri(): string {
    if (process.env.SPOTIFY_REDIRECT_URI) return process.env.SPOTIFY_REDIRECT_URI;
    const origin = req.nextUrl.origin;
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return "http://127.0.0.1:3000/api/spotify/callback";
    }
    return "https://ego1s1.vercel.app/api/spotify/callback";
  }
  const redirectUri = getRedirectUri();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return new NextResponse(`Token exchange failed: ${JSON.stringify(data)}`, { status: 500, headers: { "Content-Type": "text/html" } });
  }

  const html = `
    <html>
      <head><title>Spotify Linked</title></head>
      <body style="font-family: monospace; padding: 2rem; background: #272e33; color: #d3c6aa; max-width: 700px; margin: 0 auto;">
        <h2 style="color: #a7c080;">✓ Spotify linked!</h2>
        <p>Copy this <code style="background: #2e383c; padding: 2px 6px; border-radius: 3px;">refresh_token</code> to your Vercel env as <code>SPOTIFY_REFRESH_TOKEN</code>:</p>
        <pre style="background: #2e383c; border: 1px solid #4a555b; padding: 1rem; border-radius: 4px; overflow-x: auto; word-break: break-all; font-size: 12px;">${data.refresh_token}</pre>
        <p style="color: #9da9a0; font-size: 12px;">Also ensure <code>SPOTIFY_CLIENT_ID</code> and <code>SPOTIFY_CLIENT_SECRET</code> are set. Redeploy after adding.</p>
        <p><a href="/" style="color: #7fbbb3;">← Back to site</a></p>
      </body>
    </html>
  `;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
