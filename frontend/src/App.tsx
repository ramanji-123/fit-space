import React, { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './features/landing/HeroSection'
import { GarmentSelector } from './features/tryon/GarmentSelector'
import { StudioViewport } from './features/tryon/StudioViewport'
import { AvatarControls } from './features/avatar/AvatarControls'
import { FitResultsPanel } from './features/fit-guidance/FitResultsPanel'
import { MethodologyView } from './features/methodology/MethodologyView'
import { SAMPLE_GARMENTS } from './lib/sampleGarments'
import { MANNEQUIN_PROFILES } from './lib/mannequinProfiles'
import type { Garment, UploadedGarment } from './types/garment'
import type { AvatarBodyType, BodyMeasurements } from './types/avatar'

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'studio' | 'methodology'>('studio')

  // Active garment state (defaults to first sample garment for instant visual delight)
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(SAMPLE_GARMENTS[0])
  const [uploadedGarment, setUploadedGarment] = useState<UploadedGarment | null>(null)
  const [isUsingUpload, setIsUsingUpload] = useState<boolean>(false)

  // Avatar and measurement state
  const [selectedBodyType, setSelectedBodyType] = useState<AvatarBodyType>('standard')
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    unit: 'cm',
    height: MANNEQUIN_PROFILES[0].defaultMeasurementsCm.height,
    chest: MANNEQUIN_PROFILES[0].defaultMeasurementsCm.chest,
    waist: MANNEQUIN_PROFILES[0].defaultMeasurementsCm.waist,
    hip: MANNEQUIN_PROFILES[0].defaultMeasurementsCm.hip,
  })

  // Handlers
  const handleSelectSampleGarment = (garment: Garment) => {
    setSelectedGarment(garment)
    setIsUsingUpload(false)
  }

  const handleUploadSuccess = (upload: UploadedGarment) => {
    setUploadedGarment(upload)
    setIsUsingUpload(true)
  }

  const handleClearUpload = () => {
    if (uploadedGarment?.previewUrl) {
      URL.revokeObjectURL(uploadedGarment.previewUrl)
    }
    setUploadedGarment(null)
    setIsUsingUpload(false)
    if (!selectedGarment) {
      setSelectedGarment(SAMPLE_GARMENTS[0])
    }
  }

  const handleSwitchToUploadMode = () => {
    if (uploadedGarment) {
      setIsUsingUpload(true)
    }
  }

  const handleResetStudio = () => {
    setSelectedGarment(null)
    setIsUsingUpload(false)
  }

  const handleStartTryOn = (garmentId?: string) => {
    if (garmentId) {
      const g = SAMPLE_GARMENTS.find((item) => item.id === garmentId)
      if (g) {
        setSelectedGarment(g)
        setIsUsingUpload(false)
      }
    }
    setCurrentView('studio')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        onResetStudio={handleResetStudio}
        hasActiveSelection={Boolean(selectedGarment || uploadedGarment)}
      />

      <main style={{ flex: 1 }}>
        {currentView === 'landing' && (
          <HeroSection
            onStartTryOn={handleStartTryOn}
            sampleGarments={SAMPLE_GARMENTS}
          />
        )}

        {currentView === 'methodology' && (
          <MethodologyView onReturnToStudio={() => setCurrentView('studio')} />
        )}

        {currentView === 'studio' && (
          <section style={{
            paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            paddingBottom: '3rem'
          }}>
            <div className="container">
              {/* Studio Workspace Header Banner */}
              <div style={{
                marginBottom: '1.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '1rem'
              }}>
                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.15
                  }}>
                    Virtual Try-On Atelier
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Evaluate reference silhouettes on calibrated mannequins with deterministic measurement analysis.
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#2D8A4E'
                  }} />
                  <span>Phase 1 Sandbox Active</span>
                </div>
              </div>

              {/* 3-Column Studio Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
                alignItems: 'start'
              }}>
                {/* Column 1: Wardrobe Selector & Upload (approx 340px) */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}>
                  <GarmentSelector
                    sampleGarments={SAMPLE_GARMENTS}
                    selectedGarmentId={selectedGarment?.id || null}
                    uploadedGarment={uploadedGarment}
                    isUsingUpload={isUsingUpload}
                    onSelectSampleGarment={handleSelectSampleGarment}
                    onUploadSuccess={handleUploadSuccess}
                    onClearUpload={handleClearUpload}
                    onSwitchToUploadMode={handleSwitchToUploadMode}
                  />
                </div>

                {/* Column 2: Central Studio Viewport Canvas (Hero preview stage) */}
                <div style={{ minWidth: 0 }}>
                  <StudioViewport
                    selectedGarment={selectedGarment}
                    uploadedGarment={uploadedGarment}
                    isUsingUpload={isUsingUpload}
                    avatarBodyType={selectedBodyType}
                    onSelectSampleGarment={handleSelectSampleGarment}
                    sampleGarments={SAMPLE_GARMENTS}
                  />
                </div>

                {/* Column 3: Mannequin Proportions & Fit Assessment (approx 340px) */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  <AvatarControls
                    selectedBodyType={selectedBodyType}
                    measurements={measurements}
                    onSelectBodyType={setSelectedBodyType}
                    onUpdateMeasurements={setMeasurements}
                  />

                  <FitResultsPanel
                    selectedGarment={selectedGarment}
                    uploadedGarment={uploadedGarment}
                    isUsingUpload={isUsingUpload}
                    measurements={measurements}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
export default App
