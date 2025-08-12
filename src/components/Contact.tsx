// src/components/Contact.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'

function formatRO(iso: string) {
  // iso: YYYY-MM-DD -> dd.mm.yyyy
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return ''
  return `${d.padStart(2,'0')}.${m.padStart(2,'0')}.${y}`
}
function parseRO(display: string) {
  // dd.mm.yyyy -> YYYY-MM-DD (very permissive)
  const m = display.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (!m) return ''
  const d = m[1].padStart(2, '0')
  const mo = m[2].padStart(2, '0')
  const y = m[3]
  return `${y}-${mo}-${d}`
}

export default function Contact() {
  const [state, handleSubmit] = useForm('xovlnrdr')
  const [showModal, setShowModal] = useState(false)

  // DATE state
  const [dateISO, setDateISO] = useState('')         // always ISO (YYYY-MM-DD)
  const [dateMode, setDateMode] = useState<'text'|'date'>('text') // toggles for iOS
  const formRef = useRef<HTMLFormElement>(null)

  // show thank-you modal + clear form after success
  useEffect(() => {
    if (state.succeeded) {
      setShowModal(true)
      // clear native form controls
      formRef.current?.reset()
      // clear controlled states
      setDateISO('')
      setDateMode('text')
    }
  }, [state.succeeded])

  // particles bg (unchanged)
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-contact') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: { x:number; y:number; vx:number; vy:number; size:number }[] = []
    const count = 75
    function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    function init(){ particles = Array.from({length:count}).map(()=>({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, size: Math.random()*2+1
    })) }
    function loop(){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.fillStyle = 'rgba(240,192,64,0.3)'
      particles.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill()
        p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>canvas.width) p.vx*=-1; if(p.y<0||p.y>canvas.height) p.vy*=-1 })
      requestAnimationFrame(loop)
    }
    resize(); init(); loop()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <section id="contact" className="contact-section">
      <canvas id="bg-particles-contact" className="bg-canvas" />

      <h2>Contact</h2>
      <div className="contact-container">
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <input id="name" name="name" placeholder="Nume" required />
          <ValidationError prefix="Name" field="name" errors={state.errors} />

          <input id="email" name="email" type="email" placeholder="Email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <input id="phone" name="phone" type="tel" placeholder="Număr de telefon" required />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />

          {/* ---- Date (iOS-friendly) ---- */}
          {/* Hidden ISO value actually submitted to Formspree */}
          <input type="hidden" name="date" value={dateISO} />
          {/* Visible, toggles between text (shows placeholder/RO) and date (native picker) */}
          <input
            id="date_display"
            name="date_display"
            lang="ro"
            type={dateMode}
            placeholder={dateMode === 'text' ? 'Data nunții (zz.ll.aaaa)' : undefined}
            inputMode={dateMode === 'text' ? 'numeric' : undefined}
            pattern={dateMode === 'text' ? '\\d{2}\\.\\d{2}\\.\\d{4}' : undefined}
            value={dateMode === 'date' ? dateISO : (dateISO ? formatRO(dateISO) : '')}
            onFocus={() => setDateMode('date')}
            onBlur={(e) => {
              // if empty, return to text mode to show placeholder; if picked, show formatted
              setDateMode('text')
              // normalize any typed value
              if (!dateISO && e.currentTarget.value) {
                const parsed = parseRO(e.currentTarget.value)
                if (parsed) setDateISO(parsed)
              }
            }}
            onChange={(e) => {
              if (dateMode === 'date') {
                // native picker gives ISO
                setDateISO(e.target.value)
              } else {
                // user typed dd.mm.yyyy
                const parsed = parseRO(e.target.value)
                if (parsed) setDateISO(parsed)
              }
            }}
            required
          />
          <ValidationError prefix="Date" field="date" errors={state.errors} />
          {/* ---- /Date ---- */}

          <input id="city" name="city" placeholder="Orașul" required />
          <ValidationError prefix="City" field="city" errors={state.errors} />

          <input id="guests" name="guests" type="number" placeholder="Număr estimativ de invitați" required />
          <ValidationError prefix="Guests" field="guests" errors={state.errors} />

          <textarea id="message" name="message" placeholder="Detalii eveniment" required />
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <button type="submit" disabled={state.submitting}>
            {state.submitting ? 'Se trimite…' : 'Cere ofertă'}
          </button>
        </form>

        <div className="contact-info">
          <p style={{ color: '#f0c040' }}>Ne găsești și pe:</p>
          <div className="social-links">
            <a href="https://facebook.com/trupasbrasov" target="_blank" className="social-link">
              <img src="https://cdn.simpleicons.org/facebook/fff" alt="Facebook" className="social-icon" /> Facebook
            </a>
            <a href="https://instagram.com/trupasband" target="_blank" className="social-link">
              <img src="https://cdn.simpleicons.org/instagram/fff" alt="Instagram" className="social-icon" /> Instagram
            </a>
            <a href="https://tiktok.com/@trupas_band" target="_blank" className="social-link">
              <img src="https://cdn.simpleicons.org/tiktok/fff" alt="TikTok" className="social-icon" /> TikTok
            </a>
            <a href="https://www.youtube.com/@TRUPAS-u4q" target="_blank" className="social-link">
              <img src="https://cdn.simpleicons.org/youtube/fff" alt="YouTube" className="social-icon" /> YouTube
            </a>
          </div>
          <p className="phone">+40 744 842 061</p>
        </div>
      </div>

      {showModal && (
        <div className="thank-overlay">
          <div className="thank-modal">
            <button className="close-btn" onClick={() => setShowModal(false)} aria-label="Închide">×</button>
            <h2>Mulțumim!</h2>
            <p>Mesajul tău a fost trimis cu succes. Te vom contacta curând.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .contact-section {
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
        .bg-canvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; }
        h2 {
          position: relative; z-index:1; font-size:3rem; margin-bottom:4rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation: fadeInUp .6s ease-out;
        }
        .contact-container {
          position: relative; z-index:1;
          display:grid; grid-template-columns: 1fr 1fr; gap:4rem; width:100%; max-width:1000px;
        }
        .contact-form { display:flex; flex-direction:column; gap:1rem; animation: fadeInUp .6s ease-out .2s both; }
        .contact-form input,
        .contact-form textarea {
          padding:.75rem 1rem; border:1px solid #555; border-radius:.5rem;
          background: rgba(0,0,0,.3); color:#fff; font-size:1rem;
        }
        /* Make text-mode date field align like others */
        #date_display[type="text"]::placeholder { color:#bbb; }
        .contact-form button {
          padding:.75rem 1rem; background:#f0c040; color:#0f0c29; border:none; border-radius:.5rem;
          font-weight:600; cursor:pointer; transition: background .2s ease;
        }
        .contact-form button:hover { background:#64fff9; }
        .contact-info { animation: fadeInUp .6s ease-out .4s both; display:flex; flex-direction:column; justify-content:center; gap:1rem; font-size:1rem; }
        .social-links { display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; }
        .social-link { display:inline-flex; align-items:center; color:#64fff9; text-decoration:none; transition: color .2s; }
        .social-link:hover { color:#f0c040; }
        .social-icon { width:24px; height:24px; margin-right:.5rem; vertical-align:middle; }
        .phone { font-size:1.25rem; font-weight:600; color:#fff; }

        .thank-overlay { position:fixed; inset:0; background:rgba(0,0,0,.6); display:flex; align-items:center; justify-content:center; z-index:100; animation: fadeInUp .5s ease-out; }
        .thank-modal { position:relative; background:#302b63; padding:2rem 3rem; border-radius:1rem; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,.7); }
        .thank-modal h2 { margin:0 0 1rem; font-size:2.5rem; color:#64fff9; }
        .thank-modal p { color:#efefef; font-size:1.1rem; }
        .close-btn { position:absolute; top:.5rem; right:.5rem; background:transparent; border:none; font-size:2rem; color:#fff; cursor:pointer; }

        @keyframes fadeInUp { from{opacity:0; transform:translateY(20px)} to{opacity:1; transform:translateY(0)} }
        @media (max-width: 800px) { .contact-container { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
