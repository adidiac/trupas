// src/components/FAQ.tsx
'use client'

import React, { useEffect } from 'react'

const faqs = [
  {
    q: 'Cât cântați la o nuntă?',
    a: 'Setul standard: ~4 x 45 min + 1 x 30 min (coffee concert). Putem adapta durata în funcție de programul evenimentului.',
  },
  {
    q: 'Veniți cu sonorizare și lumini?',
    a: 'Da. Asigurăm sistem complet de sonorizare, mixer, monitoare, microfoane și schelă de lumini (beam, spot, LED PAR).',
  },
  {
    q: 'Aveți și muzică populară / folclor?',
    a: 'Da. Avem solistă de muzică populară și coveruri balcanice/machedonești, plus un DJ pe toată durata evenimentului.',
  },
  {
    q: 'Faceți pauze? Ce se întâmplă între seturi?',
    a: 'Între seturi avem pauze scurte pentru schimbare de program. Atmosfera rămâne sus cu DJ & playlist personalizat.',
  },
  {
    q: 'Călătoriți în toată țara?',
    a: 'Da. Ne deplasăm oriunde. Se adaugă cost de transport (lei/km) și, pentru distanțe mari, cazare pentru echipă.',
  },
  {
    q: 'Cât de devreme ar trebui să rezervăm?',
    a: 'Ideal cu 6–12 luni înainte. Datele de vară se ocupă repede, dar scrie-ne — uneori avem soluții în ultimul moment.',
  },
  {
    q: 'Cum stabilim repertoriul?',
    a: 'Îți propunem un playlist-schelet pe zone (dance/pop, rock, balcanic, populară) și îl personalizăm împreună după public.',
  },
  {
    q: 'Dacă se prelungește petrecerea?',
    a: 'Putem extinde programul contra cost (prelungire pe oră). Confirmăm în seara evenimentului în funcție de energie și locație.',
  },
]

export default function FAQ() {
  // particles background (same logic as the other sections)
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-faq') as HTMLCanvasElement | null
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const count = 75

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    const init = () => {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      }))
    }
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(240,192,64,0.5)'
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      requestAnimationFrame(loop)
    }

    resize()
    init()
    loop()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <section id="FAQ" className="faq-section">
      <canvas id="bg-particles-faq" className="bg-canvas" />

      <h2>Întrebări frecvente</h2>

      <div className="faq-wrap">
        {faqs.map((item, i) => (
          <details key={i} className="faq-item">
            <summary>
              {item.q}
              <span className="indicator" aria-hidden="true" />
            </summary>
            <div className="answer">
              <p style={{ color: '#f0c040' }}>{item.a}</p>
            </div>
          </details>
        ))}
      </div>

      <p className="cta" style={{ animationDelay: '0.2s', color: '#f0c040' }}>
        Nu ai găsit răspunsul?{' '}
        <a href="#contact" className="link">Scrie-ne</a> — răspundem rapid.
      </p>

      <style jsx>{`
        .faq-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          padding: 4rem 1.5rem 6rem;
          background: #24243e;
          color: #efefef;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: left;
          gap: 2rem;
        }
        .bg-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        h2 {
          position: relative;
          z-index: 1;
          font-size: 3rem;
          margin: 1rem 0 2rem;
          text-align: center;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
        }
        .faq-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1000px;
          display: grid;
          color: #eaeaea;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .faq-item {
          border-radius: 0.9rem;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .faq-item summary {
          cursor: pointer;
          list-style: none;
          padding: 1.1rem 3.25rem 1.1rem 1.25rem;
          font-weight: 700;
          position: relative;
          user-select: none;
          outline: none;
        }
        /* remove default marker */
        .faq-item summary::-webkit-details-marker { display: none; }

        /* plus/minus indicator */
        .indicator {
          position: absolute;
          right: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 22px;
        }
        .indicator::before,
        .indicator::after {
          content: '';
          position: absolute;
          background: #f0c040;
          border-radius: 2px;
          transition: transform 200ms ease;
        }
        .indicator::before {
          width: 22px; height: 2px; left: 0; top: 50%; transform: translateY(-50%);
        }
        .indicator::after {
          width: 2px; height: 22px; left: 50%; top: 0; transform: translateX(-50%);
        }
        /* when open -> show minus */
        .faq-item[open] .indicator::after { transform: translateX(-50%) scaleY(0); }

        .answer {
          padding: 0 1.25rem 1.1rem;
          color: #eaeaea;
          line-height: 1.6;
          opacity: 0;
          max-height: 0;
          transform: translateY(-6px);
          transition: all 260ms ease;
        }
        .faq-item[open] .answer {
          padding: 0 1.25rem 1.1rem;
          opacity: 1;
          max-height: 400px; /* enough for most answers */
          transform: translateY(0);
          color: #f0c040;
        }
        .faq-item[open] .answer {
          opacity: 1;
          max-height: 400px; /* enough for most answers */
          transform: translateY(0);
        }

        .cta {
          position: relative;
          z-index: 1;
          margin-top: 1rem;
          text-align: center;
          opacity: 0.95;
        }
        .link {
          color: #64fff9;
          text-decoration: none;
          border-bottom: 1px dashed rgba(100,255,249,0.6);
        }
        .link:hover { color: #f0c040; border-color: rgba(240,192,64,0.7); }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 700px) {
          h2 { font-size: 2.4rem; }
          .faq-item summary { padding-right: 3rem; }
        }
      `}</style>
    </section>
  )
}
