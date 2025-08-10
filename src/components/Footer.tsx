// src/components/Footer.tsx
'use client'

import React from 'react'

const PHONE = '+40 744 842 061'
const EMAIL = 'trupasband@gmail.com'
const CITY  = 'Brașov & toată țara'

const WHATSAPP_NUMBER = '+40744842061'
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Bună! Aș dori mai multe detalii despre disponibilitate și preț.'
)}`

export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      {/* subtle particles canvas if you want later – left out to keep footer light */}

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
      <div className="cols">
        <div className="brand">
          <div className="logo-row">
            <img
              src="/media/logo.png"
              alt="Trupas"
              className="logo"
              onError={(e) => {
                // fallback to text if logo missing
                (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
            <span className="wordmark">TRUPAS</span>
          </div>
          <p className="tagline">
            Muzică live, energie și emoție pentru evenimente memorabile.
          </p>
        </div>



        <div className="contact">
          <h4>Contact</h4>
          <ul className="contactList">
            <li><a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>{CITY}</li>
          </ul>
        </div>

        <div className="social">
          <h4>Urmărește-ne</h4>
          <div className="icons">
            <a href="https://facebook.com/trupasbrasov" target="_blank" aria-label="Facebook">
              <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" />
            </a>
            <a href="https://instagram.com/trupasband" target="_blank" aria-label="Instagram">
              <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" />
            </a>
            <a href="https://tiktok.com/@trupas_band" target="_blank" aria-label="TikTok">
              <img src="https://cdn.simpleicons.org/tiktok/ffffff" alt="" />
            </a>
            <a href="https://www.youtube.com/@TRUPAS-u4q" target="_blank" aria-label="YouTube">
              <img src="https://cdn.simpleicons.org/youtube/ffffff" alt="" />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bar">
        <p>© {year} TRUPAS. Toate drepturile rezervate.</p>
        <button className="toTop" onClick={toTop} aria-label="Înapoi sus">↑</button>
      </div>

      <style jsx>{`
        .footer {
          background: #24243e;
          color: #efefef;
          width: 100%;
          margin-top: 0;
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
        .cta-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .btn {
          padding: 0.65rem 1.1rem;
          border-radius: 0.65rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform .15s ease, background .2s ease, color .2s ease;
        }
        .btn.primary {
          background: #f0c040;
          color: #1b1231;
        }
        .btn.primary:hover { transform: translateY(-1px); }
        .btn.ghost {
          background: transparent;
          border: 2px solid #f0c040;
          color: #f0c040;
        }
        .btn.ghost:hover { background: rgba(240,192,64,0.15); transform: translateY(-1px); }

        /* Main grid */
        .cols {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        .logo-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .logo { width: 100px; height: 100px; object-fit: contain; }
        .wordmark {
          font-size: 1.25rem;
          letter-spacing: 2px;
          font-weight: 800;
        }
        .tagline { opacity: 0.9; line-height: 1.5; }

        .links h4, .contact h4, .social h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .links ul, .contactList {
          list-style: none; padding: 0; margin: 0; display: grid; gap: .4rem;
        }
        .links a, .contactList a {
          color: #efefef; text-decoration: none; opacity: .95;
        }
        .links a:hover, .contactList a:hover { color: #f0c040; }

        .icons { display: flex; gap: .6rem; }
        .icons img { width: 24px; height: 24px; opacity: .95; transition: opacity .2s ease; }
        .icons a:hover img { opacity: 1; }

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
