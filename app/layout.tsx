import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Providers } from '@/components/providers'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'YuuTiers | The Ultimate Minecraft Hub',
  description: 'The Minecraft community hub. Search players, browse skins and capes, monitor servers and follow live Mojang news. Built by Annushkaz_Yuu & Dexy_Yuu.',
  keywords: ['Minecraft', 'skins', 'capes', 'servers', 'players', 'news', 'Hypixel', 'YuuTiers'],
  authors: [
    { name: 'Annushkaz_Yuu' },
    { name: 'Dexy_Yuu' },
  ],
  creator: 'YuuTiers Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yuutiers.xyz',
    siteName: 'YuuTiers.xyz',
    title: 'YuuTiers | The Ultimate Minecraft Hub',
    description: 'Search Minecraft players, monitor servers and follow live Mojang news in one place.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YuuTiers | The Ultimate Minecraft Hub',
    description: 'The most advanced Minecraft platform.',
    creator: '@YuuTiers',
  },
}

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
