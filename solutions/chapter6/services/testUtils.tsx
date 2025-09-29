import React from 'react'
import { render } from '@testing-library/react-native'

// Test utilities for Chapter 6
export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui)
}

export const createMockGame = (overrides = {}) => ({
  id: 1,
  name: 'Test Game',
  ...overrides,
})

export const createMockState = (overrides = {}) => ({
  games: [],
  theme: 'light' as const,
  accessibilityEnabled: true,
  testMode: false,
  ...overrides,
})
