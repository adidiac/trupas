// src/components/About.tsx
'use client'

import React, { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    const canvas = document.getElementById('bg-particles') as HTMLCanvasElement
    const ctx = canvas?.getContext('2d')
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
    <section id="despre" className="about-section">
      <canvas id="bg-particles" className="bg-canvas" />

      <div className="inner">
        <div className="photo-stack">
          <img
            src="https://res.cloudinary.com/dssmjjqlj/image/upload/v1754138211/trupas_band/g89ryufyfdzry2bldhlc.png"
            alt="Trupass band A"
            className="photo back"
          />
          <img
            src="https://res.cloudinary.com/dssmjjqlj/image/upload/v1754138211/trupas_band/wngw6hr5cvozc39hvqy8.png"
            alt="Trupass band B"
            className="photo front"
          />
        </div>
        <div className="text-block">
          <h2>Despre Trupass</h2>
          <p>
            Suntem o trupă inovatoare care redefinește energia muzicii live cu tehnologii
            avansate și performanțe captivante.
          </p>
          <p>
            Repertoriul nostru acoperă un spectru larg: de la hituri internaționale remixate
            cu efecte synthwave, până la piese tradiționale reinterpretate în stil cyber-folk.
          </p>
          <p>
            Cu peste 10 ani de experiență, echipament 4K, lumini inteligente și efecte laser,
            transformăm fiecare eveniment într-o aventură futuristă.
          </p>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #24243e;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-canvas {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 5rem;
          max-width: 1200px;
          width: 100%;
          padding: 2rem;
        }
        .photo-stack {
          position: relative;
          width: 350px;
          height: 350px;
          flex-shrink: 0;
        }
        .photo {
          position: absolute;
          width: 100%;
          height: auto;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
          transition: transform 0.3s ease;
        }
        .back {
          top: 60px;
          left: 40px;
          transform: rotate(-4deg) scale(0.95);
        }
        .front {
          top: -100px;
          left: -10px;
          transform: rotate(2deg) scale(1);
        }
        .photo-stack:hover .back {
          transform: translate(-5px, -5px) rotate(-2deg) scale(0.96);
        }
        .photo-stack:hover .front {
          transform: translate(0,5px) rotate(0deg) scale(1.02);
        }
        .text-block {
          flex: 1;
        }
        .text-block h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #f0c040, #64fff9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-block p {
          margin-bottom: 1rem;
          line-height: 1.6;
          color: #ffffff;
        }
        @media (max-width: 768px) {
        .about-section {
            height: auto;
            align-items: flex-start;
            padding-top: 2rem;
          }
          .inner {
            flex-direction: column;
            text-align: center;
            padding-top: 1rem;
          }
          .photo-stack {
            width: 80%;
            height: auto;
          }
          .photo {
            position: relative;
            top: auto;
            left: auto;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
