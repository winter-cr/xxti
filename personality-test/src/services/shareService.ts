import type { TestResult } from '@/types'

export const shareService = {
  generateSummary(result: TestResult): string {
    return `我在 ${result.themeName} 测试中的结果是【${result.typeName} ${result.typeId}】。${result.typeDescription}`
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
