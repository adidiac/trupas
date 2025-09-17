// src/components/CookieBanner.tsx
'use client'

import React, { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('consent-dismissed') === 'true'
      if (!dismissed) setVisible(true)
    } catch {}
  }, [])

  function acceptAll() {
    try {
      localStorage.setItem('consent-media', 'true')   // YouTube etc.
      localStorage.setItem('consent-dismissed', 'true')
      window.dispatchEvent(new CustomEvent('consent:media', { detail: true }))
    } catch {}
    setVisible(false)
  }

  function refuseAll() {
    try {
      localStorage.setItem('consent-media', 'false')
      localStorage.setItem('consent-dismissed', 'true')
      window.dispatchEvent(new CustomEvent('consent:media', { detail: false }))
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite">
      <div className="cookie-inner">
        <p className="cookie-text">
          Folosim cookie-uri pentru a reda conținut YouTube și a îmbunătăți experiența.
          Citește <a href="/privacy">Politica de Confidențialitate</a>.
        </p>
        <div className="cookie-actions">
          <button className="btn outline" onClick={refuseAll} aria-label="Refuză cookie-urile">
            Refuz
          </button>
          <button className="btn solid" onClick={acceptAll} aria-label="Acceptă cookie-urile">
            Accept
          </button>
        </div>
      </div>

      <style jsx>{`
        .cookie-banner {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          z-index: 1100;
          background: rgba(0,0,0,0.92);
          border-top: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
        }
        .cookie-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0.9rem 1rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
        }
        .cookie-text {
          margin: 0;
          color: #eee;
          font-size: 0.95rem;
        }
        .cookie-text a {
          color: #f0c040;
          text-decoration: underline;
        }
        .cookie-actions {
          display: flex; gap: 0.5rem;
          flex-shrink: 0;
        }
        .btn {
          border-radius: 10px;
          padding: 0.55rem 0.9rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .btn.outline {
          background: transparent;
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }
        .btn.outline:hover { border-color: rgba(255,255,255,0.5); }
        .btn.solid {
          background: #f0c040;
          color: #0f0c29;
          border-color: rgba(255,255,255,0.15);
        }
        .btn.solid:hover { background: rgb(252,219,127); }
        @media (max-width: 680px) {
          .cookie-inner { flex-direction: column; align-items: stretch; }
          .cookie-actions { justify-content: space-between; }
        }
      `}</style>
    </div>
  )
}
