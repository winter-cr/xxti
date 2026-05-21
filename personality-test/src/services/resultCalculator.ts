import type {
  Dimension,
  DimensionScore,
  PersonalityType,
  Question,
  TestResult,
  ThemeConfig,
} from '@/types'

function calculateScores(
  answers: Map<number, string>,
  dims: Dimension[],
  qs: Question[],
): DimensionScore[] {
  const dimensionScores: DimensionScore[] = []

  for (const dim of dims) {
    const relatedQuestions = qs.filter((q) => q.dimensionId === dim.id)
    let poleAScore = 0
    let poleBScore = 0

    for (const q of relatedQuestions) {
      const selectedId = answers.get(q.index)
      if (!selectedId) continue
      if (selectedId === q.optionA.id) {
        poleAScore += 1
      } else {
        poleBScore += 1
      }
    }

    const resultPoleKey =
      poleAScore >= poleBScore ? dim.poleAKey : dim.poleBKey

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

  return dimensionScores
}

function getTypeByBinaryMode(
  scores: DimensionScore[],
  types: PersonalityType[],
): PersonalityType | undefined {
  const typeId = scores.map((score) => score.resultPoleKey).join('')
  return types.find((type) => type.id === typeId)
}

function getTypeByDominantMode(
  scores: DimensionScore[],
  types: PersonalityType[],
): PersonalityType | undefined {
  const topScore = [...scores].sort((a, b) => {
    const delta = b.poleAScore - a.poleAScore
    if (delta !== 0) return delta
    return a.dimensionId.localeCompare(b.dimensionId)
  })[0]

  return types.find((type) => type.id === topScore.resultPoleKey)
}

export function calculate(
  answers: Map<number, string>,
  theme: ThemeConfig,
): TestResult {
  const dimensionScores = calculateScores(
    answers,
    theme.dimensions,
    theme.questions,
  )

  const typeInfo =
    theme.resultMode === 'dominant'
      ? getTypeByDominantMode(dimensionScores, theme.types)
      : getTypeByBinaryMode(dimensionScores, theme.types)

  return {
    themeId: theme.meta.id,
    themeName: theme.meta.name,
    typeId: typeInfo?.id ?? 'UNKNOWN',
    typeName: typeInfo?.name ?? '未知类型',
    typeDescription: typeInfo?.description ?? '',
    colors: typeInfo?.colors ?? {
      primary: '#2563eb',
      secondary: '#bfdbfe',
      background: '#eff6ff',
    },
    dimensionScores,
  }
}
