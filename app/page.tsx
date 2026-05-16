import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { StatsMarquee } from '@/components/home/stats-marquee'
import { FeatureGrid } from '@/components/home/feature-grid'
import { DimensionsShowcase } from '@/components/home/dimensions-showcase'
import { LatestNews } from '@/components/home/latest-news'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsMarquee />
        <FeatureGrid />
        <DimensionsShowcase />
        <LatestNews />
      </main>
      <Footer />
    </div>
  )
}
