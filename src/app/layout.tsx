export const metadata = {
  title: 'TrupasBand - Muzică live pentru evenimente',
  description: 'Trupas - Muzică live pentru evenimente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
