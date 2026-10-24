import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { UploadDropZone } from '../features/upload/UploadDropZone'
import type { UploadedGarment } from '../types/garment'

describe('UploadDropZone Component', () => {
  const mockOnUploadSuccess = vi.fn()
  const mockOnClearUpload = vi.fn()

  it('renders upload instructions and Phase 1 preview banner', () => {
    render(
      <UploadDropZone
        uploadedGarment={null}
        onUploadSuccess={mockOnUploadSuccess}
        onClearUpload={mockOnClearUpload}
      />
    )

    expect(screen.getByText('Garment Image Upload')).toBeInTheDocument()
    expect(screen.getByText('Phase 1 Preview')).toBeInTheDocument()
    expect(screen.getByText(/Click or drag garment image here/i)).toBeInTheDocument()
  })

  it('rejects unsupported file formats with descriptive error message', () => {
    render(
      <UploadDropZone
        uploadedGarment={null}
        onUploadSuccess={mockOnUploadSuccess}
        onClearUpload={mockOnClearUpload}
      />
    )

    const fileInput = screen.getByLabelText(/Upload garment image file drop zone/i).querySelector('input[type="file"]') as HTMLInputElement
    const badFile = new File(['plain text'], 'notes.txt', { type: 'text/plain' })

    fireEvent.change(fileInput, { target: { files: [badFile] } })

    expect(screen.getByText(/Unsupported file type: "text\/plain"/i)).toBeInTheDocument()
    expect(mockOnUploadSuccess).not.toHaveBeenCalled()
  })

  it('renders uploaded preview details and allows clearing', () => {
    const mockUpload: UploadedGarment = {
      id: 'upload-123',
      fileName: 'cashmere_sweater.png',
      fileSizeFormatted: '1.24 MB',
      fileType: 'image/png',
      previewUrl: 'blob:http://localhost/sample-blob',
      uploadedAt: '12:00 PM',
      isSimulatedDemo: true,
    }

    render(
      <UploadDropZone
        uploadedGarment={mockUpload}
        onUploadSuccess={mockOnUploadSuccess}
        onClearUpload={mockOnClearUpload}
      />
    )

    expect(screen.getByText('cashmere_sweater.png')).toBeInTheDocument()
    expect(screen.getByText(/1.24 MB • PNG/i)).toBeInTheDocument()

    const clearBtn = screen.getByRole('button', { name: /Remove uploaded image/i })
    fireEvent.click(clearBtn)
    expect(mockOnClearUpload).toHaveBeenCalledTimes(1)
  })
})
