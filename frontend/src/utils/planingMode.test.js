import { describe, it, expect } from 'vitest'

// This small suite keeps the mode labels readable and easy to change later.
describe('Planning Mode', () => {
  function getModeDescription(mode) {
    if (mode === 'smart') return 'Batch cooking - reuse ingredients'
    if (mode === 'fresh') return 'Variety - new meals every day'
    return 'Unknown mode'
  }

  it('returns correct description for smart mode', () => {
    expect(getModeDescription('smart')).toBe('Batch cooking - reuse ingredients')
  })

  it('returns correct description for fresh mode', () => {
    expect(getModeDescription('fresh')).toBe('Variety - new meals every day')
  })

  it('returns unknown for invalid mode', () => {
    expect(getModeDescription('unknown')).toBe('Unknown mode')
  })
})
