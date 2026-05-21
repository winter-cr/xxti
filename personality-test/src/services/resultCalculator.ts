import type { Dimension, Question, PersonalityType, TestResult, DimensionScore } from '@/types'

export function calculate(
  answers: Map<number, string>,
  dims: Dimension[],
  qs: Question[],
  types: PersonalityType[],
): TestResult {
  const dimensionScores: DimensionScore[] = []

  for (const dim of dims) {
    const relatedQuestions = qs.filter((q) => q.dimensionId === dim.id)
    let poleAScore = 0
    let poleBScore = 0

    for (const q of relatedQuestions) {
      const selectedId = answers.get(q.index)
      if (!selectedId) continue
      if (selectedId === q.optionA.id) {
        poleAScore++
      } else {
        poleBScore++
      }
    }

    let resultPoleKey: string
    if (poleAScore > poleBScore) {
      resultPoleKey = dim.poleAKey
    } else if (poleAScore < poleBScore) {
      resultPoleKey = dim.poleBKey
    } else {
      resultPoleKey = dim.poleAKey
    }

    dimensionScores.push({
      dimensionId: dim.id,
      dimensionName: dim.name,
      poleAName: dim.poleAName,
      poleBName: dim.poleBName,
      poleAScore,
      poleBScore,
      resultPoleKey,
    })
  }

  const typeId = dimensionScores.map((ds) => ds.resultPoleKey).join('')
  const typeInfo = types.find((t) => t.id === typeId)

  return {
    typeId,
    typeName: typeInfo?.name ?? '未知类型',
    typeDescription: typeInfo?.description ?? '',
    dimensionScores,
  }
}
