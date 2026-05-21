import type { MatchRule } from '@/types'

export const matchRules: MatchRule[] = [
  { dimensionId: 'EI', polePairs: { 'AA': 80, 'AB': 40, 'BA': 40, 'BB': 80 } },
  { dimensionId: 'NS', polePairs: { 'AA': 75, 'AB': 50, 'BA': 50, 'BB': 75 } },
  { dimensionId: 'TF', polePairs: { 'AA': 65, 'AB': 85, 'BA': 85, 'BB': 65 } },
  { dimensionId: 'JP', polePairs: { 'AA': 60, 'AB': 90, 'BA': 90, 'BB': 60 } },
]
