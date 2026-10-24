import React, { useState } from 'react'
import type { Garment, UploadedGarment } from '../../types/garment'
import type { BodyMeasurements } from '../../types/avatar'
import {
  ShieldAlert,
  Ruler,
  HelpCircle,
  Copy,
  Bookmark,
  Check
} from 'lucide-react'

interface FitResultsPanelProps {
  selectedGarment: Garment | null
  uploadedGarment: UploadedGarment | null
  isUsingUpload: boolean
  measurements: BodyMeasurements
}

export const FitResultsPanel: React.FC<FitResultsPanelProps> = ({
  selectedGarment,
  uploadedGarment,
  isUsingUpload,
  measurements,
}) => {
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>('M')
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false)

  // Calculate ease for sample garment if measurements available
  const activeSizeData = selectedGarment?.sizeChart.find((s) => s.size === selectedSize)

  // Normalize chest measurement to cm for calculation
  const chestCm = measurements.unit === 'in'
    ? measurements.chest * 2.54
    : measurements.chest

  const chestEaseCm = activeSizeData && activeSizeData.chestCm > 0 && chestCm > 0
    ? Math.round(activeSizeData.chestCm - chestCm)
    : null

  const handleCopyNotes = () => {
    const textToCopy = isUsingUpload
      ? `FIT SPACE Atelier Notes: Uploaded item (${uploadedGarment?.fileName}). Advisory preview only; measurements required for size matching.`
      : `FIT SPACE Atelier Notes: ${selectedGarment?.name} (Size ${selectedSize}). Silhouette: ${selectedGarment?.silhouette}. Estimated Chest Ease: ${chestEaseCm !== null ? `${chestEaseCm > 0 ? `+${chestEaseCm}` : chestEaseCm}cm` : 'N/A'}.`

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedNotes(true)
      setTimeout(() => setCopiedNotes(false), 2000)
    })
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      boxShadow: 'var(--shadow-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      {/* Panel Header */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.4rem'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}>
            <Ruler size={16} color="var(--accent-terracotta)" />
            <span>Fit & Drape Assessment</span>
          </h4>
          <span style={{
            fontSize: '0.7rem',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            border: '1px solid var(--border-subtle)'
          }}>
            Advisory Guide
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          Transparent silhouette breakdown based on reference pattern ease.
        </p>
      </div>

      {/* Mandatory Honesty Warning Banner */}
      <div style={{
        backgroundColor: 'var(--badge-warning-bg)',
        border: '1px solid var(--badge-warning-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.85rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.65rem'
      }}>
        <ShieldAlert size={17} style={{ color: 'var(--badge-warning-text)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--badge-warning-text)',
            letterSpacing: '0.02em',
            marginBottom: '0.25rem'
          }}>
            Preview Prototype — Not a Guaranteed Fit
          </div>
          <div style={{ fontSize: '0.73rem', color: 'var(--badge-warning-text)', lineHeight: 1.45 }}>
            Digital models illustrate approximate silhouette and cut intent. Real fabric tension depends on individual posture and exact manufacturer tolerances.
          </div>
        </div>
      </div>

      {/* When Uploaded Custom Image Without Specs */}
      {isUsingUpload ? (
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          padding: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--accent-brass)',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            <HelpCircle size={15} />
            <span>Raw Image Mode (Limited Data)</span>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            You have uploaded <strong>{uploadedGarment?.fileName}</strong>. Because flat photos do not contain calibrated measurement metadata, FIT SPACE does not fabricate a size recommendation.
          </p>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            lineHeight: 1.45,
            border: '1px dashed var(--border-medium)'
          }}>
            <strong>Phase 2 Roadmap:</strong> In Phase 2, a size-spec entry module will allow you to input garment flat measurements (pit-to-pit, waist, inseam) for deterministic calculation.
          </div>
        </div>
      ) : selectedGarment ? (
        /* When Sample Garment is Selected */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Size Chart Selector */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.45rem'
            }}>
              <label style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Evaluate Reference Size
              </label>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Graded Specs
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.35rem'
            }}>
              {(['XS', 'S', 'M', 'L', 'XL'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedSize === sz ? 'var(--text-primary)' : 'var(--border-subtle)',
                    backgroundColor: selectedSize === sz ? 'var(--text-primary)' : 'var(--bg-surface)',
                    color: selectedSize === sz ? 'var(--bg-canvas)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing & Ease Calculation Box */}
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.9rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--accent-terracotta)',
              marginBottom: '0.3rem'
            }}>
              Silhouette Intent & Ease
            </div>

            <div style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.4rem'
            }}>
              {selectedGarment.silhouette}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0',
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)'
            }}>
              <span>Calculated Chest Ease (Size {selectedSize}):</span>
              <strong style={{
                color: chestEaseCm !== null && chestEaseCm >= 0 ? 'var(--text-primary)' : 'var(--accent-terracotta)'
              }}>
                {chestEaseCm !== null ? `${chestEaseCm >= 0 ? `+${chestEaseCm}` : chestEaseCm} cm` : 'Calibrate chest'}
              </strong>
            </div>

            <div style={{
              fontSize: '0.74rem',
              color: 'var(--text-secondary)',
              marginTop: '0.5rem',
              lineHeight: 1.45
            }}>
              {selectedGarment.referenceFitNote}
            </div>
          </div>

          {/* Fabric Behavior & Draping */}
          <div>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.4rem'
            }}>
              Fabric Characteristics
            </div>
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.76rem',
              color: 'var(--text-secondary)'
            }}>
              <div><strong>Material:</strong> {selectedGarment.fabric}</div>
              <div><strong>Drape Behavior:</strong> {selectedGarment.fabricBehavior}</div>
              <div><strong>Care:</strong> {selectedGarment.care}</div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div style={{
          padding: '2rem 1rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.82rem'
        }}>
          Select a garment to view fit specifications.
        </div>
      )}

      {/* Atelier Actions */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '1rem'
      }}>
        <button
          onClick={handleCopyNotes}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-medium)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          {copiedNotes ? (
            <>
              <Check size={14} color="var(--badge-success-text)" />
              <span>Notes Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Atelier Fit Notes</span>
            </>
          )}
        </button>

        {/* Disabled Button Clearly Labelled for Later Phase */}
        <button
          disabled
          title="Outfit comparison will be implemented in Phase 5"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px dashed var(--border-medium)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-muted)',
            fontSize: '0.78rem',
            fontWeight: 500,
            cursor: 'not-allowed',
            opacity: 0.8
          }}
        >
          <Bookmark size={14} />
          <span>Save to Outfit Matrix (Phase 5 Feature)</span>
        </button>
      </div>
    </div>
  )
}
