import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { NFTGallery } from './NFTGallery'

describe('NFTGallery', () => {
  it('renders title', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('NFT Gallery')
  })

  it('renders stats cards', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Volumen Total')
    expect(container.textContent).toContain('Colecciones')
    expect(container.textContent).toContain('Items Listados')
    expect(container.textContent).toContain('Ventas Hoy')
  })

  it('renders top collections table', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Top Colecciones')
    expect(container.textContent).toContain('Bored Ape YC')
    expect(container.textContent).toContain('CryptoPunks')
  })

  it('renders category filters', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Todos')
    expect(container.textContent).toContain('art')
    expect(container.textContent).toContain('gaming')
    expect(container.textContent).toContain('collectibles')
    expect(container.textContent).toContain('metaverse')
    expect(container.textContent).toContain('music')
  })

  it('renders rarity filters', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('common')
    expect(container.textContent).toContain('rare')
    expect(container.textContent).toContain('epic')
    expect(container.textContent).toContain('legendary')
  })

  it('renders sort dropdown', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Precio')
    expect(container.textContent).toContain('Likes')
    expect(container.textContent).toContain('Vistas')
  })

  it('renders NFT items', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Cosmic Ape #1234')
    expect(container.textContent).toContain('Digital Dreams #567')
  })

  it('renders NFT collection names', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Bored Ape YC')
    expect(container.textContent).toContain('Art Blocks')
  })

  it('renders NFT prices', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('ETH')
  })

  it('renders load more button', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Cargar Más NFTs')
  })

  it('renders NFT grid items', () => {
    const { container } = render(<NFTGallery />)
    expect(container.textContent).toContain('Precio')
    expect(container.textContent).toContain('Comprar')
  })
})