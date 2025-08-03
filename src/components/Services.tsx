// src/components/Services.tsx
'use client'

import React, { useEffect, useState } from 'react'

const services = [
  'Muzică live pentru nunți, botezuri, petreceri private, corporate events',
  'Repertoriu personalizat în funcție de dorințele tale',
  'Pachet complet de suport tehnic: sistem sonorizare, backline-monitoare, mixer',
  'Schela lumini: beam-uri, spoturi, LED par',
]

export default function Services() {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const canvas = document.getElementById('bg-particles-svc') as HTMLCanvasElement
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
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      }))
    }
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(240,192,64,0.5)'
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
    <section id="servicii" className="services-section">
      <canvas id="bg-particles-svc" className="bg-canvas" />

      <h2>Ce oferim</h2>

      <div className="services-content">
        <ul className="services-list">
          {services.map((s, i) => (
            <li key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              {s}
            </li>
          ))}
        </ul>

        <div className="video-container">
          {showVideo ? (
            <iframe
              src="https://www.youtube.com/embed/p04RPX4PaoE?autoplay=1"
              title="TRUPAS Band Live Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              className="video-placeholder"
              onClick={() => setShowVideo(true)}
              aria-label="Redă video"
            >
              <img
                src="https://img.youtube.com/vi/p04RPX4PaoE/hqdefault.jpg"
                alt="TRUPAS Band preview"
              />
              <div className="play-button">▶︎</div>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .services-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          padding: 4rem 2rem;
          background: #24243e;
          color: #efefef;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        h2 {
          position: relative;
          z-index: 1;
          font-size: 3rem;
          margin-bottom: 9rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
        }
        .services-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          width: 100%;
          max-width: 1200px;
        }
        .services-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .services-list li {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(240, 192, 64, 0.6);
          border-radius: 0.75rem;
          padding: 1.5rem 2rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.5;
          color: #fff;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .video-container {
          display: flex;
          align-items: center;
          justify-content: center;
          
        }
        .video-placeholder {
          position: relative;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }
        .video-placeholder img {
          display: block;
          width: 100%;
          max-width: 480px;
          border-radius: 0.75rem;
        }
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          color: #f0c040;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
        }
        iframe {
          width: 100%;
          max-width: 480px;
          height: 270px;
          border: none;
          border-radius: 0.75rem;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          .services-content {
            grid-template-columns: 1fr;
          }
          .services-list li {
            font-size: 1rem;
            padding: 1rem 1.5rem;
          }
          iframe,
          .video-placeholder img {
            max-width: 100%;
            height: auto;
          }
        }
      `}</style>
    </section>
  )
}
