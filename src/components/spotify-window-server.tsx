import { getSpotifyData } from "@/lib/spotify";
import { SpotifyWindow } from "@/components/spotify-window";

// Server component: fetches with 60s CDN cache, falls back gracefully.
// Wrapped in Suspense with skeleton so first paint has instant placeholder (no CLS).
export async function SpotifyWindowServer() {
  const data = await getSpotifyData();
  // Pass null if not configured — client will show mock after hydration
  return <SpotifyWindow initialData={data} />;
}
