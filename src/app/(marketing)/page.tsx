import StreamingExperience from "@/components/home/StreamingExperience";
import { type DestinationKey } from "@/components/home/data";

const destinations = new Set<DestinationKey>(["websites", "apps", "ai", "creative", "everything"]);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ dest?: string }>;
}) {
  const params = await searchParams;
  const initialDest = destinations.has(params.dest as DestinationKey) ? (params.dest as DestinationKey) : null;
  return <StreamingExperience initialDest={initialDest} />;
}
