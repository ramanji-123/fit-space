import React from 'react'
import { ShieldCheck, Ruler, Cpu, Lock, ArrowRight } from 'lucide-react'

interface MethodologyViewProps {
  onReturnToStudio: () => void
}

export const MethodologyView: React.FC<MethodologyViewProps> = ({ onReturnToStudio }) => {
  return (
    <section style={{
      paddingTop: 'clamp(2rem, 5vw, 4rem)',
      paddingBottom: 'clamp(3rem, 6vw, 5rem)'
    }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-accent-subtle)',
            color: 'var(--accent-terracotta)',
            fontSize: '0.78rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={14} />
            Architectural Manifesto & Ethics
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Engineering Principles & Sizing Boundaries
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto' }}>
            FIT SPACE was founded on a simple standard: virtual fashion interfaces must be candid about what software can observe versus what it guesses.
          </p>
        </div>

        {/* 4 Architectural Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3.5rem' }}>
          {/* Pillar 1 */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--accent-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Ruler size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                1. No Dimensions From Flat Images Alone
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                A 2D photo contains no intrinsic physical scale without known focal length, distance, and reference markers. FIT SPACE refuses to invent millimeter garment measurements from an uncalibrated product image. Genuine sizing recommendations require explicit garment measurements or verified brand size charts.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--accent-brass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Cpu size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                2. 2D Diffusion Preview ≠ 3D Cloth Physics
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Synthetic 2D image-to-image try-on produces a static artistic rendering; it does not compute fabric tensile shear, gravity draping, or seam strain. We distinctly separate 2D editorial visualization from future 3D mesh rendering and physically-based cloth simulation.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--accent-olive)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Lock size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                3. Ephemeral Client Processing & Zero Biometric Harvesting
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                User body measurements and uploaded garment photos in Phase 1 remain strictly within the client browser memory sandbox. We do not store biometric data, do not retain personal photography on remote servers, and never feed user photos to foundation model training corpuses.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Studio CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onReturnToStudio}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 2rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-canvas)',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-elevated)'
            }}
          >
            <span>Return to Virtual Try-On Studio</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
