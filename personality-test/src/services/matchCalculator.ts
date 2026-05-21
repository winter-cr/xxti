import type { ThemeId, MatchResult, DimensionMatchAnalysis } from '@/types'
import { getThemeConfig } from '@/data/themes'

function getMatchLabel(score: number): string {
  if (score >= 80) return '高度契合'
  if (score >= 60) return '互补成长'
  if (score >= 40) return '各有不同'
  return '差异较大'
}

function getMatchDescription(percent: number): string {
  if (percent >= 80) return '你们是天生的一对！在多数维度上高度契合，相处自然融洽。'
  if (percent >= 60) return '你们有良好的互补空间，差异之处正是共同成长的机会。'
  if (percent >= 40) return '你们有不少不同之处，但差异也能带来新鲜的视角和体验。'
  return '你们在很多方面存在显著差异，需要更多理解与包容。'
}

export function calculateMatch(typeAId: string, typeBId: string, themeId: ThemeId): MatchResult {
  const config = getThemeConfig(themeId)
  const dims = config.dimensions
  const rules = config.matchRules

  if (typeAId === typeBId) {
    return {
      typeAId, typeBId, matchPercent: 100,
      description: '完美匹配！自己永远是最了解自己的人。',
      dimensionAnalyses: dims.map((d) => ({
        dimensionId: d.id, dimensionName: d.name,
        poleA: d.poleAName, poleB: d.poleAName, score: 100, label: '完全一致',
      })),
    }
  }

  const dimensionAnalyses: DimensionMatchAnalysis[] = []
  let totalScore = 0

  for (const dim of dims) {
    const dimIdx = dims.indexOf(dim)
    const keyA = typeAId[dimIdx] || 'A'
    const keyB = typeBId[dimIdx] || 'A'
    const rule = rules.find((r) => r.dimensionId === dim.id)
    const pairKey = `${keyA}${keyB}`
    const score = rule?.polePairs[pairKey] ?? 50
    totalScore += score

    const isA = keyA === dim.poleAKey?.charAt(0) || keyA === dim.poleAKey
    dimensionAnalyses.push({
      dimensionId: dim.id,
      dimensionName: dim.name,
      poleA: isA ? dim.poleAName : dim.poleBName,
      poleB: (keyB === dim.poleAKey?.charAt(0) || keyB === dim.poleAKey) ? dim.poleAName : dim.poleBName,
      score,
      label: getMatchLabel(score),
    })
  }

  const matchPercent = Math.round(totalScore / dims.length)
  return { typeAId, typeBId, matchPercent, description: getMatchDescription(matchPercent), dimensionAnalyses }
}
