import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsHero } from '@/components/docs/docs-hero'

export const metadata = {
  title: 'Documentation | YuuTiers.xyz',
  description: 'The complete YuuTiers handbook: features, API reference, guides and more.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DocsHero />
      <main className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
            <DocsSidebar />
            <article className="min-w-0 max-w-3xl">{children}</article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
