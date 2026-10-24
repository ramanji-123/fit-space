import React, { useState, useEffect } from 'react'
import type { Garment, UploadedGarment } from '../../types/garment'
import type { AvatarBodyType, StudioLighting, StudioViewMode, ViewAngle } from '../../types/avatar'
import {
  Sun,
  Flame,
  Contrast,
  Rotate3d,
  Eye,
  Info,
  Box,
  Sparkles,
  Layers
} from 'lucide-react'

interface StudioViewportProps {
  selectedGarment: Garment | null
  uploadedGarment: UploadedGarment | null
  isUsingUpload: boolean
  avatarBodyType: AvatarBodyType
  onSelectSampleGarment: (garment: Garment) => void
  sampleGarments: Garment[]
}

export const StudioViewport: React.FC<StudioViewportProps> = ({
  selectedGarment,
  uploadedGarment,
  isUsingUpload,
  avatarBodyType,
  onSelectSampleGarment,
  sampleGarments,
}) => {
  const [viewMode, setViewMode] = useState<StudioViewMode>('avatar')
  const [lighting, setLighting] = useState<StudioLighting>('warm-editorial')
  const [angle, setAngle] = useState<ViewAngle>('front')
  const [isLoadingDrape, setIsLoadingDrape] = useState<boolean>(false)
  const [simulatedOrbit, setSimulatedOrbit] = useState<number>(0)

  const activeGarmentKey = `${isUsingUpload ? uploadedGarment?.id : selectedGarment?.id}-${avatarBodyType}`
  const [prevKey, setPrevKey] = useState(activeGarmentKey)

  if (prevKey !== activeGarmentKey) {
    setPrevKey(activeGarmentKey)
    setIsLoadingDrape(true)
  }

  useEffect(() => {
    if (isLoadingDrape) {
      const timer = setTimeout(() => {
        setIsLoadingDrape(false)
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [isLoadingDrape])

  const activeImage = isUsingUpload
    ? uploadedGarment?.previewUrl
    : selectedGarment?.imageUrl

  const activeName = isUsingUpload
    ? uploadedGarment?.fileName
    : selectedGarment?.name

  // Studio lighting background gradient
  const getLightingStyle = () => {
    switch (lighting) {
      case 'daylight':
        return {
          background: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F5F1EB 60%, #E9E1D5 100%)',
          filter: 'contrast(1.02)'
        }
      case 'monochrome':
        return {
          background: 'radial-gradient(circle at 50% 30%, #F8F8F8 0%, #ECECEC 60%, #D4D4D4 100%)',
          filter: 'grayscale(0.9) contrast(1.05)'
        }
      case 'warm-editorial':
      default:
        return {
          background: 'radial-gradient(circle at 50% 25%, #FAF5EE 0%, #F0E6D8 55%, #E2D3BE 100%)',
          filter: 'contrast(1.0)'
        }
    }
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-elevated)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '620px'
    }}>
      {/* Viewport Top Control Bar */}
      <div style={{
        padding: '0.85rem 1.25rem',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        {/* Mode Switcher */}
        <div style={{
          display: 'flex',
          gap: '0.3rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          <button
            onClick={() => setViewMode('avatar')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: viewMode === 'avatar' ? 'var(--bg-surface)' : 'transparent',
              color: viewMode === 'avatar' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: viewMode === 'avatar' ? 600 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: viewMode === 'avatar' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            <Eye size={13} />
            <span>Mannequin View</span>
          </button>

          <button
            onClick={() => setViewMode('flat-lay')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: viewMode === 'flat-lay' ? 'var(--bg-surface)' : 'transparent',
              color: viewMode === 'flat-lay' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: viewMode === 'flat-lay' ? 600 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: viewMode === 'flat-lay' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            <Layers size={13} />
            <span>Flat Lay</span>
          </button>

          <button
            onClick={() => setViewMode('3d-preview')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: viewMode === '3d-preview' ? 'var(--bg-surface)' : 'transparent',
              color: viewMode === '3d-preview' ? 'var(--accent-terracotta)' : 'var(--text-secondary)',
              fontWeight: viewMode === '3d-preview' ? 600 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: viewMode === '3d-preview' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            <Box size={13} />
            <span>3D Orbit (Phase 3)</span>
          </button>
        </div>

        {/* Lighting & Angle Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Lighting presets */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.2rem'
          }}>
            <button
              onClick={() => setLighting('warm-editorial')}
              title="Warm Editorial Lighting"
              style={{
                border: 'none',
                background: lighting === 'warm-editorial' ? 'var(--bg-surface)' : 'transparent',
                color: lighting === 'warm-editorial' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
                padding: '0.3rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              <Flame size={14} />
            </button>
            <button
              onClick={() => setLighting('daylight')}
              title="Studio Daylight"
              style={{
                border: 'none',
                background: lighting === 'daylight' ? 'var(--bg-surface)' : 'transparent',
                color: lighting === 'daylight' ? 'var(--accent-brass)' : 'var(--text-muted)',
                padding: '0.3rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setLighting('monochrome')}
              title="Monochrome Silhouette"
              style={{
                border: 'none',
                background: lighting === 'monochrome' ? 'var(--bg-surface)' : 'transparent',
                color: lighting === 'monochrome' ? 'var(--text-primary)' : 'var(--text-muted)',
                padding: '0.3rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              <Contrast size={14} />
            </button>
          </div>

          {/* View angle buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <button
              onClick={() => setAngle('front')}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: angle === 'front' ? 'var(--border-dark)' : 'var(--border-subtle)',
                backgroundColor: angle === 'front' ? 'var(--text-primary)' : 'var(--bg-surface)',
                color: angle === 'front' ? 'var(--bg-canvas)' : 'var(--text-secondary)',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Front
            </button>
            <button
              onClick={() => setAngle('three-quarter')}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: angle === 'three-quarter' ? 'var(--border-dark)' : 'var(--border-subtle)',
                backgroundColor: angle === 'three-quarter' ? 'var(--text-primary)' : 'var(--bg-surface)',
                color: angle === 'three-quarter' ? 'var(--bg-canvas)' : 'var(--text-secondary)',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Profile
            </button>
            <button
              onClick={() => setAngle('detail')}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: angle === 'detail' ? 'var(--border-dark)' : 'var(--border-subtle)',
                backgroundColor: angle === 'detail' ? 'var(--text-primary)' : 'var(--bg-surface)',
                color: angle === 'detail' ? 'var(--bg-canvas)' : 'var(--text-secondary)',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Detail
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Viewport Canvas */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        minHeight: '480px',
        ...getLightingStyle(),
        transition: 'all var(--transition-normal)'
      }}>
        {/* Architectural Atelier Grid Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(160, 140, 120, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }} />

        {/* Prototype Honesty Watermark */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.35rem 0.65rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--badge-warning-text)',
          boxShadow: 'var(--shadow-subtle)',
          zIndex: 10
        }}>
          <Info size={13} color="var(--accent-terracotta)" />
          <span>Prototype Visualization • Not a calibrated cloth simulation</span>
        </div>

        {/* View Angle Pill */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          padding: '0.25rem 0.65rem',
          fontSize: '0.68rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-secondary)',
          zIndex: 10
        }}>
          {angle} • {avatarBodyType} Frame
        </div>

        {/* Content States: Empty, Loading, 3D Preview, or Active Visual */}
        {isLoadingDrape ? (
          /* Loading State */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            zIndex: 5
          }}>
            <div className="shimmer-box" style={{ width: '220px', height: '340px' }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}>
              <Sparkles size={14} className="animate-spin" color="var(--accent-terracotta)" />
              <span>Calibrating atelier drape preview...</span>
            </div>
          </div>
        ) : viewMode === '3d-preview' ? (
          /* 3D Viewer Milestone Preview */
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '2.5rem 2rem',
            maxWidth: '460px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-hover)',
            zIndex: 5
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--accent-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <Rotate3d size={28} />
            </div>

            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-terracotta)',
              marginBottom: '0.5rem'
            }}>
              Roadmap Milestone: Phase 3
            </div>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Interactive 3D Avatar Orbit
            </h3>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
              React Three Fiber and Three.js integration will load rotatable <code>.glb</code> atelier mannequins with orbit camera controls in Phase 3.
            </p>

            {/* Simulated Orbit Controls */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                <span>Simulated Camera Orbit:</span>
                <span>{simulatedOrbit}° Azimuth</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={simulatedOrbit}
                onChange={(e) => setSimulatedOrbit(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-terracotta)' }}
                aria-label="Simulated 3D Camera Orbit Slider"
              />
            </div>

            <button
              onClick={() => setViewMode('avatar')}
              style={{
                padding: '0.6rem 1.4rem',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Return to 2D Silhouette View
            </button>
          </div>
        ) : !selectedGarment && !uploadedGarment ? (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            maxWidth: '380px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '2.5rem 1.75rem',
            boxShadow: 'var(--shadow-subtle)',
            zIndex: 5
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--accent-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <Eye size={22} />
            </div>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Atelier Mannequin Ready
            </h3>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Select a piece from the curated collection or upload your own garment photo to begin the fitting preview.
            </p>

            <button
              onClick={() => onSelectSampleGarment(sampleGarments[0])}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.4rem',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Sparkles size={14} />
              <span>Load Silk Camp Shirt Demo</span>
            </button>
          </div>
        ) : (
          /* Active Garment & Mannequin Presentation */
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px',
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: angle === 'three-quarter'
              ? 'scale(0.96) rotate(-2deg)'
              : angle === 'detail'
              ? 'scale(1.28) translateY(10px)'
              : 'scale(1)',
            transition: 'transform var(--transition-smooth)',
            zIndex: 5
          }}>
            {/* Base Mannequin Silhouette Layer (When in avatar mode) */}
            {viewMode === 'avatar' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.88,
                transition: 'all var(--transition-normal)'
              }}>
                <img
                  src="/models/mannequin-standard.svg"
                  alt={`Atelier Mannequin Silhouette (${avatarBodyType})`}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            )}

            {/* Garment Overlay Layer */}
            <div style={{
              position: 'relative',
              zIndex: 3,
              width: viewMode === 'flat-lay' ? '80%' : '66%',
              maxHeight: '78%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: viewMode === 'avatar' ? 'translateY(-18px)' : 'none',
              filter: 'drop-shadow(0 12px 24px rgba(30, 27, 24, 0.12))'
            }}>
              <img
                src={activeImage}
                alt={activeName || 'Active garment'}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Viewport Bottom Status Strip */}
      <div style={{
        padding: '0.85rem 1.25rem',
        backgroundColor: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <strong>Active Subject:</strong>
          <span>{activeName || 'No Garment Selected'}</span>
          {isUsingUpload && (
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--accent-terracotta)',
              fontWeight: 600,
              border: '1px solid var(--border-subtle)'
            }}>
              Client Upload
            </span>
          )}
        </div>

        <div style={{ color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
          <span>Mode: {viewMode === 'avatar' ? '2D Mannequin Drape' : viewMode === 'flat-lay' ? 'Flat Lay View' : '3D Wireframe Preview'}</span>
          <span>Lighting: {lighting}</span>
        </div>
      </div>
    </div>
  )
}
