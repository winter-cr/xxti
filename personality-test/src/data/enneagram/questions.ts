import type { Question } from '@/types'

export const questions: Question[] = [
  { index: 1, text: '当你看到流程不规范时，更容易：', dimensionId: '1', optionA: { id: 'en-1-A', text: '想马上纠正，让事情回到正确轨道', pole: 'A' }, optionB: { id: 'en-1-B', text: '觉得差不多就好，不必太较真', pole: 'B' } },
  { index: 2, text: '在集体里，你更习惯：', dimensionId: '1', optionA: { id: 'en-2-A', text: '为标准和品质负责，避免出错', pole: 'A' }, optionB: { id: 'en-2-B', text: '根据情境灵活处理，不想太受约束', pole: 'B' } },
  { index: 3, text: '朋友低落时，你通常会：', dimensionId: '2', optionA: { id: 'en-3-A', text: '主动靠近，先照顾对方的需要', pole: 'A' }, optionB: { id: 'en-3-B', text: '尊重距离，等对方明确需要再帮忙', pole: 'B' } },
  { index: 4, text: '在关系里，你更在意：', dimensionId: '2', optionA: { id: 'en-4-A', text: '自己是不是对别人有用、被需要', pole: 'A' }, optionB: { id: 'en-4-B', text: '关系是否轻松，不想承担太多期待', pole: 'B' } },
  { index: 5, text: '面对目标时，你更像：', dimensionId: '3', optionA: { id: 'en-5-A', text: '会自然进入冲刺状态，想把结果做出来', pole: 'A' }, optionB: { id: 'en-5-B', text: '更在意过程感受，不急着证明什么', pole: 'B' } },
  { index: 6, text: '别人评价你时，你会特别关注：', dimensionId: '3', optionA: { id: 'en-6-A', text: '是否认可你的能力和成果', pole: 'A' }, optionB: { id: 'en-6-B', text: '是否真的理解你的内在状态', pole: 'B' } },
  { index: 7, text: '当情绪被触动时，你更容易：', dimensionId: '4', optionA: { id: 'en-7-A', text: '深入体验，并想把它表达出来', pole: 'A' }, optionB: { id: 'en-7-B', text: '尽量抽离，先把事情处理完', pole: 'B' } },
  { index: 8, text: '你在群体中更在意：', dimensionId: '4', optionA: { id: 'en-8-A', text: '自己是否保有独特性和真实感', pole: 'A' }, optionB: { id: 'en-8-B', text: '自己是否足够适配和高效', pole: 'B' } },
  { index: 9, text: '面对复杂问题时，你更倾向于：', dimensionId: '5', optionA: { id: 'en-9-A', text: '先收集信息，搞懂原理后再行动', pole: 'A' }, optionB: { id: 'en-9-B', text: '边做边看，先进入现场再调整', pole: 'B' } },
  { index: 10, text: '你的精力管理更像：', dimensionId: '5', optionA: { id: 'en-10-A', text: '会主动节省能量，保留独立思考空间', pole: 'A' }, optionB: { id: 'en-10-B', text: '愿意把精力放进互动和推动里', pole: 'B' } },
  { index: 11, text: '进入陌生环境时，你更容易：', dimensionId: '6', optionA: { id: 'en-11-A', text: '先观察风险和规则，再决定怎么参与', pole: 'A' }, optionB: { id: 'en-11-B', text: '先投入体验，相信过程里能解决问题', pole: 'B' } },
  { index: 12, text: '做决定前，你通常会：', dimensionId: '6', optionA: { id: 'en-12-A', text: '多做几轮验证，确认没有明显漏洞', pole: 'A' }, optionB: { id: 'en-12-B', text: '抓住感觉，快速拍板再微调', pole: 'B' } },
  { index: 13, text: '你最难抗拒的是：', dimensionId: '7', optionA: { id: 'en-13-A', text: '有趣的新计划和新体验', pole: 'A' }, optionB: { id: 'en-13-B', text: '稳定、安全、可预期的节奏', pole: 'B' } },
  { index: 14, text: '情绪低迷时，你更可能：', dimensionId: '7', optionA: { id: 'en-14-A', text: '赶紧找让自己兴奋起来的新出口', pole: 'A' }, optionB: { id: 'en-14-B', text: '停下来消化，不急着转移注意力', pole: 'B' } },
  { index: 15, text: '当你觉得边界被侵犯时，你通常会：', dimensionId: '8', optionA: { id: 'en-15-A', text: '直接表达立场，立刻把边界拉回来', pole: 'A' }, optionB: { id: 'en-15-B', text: '先缓一下，看看是否真的需要正面处理', pole: 'B' } },
  { index: 16, text: '在团队里，你更常承担：', dimensionId: '8', optionA: { id: 'en-16-A', text: '顶在前面、拍板、保护整体利益', pole: 'A' }, optionB: { id: 'en-16-B', text: '协调不同声音，让局面先稳住', pole: 'B' } },
  { index: 17, text: '面对冲突时，你会更自然地：', dimensionId: '9', optionA: { id: 'en-17-A', text: '先降温，找到大家都能接受的平衡点', pole: 'A' }, optionB: { id: 'en-17-B', text: '把问题摊开说清，尽快定输赢', pole: 'B' } },
  { index: 18, text: '当身边人意见分散时，你更倾向于：', dimensionId: '9', optionA: { id: 'en-18-A', text: '把不同人拉回同一节奏，避免撕裂', pole: 'A' }, optionB: { id: 'en-18-B', text: '优先守住自己的判断和推进方向', pole: 'B' } },
]
