import type { Question } from '@/types'

export const questions: Question[] = [
  {
    index: 1,
    text: '面对陌生领域时，你更常见的状态是：',
    dimensionId: 'OP',
    optionA: { id: 'bf-1-A', text: '被新奇想法点燃，愿意先探索再判断', pole: 'A' },
    optionB: { id: 'bf-1-B', text: '先看是否实用，再决定要不要投入时间', pole: 'B' },
  },
  {
    index: 2,
    text: '你安排日程时更像：',
    dimensionId: 'CS',
    optionA: { id: 'bf-2-A', text: '提前列清单并主动完成', pole: 'A' },
    optionB: { id: 'bf-2-B', text: '保留弹性，临近时再集中处理', pole: 'B' },
  },
  {
    index: 3,
    text: '聚会结束后，你通常会：',
    dimensionId: 'EI',
    optionA: { id: 'bf-3-A', text: '还想继续和人互动，精力被带动起来', pole: 'A' },
    optionB: { id: 'bf-3-B', text: '需要独处恢复，慢慢整理感受', pole: 'B' },
  },
  {
    index: 4,
    text: '遇到意见冲突时，你更可能：',
    dimensionId: 'AD',
    optionA: { id: 'bf-4-A', text: '先照顾关系，寻找双方都能接受的解法', pole: 'A' },
    optionB: { id: 'bf-4-B', text: '明确表达立场，优先保住原则和边界', pole: 'B' },
  },
  {
    index: 5,
    text: '面对不确定反馈时，你常常：',
    dimensionId: 'NS',
    optionA: { id: 'bf-5-A', text: '会反复琢磨，情绪容易被牵动', pole: 'A' },
    optionB: { id: 'bf-5-B', text: '较快回到平衡，更关注下一步行动', pole: 'B' },
  },
  {
    index: 6,
    text: '阅读一本书或看一部片子时，你更容易被什么吸引：',
    dimensionId: 'OP',
    optionA: { id: 'bf-6-A', text: '隐喻、世界观和各种新视角', pole: 'A' },
    optionB: { id: 'bf-6-B', text: '扎实的信息、逻辑和可落地的经验', pole: 'B' },
  },
  {
    index: 7,
    text: '当任务很多时，你更习惯：',
    dimensionId: 'CS',
    optionA: { id: 'bf-7-A', text: '分优先级推进，保持节奏和追踪', pole: 'A' },
    optionB: { id: 'bf-7-B', text: '根据状态切换，灵感来了再集中攻克', pole: 'B' },
  },
  {
    index: 8,
    text: '在团队讨论中，你更常见的表现是：',
    dimensionId: 'EI',
    optionA: { id: 'bf-8-A', text: '愿意先开口，把想法说出来再迭代', pole: 'A' },
    optionB: { id: 'bf-8-B', text: '先听完整体脉络，再给出成熟意见', pole: 'B' },
  },
  {
    index: 9,
    text: '朋友向你求助时，你通常会：',
    dimensionId: 'AD',
    optionA: { id: 'bf-9-A', text: '优先安抚感受，让对方先被理解', pole: 'A' },
    optionB: { id: 'bf-9-B', text: '直接指出关键问题，帮助对方做决定', pole: 'B' },
  },
  {
    index: 10,
    text: '计划被突然打乱时，你更多会：',
    dimensionId: 'NS',
    optionA: { id: 'bf-10-A', text: '心里起伏明显，需要一点时间缓冲', pole: 'A' },
    optionB: { id: 'bf-10-B', text: '先稳住局面，再重新安排节奏', pole: 'B' },
  },
]
