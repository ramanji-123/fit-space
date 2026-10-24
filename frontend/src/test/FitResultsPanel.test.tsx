import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FitResultsPanel } from '../features/fit-guidance/FitResultsPanel'
import { SAMPLE_GARMENTS } from '../lib/sampleGarments'
import type { UploadedGarment } from '../types/garment'
import type { BodyMeasurements } from '../types/avatar'

describe('FitResultsPanel Component', () => {
  const sampleMeasurements: BodyMeasurements = {
    unit: 'cm',
    height: 178,
    chest: 92,
    waist: 76,
    hip: 96,
  }

  it('renders prominent prototype honesty warning', () => {
    render(
      <FitResultsPanel
        selectedGarment={SAMPLE_GARMENTS[0]}
        uploadedGarment={null}
        isUsingUpload={false}
        measurements={sampleMeasurements}
      />
    )

    expect(screen.getByText('Preview Prototype — Not a Guaranteed Fit')).toBeInTheDocument()
    expect(screen.getByText(/Digital models illustrate approximate silhouette and cut intent/i)).toBeInTheDocument()
  })

  it('renders ease calculation and fabric properties for sample garments', () => {
    render(
      <FitResultsPanel
        selectedGarment={SAMPLE_GARMENTS[0]}
        uploadedGarment={null}
        isUsingUpload={false}
        measurements={sampleMeasurements}
      />
    )

    expect(screen.getByText('Silhouette Intent & Ease')).toBeInTheDocument()
    expect(screen.getByText(SAMPLE_GARMENTS[0].silhouette)).toBeInTheDocument()
    expect(screen.getByText(/Calculated Chest Ease/i)).toBeInTheDocument()
    expect(screen.getByText(/Mulberry Silk Crepe de Chine/i)).toBeInTheDocument()
  })

  it('shows missing-measurement limitation when custom image is uploaded', () => {
    const mockUpload: UploadedGarment = {
      id: 'upload-999',
      fileName: 'linen_tunic.jpg',
      fileSizeFormatted: '850 KB',
      fileType: 'image/jpeg',
      previewUrl: 'blob:http://localhost/sample-blob',
      uploadedAt: '12:00 PM',
      isSimulatedDemo: true,
    }

    render(
      <FitResultsPanel
        selectedGarment={null}
        uploadedGarment={mockUpload}
        isUsingUpload={true}
        measurements={sampleMeasurements}
      />
    )

    expect(screen.getByText(/Raw Image Mode \(Limited Data\)/i)).toBeInTheDocument()
    expect(screen.getByText(/flat photos do not contain calibrated measurement metadata/i)).toBeInTheDocument()
  })
})
