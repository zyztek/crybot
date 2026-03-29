import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders loading spinner element', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders loading text', () => {
    render(<LoadingSpinner />)
    expect(screen.getAllByText('Loading...')).toHaveLength(1)
  })

  it('renders with correct container classes', () => {
    render(<LoadingSpinner />)
    const container = document.querySelector('.min-h-screen')
    expect(container).toBeInTheDocument()
    expect(container?.className).toContain('flex')
    expect(container?.className).toContain('items-center')
    expect(container?.className).toContain('justify-center')
  })

  it('renders gradient background', () => {
    render(<LoadingSpinner />)
    const container = document.querySelector('.min-h-screen')
    expect(container?.className).toContain('bg-gradient-to-br')
  })

  it('renders spinner with border classes', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner?.className).toContain('border-4')
    expect(spinner?.className).toContain('border-purple-500/30')
    expect(spinner?.className).toContain('border-t-purple-500')
  })

  it('renders spinner with rounded-full', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner?.className).toContain('rounded-full')
  })

  it('renders flex column layout for content', () => {
    render(<LoadingSpinner />)
    const content = document.querySelector('.flex-col')
    expect(content).toBeInTheDocument()
    expect(content?.className).toContain('items-center')
    expect(content?.className).toContain('gap-4')
  })
})