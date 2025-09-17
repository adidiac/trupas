// src/components/Layout.tsx
'use client'

import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import CookieBanner from './CookieBanner'

const WHATSAPP_NUMBER = '+40744842061'; // Manager WhatsApp number
const WHATSAPP_MESSAGE = encodeURIComponent('Bună! Aș dori mai multe detalii despre disponibilitate și preț.');

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {/* Page wrapper */}
      <div className="page-container">
        {children}
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Contactează-ne pe WhatsApp"
      >
        {/* WhatsApp icon from Simple Icons */}
        <img
          src="https://cdn.simpleicons.org/whatsapp/fff"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>

      {/* Global & page‐wide styles */}
      <style jsx global>{`
        /* 1. CSS Variables for theming */
        :root {
          --brand-gold: #F0C040;
          --brand-charcoal: #222222;
          --brand-light: #FFFFFF;
          --base-font: 'Segoe UI', Roboto, sans-serif;
        }

        /* 2. Reset + base typography */
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          background-color: rgb(59, 6, 82);
          color: #fff;
          font-family: var(--base-font);
        }

        /* 3. Page container: full‐height + snap */
        .page-container {
          width: 100vw;
          min-height: 100vh;
          scroll-snap-align: start;
          background: rgb(59, 6, 82);
        }

        /* Floating WhatsApp button */
        .whatsapp-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #25D366; /* WhatsApp green */
          border-radius: 50%;
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 1000;
          transition: transform 0.2s ease;
        }
        .whatsapp-button:hover {
          transform: scale(1.1);
        }
        .whatsapp-icon {
          width: 28px;
          height: 28px;
        }
      `}</style>  
    <CookieBanner />
    </>
  )
}
