// src/components/JsonLd.tsx
'use client'
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['MusicGroup', 'LocalBusiness'],
    name: 'TRUPAS',
    url: 'https://trupasband.ro',
    telephone: '+40744842061',
    email: 'trupasband@gmail.com',
    areaServed: 'RO',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brașov',
      addressCountry: 'RO'
    },
    sameAs: [
      'https://facebook.com/trupasbrasov',
      'https://instagram.com/trupasband',
      'https://www.youtube.com/@TRUPAS-u4q',
      'https://tiktok.com/@trupas_band'
    ],
    image: 'https://trupasband.ro/og-cover.jpg',
    description: 'Trupă de nuntă din Brașov – muzică live, DJ, lumină & sunet pentru evenimente.',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
