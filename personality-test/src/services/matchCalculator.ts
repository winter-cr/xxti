import { getThemeConfig } from '@/data/themes'
import type {
  DimensionMatchAnalysis,
  MatchResult,
  PersonalityType,
  ThemeId,
} from '@/types'

function findType(themeId: ThemeId, typeId: string): PersonalityType | undefined {
  return getThemeConfig(themeId).types.find((type) => type.id === typeId)
}

function getLabel(score: number): string {
  if (score >= 0.9) return '高度同频'
  if (score >= 0.8) return '配合顺畅'
  if (score >= 0.7) return '互补可磨合'
  return '差异明显'
}

function getMatchDescription(percent: number): string {
  if (percent >= 90) return '这组组合几乎天然同频，节奏和理解方式都很接近。'
  if (percent >= 80) return '这组组合整体兼容度高，容易快速建立稳定协作。'
  if (percent >= 70) return '这组组合既有契合点也有明显差异，适合通过磨合理解彼此。'
  return '这组组合差异较大，适合在清晰边界下建立合作。'
}

function getBinaryDimensionPair(typeId: string, dimensionIndex: number): string {
  return typeId[dimensionIndex] ?? ''
}

function getEnneagramDimensionPair(typeId: string, dimensionKey: string): string {
  return typeId === dimensionKey ? 'AA' : 'BB'
}

export function calculateMatch(
  typeAId: string,
  typeBId: string,
  themeId: ThemeId,
): MatchResult {
  if (typeAId === typeBId) {
    const theme = getThemeConfig(themeId)
    return {
      typeAId,
      typeBId,
      matchPercent: 100,
      description: '同类型匹配默认视为 100%，因为核心节奏与偏好完全一致。',
      dimensionAnalyses: theme.dimensions.map((dimension) => ({
        dimensionId: dimension.id,
        dimensionName: dimension.name,
        poleA: dimension.poleAName,
        poleB: dimension.poleAName,
        score: 1,
        label: '完全一致',
      })),
    }
  }

  const theme = getThemeConfig(themeId)
  const typeA = findType(themeId, typeAId)
  const typeB = findType(themeId, typeBId)
  if (!typeA || !typeB) {
    throw new Error('Type not found for current theme')
  }

  const analyses: DimensionMatchAnalysis[] = theme.dimensions.map((dimension, index) => {
    const pairKey =
      theme.resultMode === 'dominant'
        ? getEnneagramDimensionPair(typeA.id, dimension.poleAKey) === 'AA' &&
          getEnneagramDimensionPair(typeB.id, dimension.poleAKey) === 'AA'
          ? 'AA'
          : getEnneagramDimensionPair(typeA.id, dimension.poleAKey) === 'AA' ||
              getEnneagramDimensionPair(typeB.id, dimension.poleAKey) === 'AA'
            ? 'AB'
            : 'BB'
        : `${getBinaryDimensionPair(typeA.id, index) === dimension.poleAKey ? 'A' : 'B'}${getBinaryDimensionPair(typeB.id, index) === dimension.poleAKey ? 'A' : 'B'}`

    const rule = theme.matchRules?.find((item) => item.dimensionId === dimension.id)
    const score = rule?.polePairs[pairKey] ?? 0.78
    const poleA =
      theme.resultMode === 'dominant'
        ? typeA.id === dimension.poleAKey
          ? dimension.poleAName
          : '非核心'
        : getBinaryDimensionPair(typeA.id, index) === dimension.poleAKey
          ? dimension.poleAName
          : dimension.poleBName
    const poleB =
      theme.resultMode === 'dominant'
        ? typeB.id === dimension.poleAKey
          ? dimension.poleAName
          : '非核心'
        : getBinaryDimensionPair(typeB.id, index) === dimension.poleAKey
          ? dimension.poleAName
          : dimension.poleBName

    return {
      dimensionId: dimension.id,
      dimensionName: dimension.name,
      poleA,
      poleB,
      score,
      label: getLabel(score),
    }
  })

  const average =
    analyses.reduce((sum, item) => sum + item.score, 0) / analyses.length
  const matchPercent = Math.round(average * 100)

  return {
    typeAId,
    typeBId,
    matchPercent,
    description: getMatchDescription(matchPercent),
    dimensionAnalyses: analyses,
  }
}
