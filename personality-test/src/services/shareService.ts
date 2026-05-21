import type { TestResult } from '@/types'

export const shareService = {
  generateSummary(result: TestResult, themeName?: string): string {
    const prefix = themeName ? `【${themeName}】` : ''
    return `${prefix}我的人格类型是【${result.typeName}】！${result.typeDescription}`
  },

  async copyResult(result: TestResult, themeName?: string): Promise<boolean> {
    const text = this.generateSummary(result, themeName)
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  },
}
