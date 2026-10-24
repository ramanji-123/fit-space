import React from 'react'
import { Shield, EyeOff, BookOpen, Layers } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-subtle)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem',
      marginTop: '5rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Identity */}
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem'
            }}>
              FIT SPACE
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              An AI-assisted virtual try-on and personalized fashion recommendation atelier built on physical measurement truth and transparent sizing boundaries.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.78rem',
              color: 'var(--accent-terracotta)',
              fontWeight: 600
            }}>
              <Layers size={14} />
              <span>Roadmap Status: Phase 1 — Foundation & UI Shell</span>
            </div>
          </div>

          {/* Column 2: Data Ethics & Privacy Policy */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.95rem',
              marginBottom: '0.75rem'
            }}>
              <EyeOff size={16} color="var(--accent-terracotta)" />
              Privacy & Ephemeral Processing
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              In Phase 1, all garment previews and measurement inputs operate entirely client-side in your local browser sandbox. No user photos or telemetry are uploaded to external foundation models or cloud databases.
            </p>
          </div>

          {/* Column 3: Engineering Boundaries */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.95rem',
              marginBottom: '0.75rem'
            }}>
              <Shield size={16} color="var(--accent-terracotta)" />
              Honest Fit Policy
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Visual previews do not constitute guaranteed physical fit. Sizing guidance requires verified garment measurements and user dimensions. We never fabricate physical dimensions from flat product photos alone.
            </p>
          </div>

          {/* Column 4: Asset Licensing */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.95rem',
              marginBottom: '0.75rem'
            }}>
              <BookOpen size={16} color="var(--accent-terracotta)" />
              Attribution & Assets
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              All sample fashion illustrations are bespoke vector assets released under CC0 1.0 Universal / MIT licensing. System fonts served via Google Fonts (Cormorant Garamond, Inter).
            </p>
          </div>
        </div>

        {/* Bottom Rule */}
        <div style={{
          borderTop: '1px solid var(--border-medium)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 FIT SPACE Atelier. All rights reserved. Built with React + TypeScript + Vite.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Zero Tracking</span>
            <span>Client-Side Preview</span>
            <span>Accessible Design</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
