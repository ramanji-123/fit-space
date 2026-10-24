import React from 'react'
import { Sparkles, Compass, ShieldCheck, RefreshCw, Shirt } from 'lucide-react'

interface HeaderProps {
  currentView: 'landing' | 'studio' | 'methodology'
  onSelectView: (view: 'landing' | 'studio' | 'methodology') => void
  onResetStudio: () => void
  hasActiveSelection: boolean
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onResetStudio,
  hasActiveSelection,
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(250, 248, 245, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'all var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px',
        gap: '1.5rem'
      }}>
        {/* Brand Monogram & Title */}
        <div
          onClick={() => onSelectView('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          role="button"
          tabIndex={0}
          aria-label="FIT SPACE Atelier Home"
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-canvas)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <Shirt size={20} strokeWidth={1.75} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              lineHeight: 1,
              color: 'var(--text-primary)'
            }}>
              FIT SPACE
            </div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-terracotta)',
              marginTop: '3px'
            }}>
              Virtual Atelier • Phase 1
            </div>
          </div>
        </div>

        {/* View Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.3rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => onSelectView('landing')}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: currentView === 'landing' ? 'var(--bg-surface)' : 'transparent',
              color: currentView === 'landing' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: currentView === 'landing' ? 600 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: currentView === 'landing' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            Editorial
          </button>

          <button
            onClick={() => onSelectView('studio')}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: currentView === 'studio' ? 'var(--bg-surface)' : 'transparent',
              color: currentView === 'studio' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: currentView === 'studio' ? 600 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: currentView === 'studio' ? 'var(--shadow-subtle)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Compass size={14} />
            Try-On Studio
          </button>

          <button
            onClick={() => onSelectView('methodology')}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: currentView === 'methodology' ? 'var(--bg-surface)' : 'transparent',
              color: currentView === 'methodology' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: currentView === 'methodology' ? 600 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: currentView === 'methodology' ? 'var(--shadow-subtle)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShieldCheck size={14} />
            Ethics & Scope
          </button>
        </nav>

        {/* Right Actions & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {hasActiveSelection && (
            <button
              onClick={onResetStudio}
              title="Reset studio preview state"
              aria-label="Reset workspace state"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <RefreshCw size={13} />
              Reset View
            </button>
          )}

          <div
            className="honesty-badge"
            title="FIT SPACE Phase 1 Prototype: No black-box AI fabrication or cloth simulation"
          >
            <Sparkles size={12} color="var(--accent-terracotta)" />
            <span>Prototype Shell</span>
          </div>
        </div>
      </div>
    </header>
  )
}
