import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FiestaMap - Encuentra tu próxima fiesta',
  description: 'La app de vida nocturna más completa de Buenos Aires. Descubre boliches, fiestas, previas y más.',
  keywords: 'boliches, fiestas, vida nocturna, Buenos Aires, previas, eventos',
  authors: [{ name: 'FiestaMap Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#8B5CF6',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" 
          crossOrigin=""
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-nightlife-darker text-white overflow-x-hidden`}>
        <div className="app-container min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}