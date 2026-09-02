import { getContributions, generateMockContributions } from "@/lib/github";
import { GitHubContributions } from "@/components/github-contributions";

// Server component: fetches at build/ISR time via Vercel Data Cache (6h).
// Never throws — falls back to mock so Suspense always resolves.
export async function GitHubContributionsServer() {
  const data = await getContributions();
  // Always provide something so first paint has content (SSR) not just skeleton.
  // If upstream down, use deterministic mock seeded today (cheap, keeps layout stable).
  const initialData = data ?? generateMockContributions();

  return <GitHubContributions initialData={initialData} />;
}
