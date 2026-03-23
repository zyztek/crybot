import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Component, ReactNode } from 'react'
import ErrorBoundary from './ErrorBoundary'

// Test component that throws an error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Content without error</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Content without error')).toBeInTheDocument()
  })

  it('catches errors and displays fallback UI', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/An unexpected error occurred/)).toBeInTheDocument()
    expect(screen.getByText('Refresh Page')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('displays custom fallback when provided', () => {
    render(
      <ErrorBoundary
        fallback={<div>Custom fallback</div>}
      >
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Custom fallback')).toBeInTheDocument()
  })

  it('logs error to console when catching', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('renders nested children correctly', () => {
    render(
      <ErrorBoundary>
        <div>
          <span>Nested content</span>
        </div>
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Nested content')).toBeInTheDocument()
  })

  it('shows warning icon in error state', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    // The SVG warning icon should be present
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })
})