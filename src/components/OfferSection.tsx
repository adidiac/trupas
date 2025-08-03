// src/components/OfferSection.tsx
'use client'

import React, { useEffect } from 'react'

const offers = [
  {
    title: 'Pachet 1',
    image: '/media/offer1.png',
    details: [
      { icon: '/media/icon-band.svg', text: 'Trupa cover + DJ + Sonorizare + Lumini' },
      { icon: '/media/icon-playlist.svg', text: '4 seturi x 45min + 1 set x 30min (coffee concert)' },
      { icon: '/media/icon-gear.svg', text: 'DJ pe toată durata evenimentului' },
    ],
    price: '4 700 EUR',
  },
  {
    title: 'Pachet 2',
    image: '/media/offer2.png',
    details: [
      { icon: '/media/icon-band.svg', text: 'Trupa cover + Muzică populară + DJ + Sonorizare + Lumini' },
      { icon: '/media/icon-playlist.svg', text: 'Pe toată durata evenimentului + 1 set x 30min (coffee concert)' },
    ],
    price: '5 500 EUR',
  },
]

export default function OfferSection() {
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-offer') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const count = 75

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    function init() {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
      }))
    }
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(240,192,64,0.3)'
      particles.forEach(p => {
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
    <section id="oferta" className="offer-section">
      <canvas id="bg-particles-offer" className="bg-canvas" />
      <h2>Ofertă</h2>
      <div className="offer-cards">
        {offers.map((o, i) => (
          <div key={o.title} className="offer-card" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="card-image" style={{ backgroundImage: `url(${o.image})` }} />
            <div className="card-content">
              <h3>{o.title}</h3>
              <ul>
                {o.details.map(d => (
                  <li key={d.text}>
                    <img src={d.icon} alt="" aria-hidden="true" className="icon" />
                    <span>{d.text}</span>
                  </li>
                ))}
              </ul>
              <div className="price">{o.price}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="offer-note">
        *Transport: 3,5 lei/km • Cazare (peste 250 km): 4 camere duble
      </p>

      <style jsx>{`
        .offer-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          padding: 4rem 2rem;
          background: #24243e;
          color: #efefef;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }
        .bg-canvas {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .offer-section h2 {
          position: relative;
          z-index: 1;
          font-size: 3rem;
          margin-bottom: 12rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
        }
        .offer-cards {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
        }
        .offer-card {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease-out forwards;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .offer-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 30px rgba(240,192,64,0.7);
        }
        .card-image {
          width: 100%;
          padding-top: 58.25%;
          background-size: cover;
          background-position: center;
        }
        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-content h3 {
          margin: 0 0 1rem;
          font-size: 1.75rem;
          color: #fff;
        }
        .card-content ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }
        .card-content li {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          color: #fff;
        }
        .icon {
          width: 50px;
          height: 50px;
          margin-right: 0.75rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }
        .price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f0c040;
        }
        .offer-note {
          position: relative;
          z-index: 1;
          margin-top: 2rem;
          font-size: 0.9rem;
          color: #bbb;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          .offer-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
