import type { TestResult } from '@/types'

export const shareService = {
  generateSummary(result: TestResult): string {
    return `我的人格类型是【${result.typeName}】！${result.typeDescription}`
  },

  async copyResult(result: TestResult): Promise<boolean> {
    const text = this.generateSummary(result)
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  },
}
