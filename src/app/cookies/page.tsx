// src/app/cookies/page.tsx
'use client'

import React from 'react'

export default function CookiesPage() {

  return (
    <main className="cookies-page">
      <div className="wrap">
        <h1>Politica de Cookie</h1>
        <p className="muted">Ultima actualizare: 2025-01-01</p>

        <p>
          Folosim cookie-uri și tehnologii similare pentru a îmbunătăți experiența pe site și pentru a reda
          conținut extern (ex. YouTube). Cookie-urile sunt mici fișiere salvate în browserul tău.
        </p>

        <h2>Tipuri de cookie-uri</h2>
        <ul>
          <li><strong>Necesare</strong>: esențiale pentru funcționarea site-ului (nu necesită consimțământ).</li>
          <li><strong>Media/Marketing</strong>: pentru a încărca playerul YouTube și/sau a măsura performanța acestuia (necesită consimțământ).</li>
        </ul>

        <h2>Cookie-uri terțe (YouTube)</h2>
        <p>La acceptul tău, playerul YouTube poate seta cookie-uri precum <em>YSC</em>, <em>VISITOR_INFO1_LIVE</em>, <em>CONSENT</em> etc.</p>

        <h2>Gestionare consimțământ</h2>
        <p>
          Poți modifica oricând opțiunile privind cookie-urile media folosind butonul din pagina de start.
        </p>
        <p className="linkline">
          Pentru detalii despre datele personale, consultă <a href="/privacy">Politica de Confidențialitate</a>.
        </p>
      </div>

      <style jsx>{`
        .cookies-page {
          min-height: 100vh;
          background: #24243e;
          color: #efefef;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 6rem 1.25rem 3rem;
        }
        .wrap {
          width: 100%;
          max-width: 900px;
        }
        h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: .5rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .muted { opacity: .8; margin-bottom: 1.25rem; }
        h2 { margin: 1.25rem 0 .5rem; }
        p, li { line-height: 1.6; }
        ul { padding-left: 1.25rem; }
        .btn {
          margin: 1rem 0;
          background: #f0c040;
          color: #0f0c29;
          border: none;
          border-radius: .75rem;
          padding: .8rem 1rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn:hover { background: rgb(252,219,127); }
        .linkline a { color: #64fff9; text-decoration: underline; }
      `}</style>
    </main>
  )
}
