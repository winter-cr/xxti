export type PoleId = 'A' | 'B'

export type ThemeId = 'mbti' | 'bigfive' | 'enneagram'

export type ThemeMode = 'light' | 'dark'

export interface Dimension {
  id: string
  name: string
  poleAName: string
  poleBName: string
  poleAKey: string
  poleBKey: string
}

export interface QuestionOption {
  id: string
  text: string
  pole: PoleId
}

export interface Question {
  index: number
  text: string
  dimensionId: string
  optionA: QuestionOption
  optionB: QuestionOption
}

export interface TypeColors {
  primary: string
  secondary: string
  background: string
}

export interface PersonalityType {
  id: string
  name: string
  description: string
  colors?: TypeColors
  traits?: string[]
}

export interface TypeEncyclopedia {
  typeId: string
  typeName: string
  alias: string
  coreTraits: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  bestMatch: string
  colors: TypeColors
  description: string
}

export interface MatchRule {
  dimensionId: string
  polePairs: Record<string, number>
}

export interface DimensionMatchAnalysis {
  dimensionId: string
  dimensionName: string
  poleA: string
  poleB: string
  score: number
  label: string
}

export interface MatchResult {
  typeAId: string
  typeBId: string
  matchPercent: number
  description: string
  dimensionAnalyses: DimensionMatchAnalysis[]
}

export interface DimensionScore {
  dimensionId: string
  dimensionName: string
  poleAName: string
  poleBName: string
  poleAScore: number
  poleBScore: number
  resultPoleKey: string
}

export interface TestResult {
  typeId: string
  typeName: string
  typeDescription: string
  dimensionScores: DimensionScore[]
  colors?: TypeColors
}

export interface QuizProgress {
  currentQuestionIndex: number
  answers: Record<number, string>
  themeId?: ThemeId
}

export interface HistoryRecord {
  id: string
  timestamp: number
  themeId: ThemeId
  themeName: string
  typeId: string
  typeName: string
  typeDescription: string
  dimensionScores: DimensionScore[]
  colors?: TypeColors
}

export interface ThemeMeta {
  id: ThemeId
  name: string
  description: string
  questionCount: number
  estimatedTime: number
  icon: string
}

export interface ThemeConfig {
  meta: ThemeMeta
  dimensions: Dimension[]
  questions: Question[]
  types: PersonalityType[]
  encyclopedia: TypeEncyclopedia[]
  matchRules: MatchRule[]
}
