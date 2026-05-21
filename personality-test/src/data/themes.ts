import type { ThemeId, ThemeMeta, ThemeConfig } from '@/types'
import { dimensions as mbtiDims } from './mbti/dimensions'
import { questions as mbtiQs } from './mbti/questions'
import { types as mbtiTypes, encyclopedia as mbtiEnc } from './mbti/types'
import { matchRules as mbtiRules } from './mbti/matchRules'
import { dimensions as bfDims } from './bigfive/dimensions'
import { questions as bfQs } from './bigfive/questions'
import { types as bfTypes, encyclopedia as bfEnc, matchRules as bfRules } from './bigfive/types'
import { dimensions as enDims } from './enneagram/dimensions'
import { questions as enQs } from './enneagram/questions'
import { types as enTypes, encyclopedia as enEnc, matchRules as enRules } from './enneagram/types'

const themeConfigs: Record<ThemeId, ThemeConfig> = {
  mbti: {
    meta: { id: 'mbti', name: 'MBTI 人格', description: '探索你的能量方向、认知方式、决策风格与生活态度', questionCount: mbtiQs.length, estimatedTime: Math.ceil((mbtiQs.length * 15) / 60), icon: '🧠' },
    dimensions: mbtiDims,
    questions: mbtiQs,
    types: mbtiTypes,
    encyclopedia: mbtiEnc,
    matchRules: mbtiRules,
  },
  bigfive: {
    meta: { id: 'bigfive', name: '大五人格', description: '从开放性、尽责性、外向性、宜人性、情绪性五大维度解析', questionCount: bfQs.length, estimatedTime: Math.ceil((bfQs.length * 15) / 60), icon: '⭐' },
    dimensions: bfDims,
    questions: bfQs,
    types: bfTypes,
    encyclopedia: bfEnc,
    matchRules: bfRules,
  },
  enneagram: {
    meta: { id: 'enneagram', name: '九型人格', description: '发现你最深层的驱动力、认知模式与力量表达方式', questionCount: enQs.length, estimatedTime: Math.ceil((enQs.length * 15) / 60), icon: '🔮' },
    dimensions: enDims,
    questions: enQs,
    types: enTypes,
    encyclopedia: enEnc,
    matchRules: enRules,
  },
}

export function getAllThemes(): ThemeMeta[] {
  return Object.values(themeConfigs).map((c) => c.meta)
}

export function getThemeConfig(id: ThemeId): ThemeConfig {
  return themeConfigs[id]
}
