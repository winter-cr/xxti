export type PoleId = 'A' | 'B'

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

export interface PersonalityType {
  id: string
  name: string
  description: string
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
}

export interface QuizProgress {
  currentQuestionIndex: number
  answers: Record<number, string>
}
