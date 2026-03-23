import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Wallet } from 'lucide-react'
import NavTab from './NavTab'

const renderComponent = (component: React.ReactElement) => {
  return render(component)
}

describe('NavTab', () => {
  it('renders children content', () => {
    renderComponent(
      <NavTab active={false} onClick={() => {}} icon={<Wallet />}>
        Test Tab
      </NavTab>
    )

    expect(screen.getByText('Test Tab')).toBeInTheDocument()
  })

  it('renders the icon element', () => {
    renderComponent(
      <NavTab active={false} onClick={() => {}} icon={<Wallet data-testid="tab-icon" />}>
        Tab
      </NavTab>
    )

    expect(screen.getByTestId('tab-icon')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    renderComponent(
      <NavTab active={false} onClick={handleClick} icon={<Wallet />}>
        Clickable Tab
      </NavTab>
    )

    fireEvent.click(screen.getByText('Clickable Tab'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies active styling when active prop is true', () => {
    const { container } = renderComponent(
      <NavTab active={true} onClick={() => {}} icon={<Wallet />}>
        Active Tab
      </NavTab>
    )

    const button = container.querySelector('button')
    expect(button?.className).toContain('bg-purple-500')
    expect(button?.className).toContain('text-white')
    expect(button?.className).toContain('shadow-lg')
  })

  it('applies inactive styling when active prop is false', () => {
    const { container } = renderComponent(
      <NavTab active={false} onClick={() => {}} icon={<Wallet />}>
        Inactive Tab
      </NavTab>
    )

    const button = container.querySelector('button')
    expect(button?.className).toContain('text-purple-300')
    expect(button?.className).toContain('hover:bg-purple-500/20')
  })

  it('renders with multiple children', () => {
    renderComponent(
      <NavTab active={false} onClick={() => {}} icon={<Wallet />}>
        Tab Text
        <span className="badge">5</span>
      </NavTab>
    )

    expect(screen.getByText('Tab Text')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('handles click on icon as well', () => {
    const handleClick = vi.fn()
    renderComponent(
      <NavTab active={false} onClick={handleClick} icon={<Wallet data-testid="tab-icon" />}>
        Icon Tab
      </NavTab>
    )

    fireEvent.click(screen.getByTestId('tab-icon'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})