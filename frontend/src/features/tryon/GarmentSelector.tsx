import React, { useState } from 'react'
import type { Garment, UploadedGarment } from '../../types/garment'
import { UploadDropZone } from '../upload/UploadDropZone'
import { Check, Sparkles, Filter } from 'lucide-react'

interface GarmentSelectorProps {
  sampleGarments: Garment[]
  selectedGarmentId: string | null
  uploadedGarment: UploadedGarment | null
  isUsingUpload: boolean
  onSelectSampleGarment: (garment: Garment) => void
  onUploadSuccess: (upload: UploadedGarment) => void
  onClearUpload: () => void
  onSwitchToUploadMode: () => void
}

export const GarmentSelector: React.FC<GarmentSelectorProps> = ({
  sampleGarments,
  selectedGarmentId,
  uploadedGarment,
  isUsingUpload,
  onSelectSampleGarment,
  onUploadSuccess,
  onClearUpload,
  onSwitchToUploadMode,
}) => {
  const [activeTab, setActiveTab] = useState<'samples' | 'upload'>('samples')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredGarments = sampleGarments.filter((g) => {
    if (categoryFilter === 'all') return true
    return g.category === categoryFilter
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Selector Header & Segmented Tabs */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.85rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Garment Wardrobe
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Choose a reference piece or test your own image
            </p>
          </div>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--accent-terracotta)',
            backgroundColor: 'var(--bg-accent-subtle)',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)'
          }}>
            {sampleGarments.length} Pieces Ready
          </span>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.4rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          <button
            onClick={() => setActiveTab('samples')}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'samples' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'samples' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'samples' ? 600 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: activeTab === 'samples' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            Curated Samples
          </button>

          <button
            onClick={() => {
              setActiveTab('upload')
              if (uploadedGarment) {
                onSwitchToUploadMode()
              }
            }}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'upload' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'upload' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'upload' ? 600 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              boxShadow: activeTab === 'upload' ? 'var(--shadow-subtle)' : 'none'
            }}
          >
            Custom Upload
          </button>
        </div>
      </div>

      {/* Upload Panel */}
      {activeTab === 'upload' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <UploadDropZone
            uploadedGarment={uploadedGarment}
            onUploadSuccess={(upload) => {
              onUploadSuccess(upload)
              onSwitchToUploadMode()
            }}
            onClearUpload={onClearUpload}
          />
          {uploadedGarment && (
            <div style={{
              backgroundColor: isUsingUpload ? 'var(--bg-accent-subtle)' : 'var(--bg-surface)',
              border: `1.5px solid ${isUsingUpload ? 'var(--accent-terracotta)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Active Studio Garment:
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {uploadedGarment.fileName}
                </div>
              </div>
              <button
                onClick={onSwitchToUploadMode}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-canvas)',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isUsingUpload ? 'Currently Selected' : 'Select for Try-On'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Curated Sample Cards */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Category Filter Chips */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            overflowX: 'auto',
            paddingBottom: '0.2rem'
          }}>
            <Filter size={13} color="var(--text-muted)" style={{ flexShrink: 0, marginLeft: '0.2rem' }} />
            {['all', 'top', 'outerwear', 'bottom', 'dress'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: categoryFilter === cat ? 'var(--text-primary)' : 'var(--border-subtle)',
                  backgroundColor: categoryFilter === cat ? 'var(--text-primary)' : 'var(--bg-surface)',
                  color: categoryFilter === cat ? 'var(--bg-canvas)' : 'var(--text-secondary)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Garment Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            maxHeight: '520px',
            overflowY: 'auto',
            paddingRight: '0.25rem'
          }}>
            {filteredGarments.map((garment) => {
              const isSelected = !isUsingUpload && selectedGarmentId === garment.id
              return (
                <div
                  key={garment.id}
                  onClick={() => onSelectSampleGarment(garment)}
                  role="button"
                  tabIndex={0}
                  aria-label={garment.name}
                  aria-pressed={isSelected}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-surface)',
                    border: `1.5px solid ${isSelected ? 'var(--accent-terracotta)' : 'var(--border-subtle)'}`,
                    boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-medium)'
                      e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
                    }
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: '74px',
                    height: '84px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-subtle)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img
                      src={garment.imageUrl}
                      alt={garment.name}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.2rem'
                    }}>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--accent-terracotta)'
                      }}>
                        {garment.category}
                      </span>
                      {isSelected && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: 'var(--accent-terracotta)'
                        }}>
                          <Check size={13} strokeWidth={2.5} /> Active
                        </span>
                      )}
                    </div>

                    <h4 style={{
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                      marginBottom: '0.25rem'
                    }}>
                      {garment.name}
                    </h4>

                    <div style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.35,
                      marginBottom: '0.35rem'
                    }}>
                      {garment.fabric.split('(')[0]}
                    </div>

                    <div style={{
                      marginTop: 'auto',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: garment.colorHex,
                        border: '1px solid rgba(0,0,0,0.1)'
                      }} />
                      <span>{garment.colorName}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* License Note */}
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            padding: '0.5rem 0.75rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Sparkles size={12} color="var(--accent-brass)" />
            <span>All 5 pieces are original FIT SPACE CC0 reference assets.</span>
          </div>
        </div>
      )}
    </div>
  )
}
