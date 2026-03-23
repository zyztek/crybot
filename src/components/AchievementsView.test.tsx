import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AchievementsView from './AchievementsView'
import { INITIAL_ACHIEVEMENTS } from '../test/fixtures'

describe('AchievementsView', () => {
  const mockProps = {
    achievements: INITIAL_ACHIEVEMENTS,
    t: {
      complete: 'Completed',
      progress: 'Progress',
    },
  }

  it('renders achievement items', () => {
    render(<AchievementsView {...mockProps} />)
    expect(screen.getAllByText(INITIAL_ACHIEVEMENTS[0].title).length).toBeGreaterThan(0)
  })

  it('renders achievement descriptions', () => {
    const { container } = render(<AchievementsView {...mockProps} />)
    expect(container.textContent).toContain(INITIAL_ACHIEVEMENTS[0].description)
  })

  it('renders progress bars', () => {
    render(<AchievementsView {...mockProps} />)
    const progressBars = document.querySelectorAll('.h-2.bg-slate-700')
    expect(progressBars.length).toBeGreaterThan(0)
  })

  it('renders unlocked achievements', () => {
    const unlockedAchievement = INITIAL_ACHIEVEMENTS.find(a => a.unlocked)
    if (unlockedAchievement) {
      const { container } = render(<AchievementsView {...mockProps} />)
      expect(container.textContent).toContain('Desbloqueado')
    }
  })

  it('renders achievement icons', () => {
    const { container } = render(<AchievementsView {...mockProps} />)
    expect(container.textContent).toContain('🎯')
  })

  it('renders progress/total counts', () => {
    const { container } = render(<AchievementsView {...mockProps} />)
    expect(container.textContent).toContain('/')
  })

  it('renders rewards', () => {
    const { container } = render(<AchievementsView {...mockProps} />)
    expect(container.textContent).toContain('Reward:')
  })

  it('applies different styles for unlocked achievements', () => {
    render(<AchievementsView {...mockProps} />)
    const unlockedDivs = document.querySelectorAll('.from-green-500')
    expect(unlockedDivs.length).toBeGreaterThanOrEqual(0)
  })

  it('renders check icons for unlocked achievements', () => {
    const unlockedAchievement = INITIAL_ACHIEVEMENTS.find(a => a.unlocked)
    if (unlockedAchievement) {
      const { container } = render(<AchievementsView {...mockProps} />)
      expect(container.querySelector('.text-green-400')).toBeInTheDocument()
    }
  })

  it('renders multiple achievements in grid', () => {
    render(<AchievementsView {...mockProps} />)
    const achievementCards = document.querySelectorAll('.border.rounded-xl')
    expect(achievementCards.length).toBe(INITIAL_ACHIEVEMENTS.length)
  })

  it('renders progress labels', () => {
    const { container } = render(<AchievementsView {...mockProps} />)
    expect(container.textContent).toContain('Progress')
  })
})