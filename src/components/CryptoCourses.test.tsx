import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { CryptoCourses } from './CryptoCourses'

describe('CryptoCourses', () => {
  it('renders title', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('Crypto Academy')
  })

  it('renders stats cards', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('Cursos')
    expect(container.textContent).toContain('Completados')
    expect(container.textContent).toContain('Certificados')
    expect(container.textContent).toContain('Rating Promedio')
  })

  it('renders tabs', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('Catálogo')
    expect(container.textContent).toContain('Mis Cursos')
    expect(container.textContent).toContain('Certificados')
  })

  it('renders course cards', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('Bitcoin Fundamentals')
    expect(container.textContent).toContain('DeFi Mastery')
    expect(container.textContent).toContain('Smart Contracts')
  })

  it('renders course categories', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('Basics')
    expect(container.textContent).toContain('DeFi')
  })

  it('renders course levels', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('beginner')
    expect(container.textContent).toContain('intermediate')
    expect(container.textContent).toContain('advanced')
  })

  it('renders ratings', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('estudiantes')
  })

  it('renders duration', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('hours')
  })

  it('renders search input', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('renders certificates section', () => {
    const { container } = render(<CryptoCourses />)
    expect(container.textContent).toContain('Certificados')
  })
})