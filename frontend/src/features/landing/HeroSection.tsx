import React from 'react'
import { ArrowRight, Compass, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react'
import type { Garment } from '../../types/garment'

interface HeroSectionProps {
  onStartTryOn: (garmentId?: string) => void
  sampleGarments: Garment[]
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTryOn,
  sampleGarments,
}) => {
  return (
    <section style={{
      paddingTop: 'clamp(2.5rem, 6vw, 5rem)',
      paddingBottom: 'clamp(3rem, 7vw, 6rem)',
    }}>
      <div className="container">
        {/* Editorial Subtitle Pill */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-accent-subtle)',
            border: '1px solid #EADBCE',
            color: 'var(--accent-terracotta)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} />
            <span>Virtual Fitting Atelier • Sizing With Integrity</span>
          </div>
        </div>

        {/* Hero Main Heading & Narrative */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            The architectural approach to <span style={{ fontStyle: 'italic', color: 'var(--accent-terracotta)' }}>personal garment fit</span>.
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem auto'
          }}>
            Preview silhouettes on virtual mannequins, evaluate ease and drape proportions, and receive transparent, measurement-first guidance — without black-box fabrications.
          </p>

          {/* Call to Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => onStartTryOn()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.95rem 2rem',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-elevated)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-terracotta)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-primary)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span>Start Virtual Try-On</span>
              <ArrowRight size={17} />
            </button>

            <a
              href="#sample-showcase"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.95rem 1.8rem',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Compass size={16} />
              <span>Explore Curated Samples</span>
            </a>
          </div>
        </div>

        {/* 3 Core Editorial Principles Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto 4.5rem auto'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{
              display: 'inline-flex',
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--accent-terracotta)',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={20} />
            </div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Deterministic Fit Logic
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>
              Fit recommendations rely strictly on body dimensions and garment size charts. If measurements are absent, we report limitations rather than guessing.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{
              display: 'inline-flex',
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--accent-brass)',
              marginBottom: '1rem'
            }}>
              <Compass size={20} />
            </div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Mannequin Studio View
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>
              Test garment drape across multiple standard mannequin body profiles (Athletic, Petite, Relaxed) with studio lighting and profile angle controls.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{
              display: 'inline-flex',
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--badge-warning-text)',
              marginBottom: '1rem'
            }}>
              <ShieldAlert size={20} />
            </div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Phase 1 Engineering Honesty
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>
              We distinguish 2D silhouette preview from true rotatable 3D cloth simulation. No simulated buttons or fake backend calls are disguised as finished features.
            </p>
          </div>
        </div>

        {/* Sample Showcase Gallery */}
        <div id="sample-showcase" style={{ paddingTop: '2rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1rem'
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: 'var(--text-primary)'
              }}>
                Curated Atelier Collection
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Royalty-free vector reference garments designed with realistic ease, weight, and grade specs.
              </p>
            </div>
            <button
              onClick={() => onStartTryOn()}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--accent-terracotta)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>Load All in Studio</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {sampleGarments.map((garment) => (
              <div
                key={garment.id}
                onClick={() => onStartTryOn(garment.id)}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                  boxShadow: 'var(--shadow-subtle)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-dark)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Image Container */}
                <div style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <img
                    src={garment.imageUrl}
                    alt={garment.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform var(--transition-normal)'
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    color: 'var(--accent-terracotta)',
                    marginBottom: '0.35rem'
                  }}>
                    {garment.colorName} • {garment.category}
                  </div>

                  <h4 style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.4rem',
                    fontWeight: 600
                  }}>
                    {garment.name}
                  </h4>

                  <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.45,
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {garment.description}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>{garment.silhouette}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Try In Studio →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
