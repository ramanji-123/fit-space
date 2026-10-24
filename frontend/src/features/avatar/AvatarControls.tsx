import React from 'react'
import type { AvatarBodyType, BodyMeasurements, MeasurementUnit } from '../../types/avatar'
import { MANNEQUIN_PROFILES } from '../../lib/mannequinProfiles'
import { User, Info } from 'lucide-react'

interface AvatarControlsProps {
  selectedBodyType: AvatarBodyType
  measurements: BodyMeasurements
  onSelectBodyType: (type: AvatarBodyType) => void
  onUpdateMeasurements: (measurements: BodyMeasurements) => void
}

export const AvatarControls: React.FC<AvatarControlsProps> = ({
  selectedBodyType,
  measurements,
  onSelectBodyType,
  onUpdateMeasurements,
}) => {
  const currentProfile = MANNEQUIN_PROFILES.find((p) => p.id === selectedBodyType) || MANNEQUIN_PROFILES[0]

  const handleUnitToggle = (newUnit: MeasurementUnit) => {
    if (newUnit === measurements.unit) return

    if (newUnit === 'in') {
      // Convert cm to in
      onUpdateMeasurements({
        unit: 'in',
        height: Math.round(measurements.height / 2.54),
        chest: Math.round(measurements.chest / 2.54),
        waist: Math.round(measurements.waist / 2.54),
        hip: Math.round(measurements.hip / 2.54),
      })
    } else {
      // Convert in to cm
      onUpdateMeasurements({
        unit: 'cm',
        height: Math.round(measurements.height * 2.54),
        chest: Math.round(measurements.chest * 2.54),
        waist: Math.round(measurements.waist * 2.54),
        hip: Math.round(measurements.hip * 2.54),
      })
    }
  }

  const handleMeasurementChange = (field: keyof Omit<BodyMeasurements, 'unit'>, value: number) => {
    onUpdateMeasurements({
      ...measurements,
      [field]: isNaN(value) ? 0 : value,
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
            <User size={16} color="var(--accent-terracotta)" />
            <span>Mannequin Proportions</span>
          </h4>
          <span style={{
            fontSize: '0.7rem',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--badge-warning-bg)',
            color: 'var(--badge-warning-text)',
            border: '1px solid var(--badge-warning-border)',
            fontWeight: 600
          }}>
            Phase 1 Wireframe
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          Select standard mannequin profiles or adjust calibration benchmarks.
        </p>
      </div>

      {/* Profile Selector Chips */}
      <div>
        <label style={{
          fontSize: '0.76rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          display: 'block',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Standard Frame Presets
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.5rem'
        }}>
          {MANNEQUIN_PROFILES.map((profile) => {
            const isSelected = profile.id === selectedBodyType
            return (
              <button
                key={profile.id}
                onClick={() => {
                  onSelectBodyType(profile.id)
                  // Apply profile defaults
                  const defaults = profile.defaultMeasurementsCm
                  if (measurements.unit === 'cm') {
                    onUpdateMeasurements({
                      unit: 'cm',
                      height: defaults.height,
                      chest: defaults.chest,
                      waist: defaults.waist,
                      hip: defaults.hip,
                    })
                  } else {
                    onUpdateMeasurements({
                      unit: 'in',
                      height: Math.round(defaults.height / 2.54),
                      chest: Math.round(defaults.chest / 2.54),
                      waist: Math.round(defaults.waist / 2.54),
                      hip: Math.round(defaults.hip / 2.54),
                    })
                  }
                }}
                style={{
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `1.5px solid ${isSelected ? 'var(--accent-terracotta)' : 'var(--border-subtle)'}`,
                  backgroundColor: isSelected ? 'var(--bg-accent-subtle)' : 'var(--bg-subtle)',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {profile.label.split(' ')[0]} Frame
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {profile.subtitle}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Proportions Breakdown */}
      <div style={{
        backgroundColor: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.75rem',
        fontSize: '0.76rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.45
      }}>
        <strong>{currentProfile.label}:</strong> {currentProfile.proportionsDescription}
      </div>

      {/* Measurement Inputs */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.65rem'
        }}>
          <label style={{
            fontSize: '0.76rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Calibration Dimensions
          </label>

          {/* Unit Toggle */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.15rem'
          }}>
            <button
              onClick={() => handleUnitToggle('cm')}
              style={{
                border: 'none',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: measurements.unit === 'cm' ? 'var(--bg-surface)' : 'transparent',
                color: measurements.unit === 'cm' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              CM
            </button>
            <button
              onClick={() => handleUnitToggle('in')}
              style={{
                border: 'none',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: measurements.unit === 'in' ? 'var(--bg-surface)' : 'transparent',
                color: measurements.unit === 'in' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              IN
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem'
        }}>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Height ({measurements.unit})
            </label>
            <input
              type="number"
              value={measurements.height || ''}
              onChange={(e) => handleMeasurementChange('height', Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-surface)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontWeight: 500
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Chest / Bust ({measurements.unit})
            </label>
            <input
              type="number"
              value={measurements.chest || ''}
              onChange={(e) => handleMeasurementChange('chest', Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-surface)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontWeight: 500
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Waist ({measurements.unit})
            </label>
            <input
              type="number"
              value={measurements.waist || ''}
              onChange={(e) => handleMeasurementChange('waist', Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-surface)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontWeight: 500
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Hips ({measurements.unit})
            </label>
            <input
              type="number"
              value={measurements.hip || ''}
              onChange={(e) => handleMeasurementChange('hip', Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-surface)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontWeight: 500
              }}
            />
          </div>
        </div>
      </div>

      {/* Honest Boundary Notice */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
        fontSize: '0.73rem',
        color: 'var(--text-muted)',
        lineHeight: 1.45,
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '0.75rem'
      }}>
        <Info size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-brass)' }} />
        <span>
          <strong>Phase 1 Scope:</strong> Mannequin profile adjusts visual scale. Deterministic size calculation and parametric mesh deformation are scheduled for Phases 2 & 3.
        </span>
      </div>
    </div>
  )
}
