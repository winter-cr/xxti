import type { Question } from '@/types'

export const questions: Question[] = [
  { index: 1, text: '你最深层的驱动力是：', dimensionId: 'HR', optionA: { id: '1-A', text: '帮助他人，获得爱与连接', pole: 'A' }, optionB: { id: '1-B', text: '追求成就，证明自身价值', pole: 'B' } },
  { index: 2, text: '面对问题时，你倾向于：', dimensionId: 'IT', optionA: { id: '2-A', text: '理性分析，寻找最优解', pole: 'A' }, optionB: { id: '2-B', text: '凭内心感受，跟随直觉', pole: 'B' } },
  { index: 3, text: '在人际关系中，你最看重：', dimensionId: 'SC', optionA: { id: '3-A', text: '忠诚可靠，稳固的关系', pole: 'A' }, optionB: { id: '3-B', text: '新鲜体验，自由的探索', pole: 'B' } },
  { index: 4, text: '面对冲突和压力：', dimensionId: 'PW', optionA: { id: '4-A', text: '直面挑战，掌控局面', pole: 'A' }, optionB: { id: '4-B', text: '寻求和谐，避免冲突', pole: 'B' } },
  { index: 5, text: '你的自我认知方式：', dimensionId: 'IT', optionA: { id: '5-A', text: '内省反思，追求内在成长', pole: 'A' }, optionB: { id: '5-B', text: '关注外在，在意他人反馈', pole: 'B' } },
  { index: 6, text: '你理想的生活状态：', dimensionId: 'SC', optionA: { id: '6-A', text: '安稳有序，被信任的人环绕', pole: 'A' }, optionB: { id: '6-B', text: '充满变化，探索未知可能', pole: 'B' } },
  { index: 7, text: '你更害怕的是：', dimensionId: 'PW', optionA: { id: '7-A', text: '失去掌控，变得脆弱无力', pole: 'A' }, optionB: { id: '7-B', text: '失去连接，被孤立遗忘', pole: 'B' } },
  { index: 8, text: '你对他人的核心态度：', dimensionId: 'HR', optionA: { id: '8-A', text: '给予关怀，乐于付出', pole: 'A' }, optionB: { id: '8-B', text: '独立自强，率先自立', pole: 'B' } },
]
