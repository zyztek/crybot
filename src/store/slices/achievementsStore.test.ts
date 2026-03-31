import { describe, it, expect } from 'vitest';
import { create } from 'zustand';
import {
  createAchievementsStore,
  INITIAL_ACHIEVEMENTS,
  LEADERBOARD,
  type AchievementsState,
} from './achievementsStore';

describe('Achievements Store Slice', () => {
  it('initializes with correct achievements', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    expect(store.getState().achievements).toEqual(INITIAL_ACHIEVEMENTS);
  });

  it('initializes with correct leaderboard', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    expect(store.getState().leaderboard).toEqual(LEADERBOARD);
  });

  it('updateAchievementProgress updates progress for specific id', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    store.getState().updateAchievementProgress(2, 50);
    const achievement = store.getState().achievements.find(a => a.id === 2);
    expect(achievement?.progress).toBe(50);
  });

  it('updateAchievementProgress caps at total', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    store.getState().updateAchievementProgress(2, 150);
    const achievement = store.getState().achievements.find(a => a.id === 2);
    expect(achievement?.progress).toBe(100);
  });

  it('updateAchievementProgress does not affect other achievements', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    store.getState().updateAchievementProgress(2, 50);
    const achievement1 = store.getState().achievements.find(a => a.id === 1);
    expect(achievement1?.progress).toBe(1);
  });

  it('unlockAchievement sets unlocked to true', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    store.getState().unlockAchievement(2);
    const achievement = store.getState().achievements.find(a => a.id === 2);
    expect(achievement?.unlocked).toBe(true);
  });

  it('unlockAchievement does not affect other achievements', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    store.getState().unlockAchievement(2);
    const achievement1 = store.getState().achievements.find(a => a.id === 1);
    expect(achievement1?.unlocked).toBe(true);
  });

  it('updateAchievementProgress and unlockAchievement are functions', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    expect(typeof store.getState().updateAchievementProgress).toBe('function');
    expect(typeof store.getState().unlockAchievement).toBe('function');
  });

  it('progress can be partial (float values)', () => {
    const store = create<AchievementsState>()(createAchievementsStore);
    store.getState().updateAchievementProgress(3, 0.0005);
    const achievement = store.getState().achievements.find(a => a.id === 3);
    expect(achievement?.progress).toBe(0.0005);
  });
});
