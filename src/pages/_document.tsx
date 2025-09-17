// src/pages/_document.tsx  (or pages/_document.tsx)
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ro">  
        <Head>
          {/* Favicons */}
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <meta name="theme-color" content="#24243e" />

          {/* Social preview defaults */}
          <meta property="og:site_name" content="TRUPAS" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/logo.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
