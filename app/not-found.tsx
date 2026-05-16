import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { NotFoundContent } from '@/components/not-found/not-found-content'

export const metadata = {
  title: '404 — Lost in the Void | YuuTiers.xyz',
  description:
    'This page is in another dimension. Use the portal back to the overworld or search for what you were looking for.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  )
}
