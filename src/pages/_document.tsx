// src/pages/_document.tsx  (or pages/_document.tsx)
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ro">
        <Head>
          {/* put global meta only (no scripts that access window) */}
          <meta name="theme-color" content="#24243e" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
