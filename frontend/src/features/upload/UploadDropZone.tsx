import React, { useState, useRef } from 'react'
import { Upload, X, AlertCircle, FileCheck, Info } from 'lucide-react'
import type { UploadedGarment } from '../../types/garment'

interface UploadDropZoneProps {
  uploadedGarment: UploadedGarment | null
  onUploadSuccess: (upload: UploadedGarment) => void
  onClearUpload: () => void
}

export const UploadDropZone: React.FC<UploadDropZoneProps> = ({
  uploadedGarment,
  onUploadSuccess,
  onClearUpload,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = (file: File) => {
    setErrorMessage(null)

    // Allowed types check (Phase 1 client preview)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        `Unsupported file type: "${file.type || 'unknown'}". Please select a JPEG, PNG, WebP, or SVG garment image.`
      )
      return
    }

    // Size limit check: max 8MB
    const maxBytes = 8 * 1024 * 1024
    if (file.size > maxBytes) {
      setErrorMessage(
        `File exceeds 8MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a smaller garment image.`
      )
      return
    }

    const objectUrl = URL.createObjectURL(file)
    const formattedSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(0)} KB`

    const newUpload: UploadedGarment = {
      id: `upload-${Date.now()}`,
      fileName: file.name,
      fileSizeFormatted: formattedSize,
      fileType: file.type,
      previewUrl: objectUrl,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSimulatedDemo: true,
    }

    onUploadSuccess(newUpload)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      boxShadow: 'var(--shadow-subtle)'
    }}>
      {/* Header and Honest Phase 1 Notice */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.4rem'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Garment Image Upload
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
            Phase 1 Preview
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          Upload a flat product photo to preview against atelier mannequins.
        </p>
      </div>

      {/* Upload Zone or Active Upload Preview */}
      {!uploadedGarment ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? 'var(--accent-terracotta)' : 'var(--border-medium)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            backgroundColor: isDragging ? 'var(--bg-accent-subtle)' : 'var(--bg-subtle)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload garment image file drop zone"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            style={{ display: 'none' }}
          />

          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--accent-terracotta)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.85rem auto',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <Upload size={20} />
          </div>

          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Click or drag garment image here
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Supports PNG, JPEG, WebP, or SVG (Max 8MB)
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Thumbnail */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img
              src={uploadedGarment.previewUrl}
              alt={uploadedGarment.fileName}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--badge-success-text)',
              fontSize: '0.75rem',
              fontWeight: 600,
              marginBottom: '0.2rem'
            }}>
              <FileCheck size={14} />
              <span>Loaded in Client Memory</span>
            </div>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {uploadedGarment.fileName}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {uploadedGarment.fileSizeFormatted} • {uploadedGarment.fileType.split('/')[1]?.toUpperCase()}
            </div>
          </div>

          {/* Clear Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClearUpload()
            }}
            title="Remove uploaded image"
            aria-label="Remove uploaded image"
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Error Feedback Alert */}
      {errorMessage && (
        <div style={{
          marginTop: '0.85rem',
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: '#FFF2F2',
          border: '1px solid #F5C6CB',
          color: '#842029',
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem'
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Transparency Note */}
      <div style={{
        marginTop: '0.85rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
        fontSize: '0.73rem',
        color: 'var(--text-muted)',
        lineHeight: 1.45
      }}>
        <Info size={13} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-brass)' }} />
        <span>
          <strong>Data Isolation:</strong> Phase 1 processes previews locally using browser Object URLs. No data is stored or sent to external servers.
        </span>
      </div>
    </div>
  )
}
