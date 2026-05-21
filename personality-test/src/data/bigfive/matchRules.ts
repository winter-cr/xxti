import type { MatchRule } from '@/types'

export const matchRules: MatchRule[] = [
  { dimensionId: 'OP', polePairs: { AA: 0.86, AB: 0.74, BA: 0.74, BB: 0.82 } },
  { dimensionId: 'CS', polePairs: { AA: 0.88, AB: 0.68, BA: 0.68, BB: 0.76 } },
  { dimensionId: 'EI', polePairs: { AA: 0.8, AB: 0.79, BA: 0.79, BB: 0.82 } },
  { dimensionId: 'AD', polePairs: { AA: 0.84, AB: 0.77, BA: 0.77, BB: 0.81 } },
  { dimensionId: 'NS', polePairs: { AA: 0.74, AB: 0.88, BA: 0.88, BB: 0.86 } },
]
