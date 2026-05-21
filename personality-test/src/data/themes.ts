import type { ThemeConfig, ThemeId, ThemeMeta } from '@/types'
import { dimensions as mbtiDimensions } from './mbti/dimensions'
import { questions as mbtiQuestions } from './mbti/questions'
import { personalityTypes as mbtiTypes, encyclopedia as mbtiEncyclopedia } from './mbti/types'
import { matchRules as mbtiMatchRules } from './mbti/matchRules'
import { dimensions as bigFiveDimensions } from './bigfive/dimensions'
import { questions as bigFiveQuestions } from './bigfive/questions'
import { personalityTypes as bigFiveTypes, encyclopedia as bigFiveEncyclopedia } from './bigfive/types'
import { matchRules as bigFiveMatchRules } from './bigfive/matchRules'
import { dimensions as enneagramDimensions } from './enneagram/dimensions'
import { questions as enneagramQuestions } from './enneagram/questions'
import { personalityTypes as enneagramTypes, encyclopedia as enneagramEncyclopedia } from './enneagram/types'
import { matchRules as enneagramMatchRules } from './enneagram/matchRules'

const registry: Record<ThemeId, ThemeConfig> = {
  mbti: {
    meta: {
      id: 'mbti',
      name: 'MBTI',
      description: '从能量、认知、决策和生活节奏四个维度观察你的偏好。',
      questionCount: mbtiQuestions.length,
      estimatedTime: 3,
      icon: 'MB',
    },
    resultMode: 'binary',
    dimensions: mbtiDimensions,
    questions: mbtiQuestions,
    types: mbtiTypes,
    encyclopedia: mbtiEncyclopedia,
    matchRules: mbtiMatchRules,
  },
  bigfive: {
    meta: {
      id: 'bigfive',
      name: '大五人格',
      description: '从开放、尽责、外向、亲和、稳定五项长期特质查看你的风格。',
      questionCount: bigFiveQuestions.length,
      estimatedTime: 3,
      icon: 'BF',
    },
    resultMode: 'binary',
    dimensions: bigFiveDimensions,
    questions: bigFiveQuestions,
    types: bigFiveTypes,
    encyclopedia: bigFiveEncyclopedia,
    matchRules: bigFiveMatchRules,
  },
  enneagram: {
    meta: {
      id: 'enneagram',
      name: '九型人格',
      description: '根据核心驱动力与应对模式，识别你更常使用的人格策略。',
      questionCount: enneagramQuestions.length,
      estimatedTime: 4,
      icon: 'EN',
    },
    resultMode: 'dominant',
    dimensions: enneagramDimensions,
    questions: enneagramQuestions,
    types: enneagramTypes,
    encyclopedia: enneagramEncyclopedia,
    matchRules: enneagramMatchRules,
  },
}

export function getAllThemes(): ThemeMeta[] {
  return Object.values(registry).map((theme) => theme.meta)
}

export function getThemeConfig(id: ThemeId): ThemeConfig {
  return registry[id]
}

export function isThemeId(value: string): value is ThemeId {
  return value === 'mbti' || value === 'bigfive' || value === 'enneagram'
}
