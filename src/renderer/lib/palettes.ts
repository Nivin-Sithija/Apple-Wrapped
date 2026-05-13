import type { Palette } from './types'

export const PALETTES: Palette[] = [
  {
    id: 'crimson',
    bg: 'linear-gradient(135deg, #E8132A 0%, #A01020 100%)',
    accent: '#FFD60A',
    text: '#ffffff',
  },
  {
    id: 'gold',
    bg: 'linear-gradient(135deg, #F5C518 0%, #D4A017 100%)',
    accent: '#E8132A',
    text: '#1a1a1a',
  },
  {
    id: 'violet',
    bg: 'linear-gradient(135deg, #6B21A8 0%, #4C1D95 100%)',
    accent: '#F0ABFC',
    text: '#ffffff',
  },
  {
    id: 'midnight',
    bg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    accent: '#38BDF8',
    text: '#ffffff',
  },
  {
    id: 'forest',
    bg: 'linear-gradient(135deg, #14532D 0%, #166534 100%)',
    accent: '#BEF264',
    text: '#ffffff',
  },
  {
    id: 'coral',
    bg: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A5A 100%)',
    accent: '#4ECDC4',
    text: '#ffffff',
  },
  {
    id: 'indigo',
    bg: 'linear-gradient(135deg, #3730A3 0%, #4338CA 100%)',
    accent: '#FDE68A',
    text: '#ffffff',
  },
]

export function getPalette(slideIndex: number): Palette {
  return PALETTES[slideIndex % PALETTES.length]
}
