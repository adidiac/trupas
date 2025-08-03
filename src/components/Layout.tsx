'use client'
import React, { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {/* Page wrapper */}
      <div className="page-container">
        {children}
      </div>

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
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          padding: 0;
          background-color: rgb(59, 6, 82);
          color: #fff;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }
        main {
          /* no padding-top here */
        }
        /* 2. Offset the fixed navbar height (64px) */
        .page-content {
          padding-top: 64px;
        }

        /* 3. Page container: full‐height + snap */
        .page-container {
          width: 100vw;
          min-height: 100vh;
          scroll-snap-align: start;
          background:rgb(59, 6, 82); 
        }

        /* 4. Utility: center section content */
        .section-wrapper {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          scroll-snap-align: start;
        }

        /* 5. Headings */
        h1, h2, h3 {
          color: var(--brand-charcoal);
          line-height: 1.2;
        }
        h2 {
          font-size: 2.25rem;
          margin-bottom: 1rem;
        }
        p {
          color: #555;
          max-width: 800px;
          margin-bottom: 1.5rem;
        }

        /* 6. Links */
        a {
          color: var(--brand-charcoal);
          text-decoration: none;
        }
        a:hover {
          color: var(--brand-gold);
        }
      `}</style>
    </>
  )
}
