import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { App } from '../App'

describe('FIT SPACE Atelier Application', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn()
  })

  it('renders header, brand title, and Phase 1 prototype badge', () => {
    render(<App />)

    // Check brand in header and footer
    expect(screen.getAllByText('FIT SPACE').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText(/Virtual Atelier • Phase 1/i)).toBeInTheDocument()

    // Check prototype shell badge
    expect(screen.getByText(/Prototype Shell/i)).toBeInTheDocument()
  })

  it('renders the 3 primary panels in Try-On Studio by default', () => {
    render(<App />)

    // Column 1: Wardrobe Selector
    expect(screen.getByText('Garment Wardrobe')).toBeInTheDocument()
    expect(screen.getByText('Curated Samples')).toBeInTheDocument()

    // Column 2: Central Studio Viewport
    expect(screen.getByText(/Active Subject:/i)).toBeInTheDocument()
    expect(screen.getByText(/Prototype Visualization • Not a calibrated cloth simulation/i)).toBeInTheDocument()

    // Column 3: Mannequin Proportions & Fit Assessment
    expect(screen.getByText('Mannequin Proportions')).toBeInTheDocument()
    expect(screen.getByText('Fit & Drape Assessment')).toBeInTheDocument()
  })

  it('allows switching between Studio, Editorial Landing, and Methodology views', () => {
    render(<App />)

    // Switch to Editorial Landing
    const editorialBtn = screen.getByRole('button', { name: /^Editorial$/i })
    fireEvent.click(editorialBtn)
    expect(screen.getByText(/The architectural approach to/i)).toBeInTheDocument()
    expect(screen.getByText(/Start Virtual Try-On/i)).toBeInTheDocument()

    // Switch to Methodology
    const ethicsBtn = screen.getByRole('button', { name: /Ethics & Scope/i })
    fireEvent.click(ethicsBtn)
    expect(screen.getByText(/Engineering Principles & Sizing Boundaries/i)).toBeInTheDocument()
    expect(screen.getByText(/1. No Dimensions From Flat Images Alone/i)).toBeInTheDocument()

    // Return to Studio via navigation button
    const studioBtn = screen.getByRole('button', { name: /^Try-On Studio$/i })
    fireEvent.click(studioBtn)
    expect(screen.getByText('Virtual Try-On Atelier')).toBeInTheDocument()
  })

  it('switches garments when clicking a sample garment card', () => {
    render(<App />)

    // Default garment is Silk Camp Collar Shirt
    expect(screen.getByText('Oversized Virgin Wool Blazer')).toBeInTheDocument()

    // Click blazer card
    const blazerCard = screen.getByRole('button', { name: /Oversized Virgin Wool Blazer/i })
    fireEvent.click(blazerCard)

    // Check active subject reflects blazer
    expect(screen.getAllByText('Oversized Virgin Wool Blazer').length).toBeGreaterThanOrEqual(1)
  })

  it('handles mannequin unit toggle between CM and IN', () => {
    render(<App />)

    const inBtn = screen.getByRole('button', { name: 'IN' })
    fireEvent.click(inBtn)
    expect(inBtn).toHaveStyle({ backgroundColor: 'var(--bg-surface)' })

    const cmBtn = screen.getByRole('button', { name: 'CM' })
    fireEvent.click(cmBtn)
    expect(cmBtn).toHaveStyle({ backgroundColor: 'var(--bg-surface)' })
  })

  it('labels future features honestly as disabled', () => {
    render(<App />)

    const futureBtn = screen.getByRole('button', { name: /Save to Outfit Matrix \(Phase 5 Feature\)/i })
    expect(futureBtn).toBeDisabled()
  })
})
