import type { Question } from '@/types'

export const questions: Question[] = [
  { index: 1, text: '你对新奇的体验和想法：', dimensionId: 'OE', optionA: { id: '1-A', text: '充满好奇，主动尝试', pole: 'A' }, optionB: { id: '1-B', text: '习惯熟悉，谨慎对待', pole: 'B' } },
  { index: 2, text: '面对工作或学习任务：', dimensionId: 'CO', optionA: { id: '2-A', text: '提前规划，认真完成', pole: 'A' }, optionB: { id: '2-B', text: '随性而为，灵活处理', pole: 'B' } },
  { index: 3, text: '在社交场合中：', dimensionId: 'EX', optionA: { id: '3-A', text: '活跃健谈，享受社交', pole: 'A' }, optionB: { id: '3-B', text: '安静低调，偏好独处', pole: 'B' } },
  { index: 4, text: '与他人意见不同时：', dimensionId: 'AG', optionA: { id: '4-A', text: '体谅对方，寻求共识', pole: 'A' }, optionB: { id: '4-B', text: '坚持己见，直言不讳', pole: 'B' } },
  { index: 5, text: '面对压力和挫折：', dimensionId: 'NE', optionA: { id: '5-A', text: '保持冷静，从容应对', pole: 'A' }, optionB: { id: '5-B', text: '情绪波动，容易焦虑', pole: 'B' } },
  { index: 6, text: '对于艺术和文化活动：', dimensionId: 'OE', optionA: { id: '6-A', text: '兴趣浓厚，乐于探索', pole: 'A' }, optionB: { id: '6-B', text: '兴趣一般，偏好实用', pole: 'B' } },
  { index: 7, text: '对待承诺和责任：', dimensionId: 'CO', optionA: { id: '7-A', text: '言出必行，恪守承诺', pole: 'A' }, optionB: { id: '7-B', text: '视情况定，灵活调整', pole: 'B' } },
  { index: 8, text: '团队合作中：', dimensionId: 'AG', optionA: { id: '8-A', text: '乐于配合，信任他人', pole: 'A' }, optionB: { id: '8-B', text: '独立思考，质疑权威', pole: 'B' } },
  { index: 9, text: '你的情绪状态通常：', dimensionId: 'NE', optionA: { id: '9-A', text: '平和稳定，不易波动', pole: 'A' }, optionB: { id: '9-B', text: '敏感多思，起伏较大', pole: 'B' } },
  { index: 10, text: '在人群中你更倾向：', dimensionId: 'EX', optionA: { id: '10-A', text: '成为焦点，带动气氛', pole: 'A' }, optionB: { id: '10-B', text: '安静观察，融入背景', pole: 'B' } },
]
