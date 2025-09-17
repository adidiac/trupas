// src/components/Footer.tsx
'use client'

import React from 'react'

const PHONE = '+40 744 842 061'
const EMAIL = 'trupasband@gmail.com'
const CITY  = 'Brașov & toată țara'

const COMPANY = {
  name: 'Artistill S.R.L.',
  address: 'Strada Constantin Dobrogeanu, Nr. 44, Ap. 4, Brașov, România',
  site: 'trupasband.ro',
}

const WHATSAPP_NUMBER = '+40744842061'
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Bună! Aș dori mai multe detalii despre disponibilitate și preț.'
)}`

export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const openCookiePrefs = () =>
    window.dispatchEvent(new CustomEvent('open-consent')) // CookieBanner trebuie să asculte acest event

  return (
    <footer className="footer" role="contentinfo">
      {/* CTA STRIP */}
      <div className="cta">
        <h3>Vrei să verifici disponibilitatea?</h3>
        <div className="cta-actions">
          <a href="#contact" className="btn primary">Scrie-ne</a>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn ghost">
            WhatsApp
          </a>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="cols" itemScope itemType="https://schema.org/Organization">
        {/* Brand */}
        <div className="brand">
          <div className="logo-row">
            <img
              src="/media/logo.png"
              alt="Trupas"
              className="logo"
              itemProp="logo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
            <span className="wordmark" itemProp="name">TRUPAS</span>
          </div>
          <p className="tagline" itemProp="description">
            Muzică live, energie și emoție pentru evenimente memorabile.
          </p>
        </div>

        {/* Contact */}
        <div className="contact">
          <h4>Contact</h4>
          <ul className="list">
            <li><a href={`tel:${PHONE.replace(/\s/g, '')}`} itemProp="telephone">{PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}`} itemProp="email">{EMAIL}</a></li>
            <li><span itemProp="areaServed">{CITY}</span></li>
          </ul>
        </div>

        {/* Social */}
        <div className="social">
          <h4>Urmărește-ne</h4>
          <div className="icons">
            <a href="https://facebook.com/trupasbrasov" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" />
            </a>
            <a href="https://instagram.com/trupasband" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" />
            </a>
            <a href="https://tiktok.com/@trupas_band" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <img src="https://cdn.simpleicons.org/tiktok/ffffff" alt="" />
            </a>
            <a href="https://www.youtube.com/@TRUPAS-u4q" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src="https://cdn.simpleicons.org/youtube/ffffff" alt="" />
            </a>
          </div>
        </div>

        {/* Legal / Informații furnizor */}
        <div className="legal" itemScope itemType="https://schema.org/Organization">
          <h4>Legal</h4>
          <ul className="list">
            <li><strong>Denumire:</strong> <span itemProp="name">{COMPANY.name}</span></li>
            <li>
              <strong>Sediu:</strong>{' '}
              <span itemProp="address">{COMPANY.address}</span>
            </li>
            <li><a href="/privacy">Politica de confidențialitate</a></li>
            <li><a href="/cookies">Politica de cookie-uri</a></li>
            {/* Link pentru a redeschide bannerul de cookies */}
            <li>
              <button type="button" className="linkLike" onClick={openCookiePrefs}>
                Schimbă preferințele cookie
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bar">
        <p>© {year} {COMPANY.name} (TRUPAS). Toate drepturile rezervate.</p>
        <button className="toTop" onClick={toTop} aria-label="Înapoi sus">↑</button>
      </div>

      {/* (opțional) JSON-LD pentru SEO — completează adresa/CUI corecte */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PerformingGroup',
            name: 'TRUPAS',
            legalName: COMPANY.name,
            url: `https://${COMPANY.site}`,
            email: EMAIL,
            telephone: PHONE.replace(/\s/g, ''),
            address: {
              '@type': 'PostalAddress',
              streetAddress: COMPANY.address,
              addressLocality: 'Brașov',
              addressCountry: 'RO',
            },
            sameAs: [
              'https://facebook.com/trupasbrasov',
              'https://instagram.com/trupasband',
              'https://www.youtube.com/@TRUPAS-u4q',
              'https://tiktok.com/@trupas_band',
            ],
            areaServed: 'RO',
          }),
        }}
      />

      <style jsx>{`
        .footer {
          background: #24243e;
          color: #efefef;
          width: 100%;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        /* CTA strip */
        .cta {
          padding: 2.25rem 1.5rem;
          display: grid;
          gap: 1rem;
          justify-items: center;
          text-align: center;
          background: linear-gradient(90deg, rgba(100,255,249,0.12), rgba(240,192,64,0.12));
        }
        .cta h3 {
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          margin: 0;
        }
        .cta-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .btn {
          padding: 0.65rem 1.1rem;
          border-radius: 0.65rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform .15s ease, background .2s ease, color .2s ease;
        }
        .btn.primary { background: #f0c040; color: #1b1231; }
        .btn.primary:hover { transform: translateY(-1px); }
        .btn.ghost { background: transparent; border: 2px solid #f0c040; color: #f0c040; }
        .btn.ghost:hover { background: rgba(240,192,64,0.15); transform: translateY(-1px); }

        /* Main grid: 4 coloane (Brand, Contact, Social, Legal) */
        .cols {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        .logo-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .logo { width: 100px; height: 100px; object-fit: contain; }
        .wordmark { font-size: 1.25rem; letter-spacing: 2px; font-weight: 800; }
        .tagline { opacity: 0.9; line-height: 1.5; }

        .contact h4, .social h4, .legal h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .list { list-style: none; padding: 0; margin: 0; display: grid; gap: .45rem; }
        .list a { color: #efefef; text-decoration: none; opacity: .95; }
        .list a:hover { color: #f0c040; }

        .icons { display: flex; gap: .6rem; }
        .icons img { width: 24px; height: 24px; opacity: .95; transition: opacity .2s ease; }
        .icons a:hover img { opacity: 1; }

        .linkLike {
          background: none;
          border: none;
          padding: 0;
          color: #64fff9;
          text-decoration: underline;
          cursor: pointer;
        }
        .linkLike:hover { color: #f0c040; }

        .bar {
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .toTop {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          width: 36px; height: 36px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform .15s ease, background .2s ease;
        }
        .toTop:hover { background: rgba(255,255,255,0.18); transform: translateY(-1px); }

        @media (max-width: 900px) {
          .cols { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .cols { grid-template-columns: 1fr; }
          .bar { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
