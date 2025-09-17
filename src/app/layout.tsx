// app/layout.tsx (SERVER component)
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  metadataBase: new URL('https://trupasband.ro'),
  title: {
    default: 'TRUPAS – Trupă nuntă Brașov | Formație evenimente',
    template: '%s | TRUPAS',
  },
    icons: {
    icon: '/logo.png',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico'
  },
  description:
    'TRUPAS – trupă de nuntă din Brașov. Muzică live, show-uri energice, repertoriu personalizat și DJ. Disponibil în toată țara.',
  keywords: [
    'trupa nunta Brasov',
    'formatie nunta Brasov',
    'muzica live Brasov',
    'trupa evenimente',
    'TRUPAS',
  ],
  alternates: {
    canonical: 'https://trupasband.ro',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, maxSnippet: -1, maxImagePreview: 'large', maxVideoPreview: -1 }
  },
  openGraph: {
    type: 'website',
    url: 'https://trupasband.ro',
    siteName: 'TRUPAS',
    title: 'TRUPAS – Trupă nuntă Brașov',
    description: 'Muzică live pentru nunți și evenimente. Vezi showreel, servicii și contactează-ne.',
    images: [
      { url: 'https://trupasband.ro/og-cover.jpg', width: 1200, height: 630, alt: 'TRUPAS – trupă nuntă' },
    ],
    locale: 'ro_RO',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>{children}</body>
      <JsonLd />
    </html>
  )
}


