import Categories from "@/components/home/categories";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import LatestGuides from "@/components/home/latest-guides";
import PlatformsGrid from "@/components/home/platforms-grid";
import { getPlatforms } from "@/lib/supabase/platforms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const platforms = await getPlatforms();

  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <Hero />
      <Features />
      <Categories />
      <PlatformsGrid platforms={platforms} />  
      <LatestGuides />
    </main>
  );
}
