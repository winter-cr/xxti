import type { MatchRule } from '@/types'

export const matchRules: MatchRule[] = [
  { dimensionId: 'EI', polePairs: { AA: 0.9, AB: 0.72, BA: 0.72, BB: 0.88 } },
  { dimensionId: 'NS', polePairs: { AA: 0.92, AB: 0.64, BA: 0.64, BB: 0.84 } },
  { dimensionId: 'TF', polePairs: { AA: 0.78, AB: 0.86, BA: 0.86, BB: 0.8 } },
  { dimensionId: 'JP', polePairs: { AA: 0.82, AB: 0.75, BA: 0.75, BB: 0.84 } },
]
