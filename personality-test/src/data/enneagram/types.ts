import type { PersonalityType, TypeEncyclopedia } from '@/types'

interface EnneagramSeed {
  id: string
  name: string
  alias: string
  description: string
  traits: string[]
  colors: {
    primary: string
    secondary: string
    background: string
  }
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  bestMatch: string
}

const seeds: EnneagramSeed[] = [
  { id: '1', name: '改革者', alias: 'Reformer', description: '重视原则、质量和秩序，希望事情更正确、更完善。', traits: ['原则', '改进', '克制', '标准'], colors: { primary: '#0f766e', secondary: '#99f6e4', background: '#f0fdfa' }, strengths: ['能守住标准', '责任感强', '愿意主动修正问题'], weaknesses: ['容易苛责自己和他人', '压力下紧绷', '不易放松'], careers: ['质量管理', '审计监督', '流程优化'], bestMatch: '7' },
  { id: '2', name: '助人者', alias: 'Helper', description: '敏锐感知他人需要，愿意通过照顾与支持建立连接。', traits: ['关怀', '热心', '连接', '付出'], colors: { primary: '#db2777', secondary: '#f9a8d4', background: '#fdf2f8' }, strengths: ['照顾感强', '关系经营细腻', '愿意主动补位'], weaknesses: ['边界感偏弱', '容易压抑自己', '在意被需要'], careers: ['客户成功', '教育支持', '社群服务'], bestMatch: '8' },
  { id: '3', name: '成就者', alias: 'Achiever', description: '擅长聚焦成果和效率，喜欢通过表现验证自身价值。', traits: ['成就', '效率', '目标', '适应'], colors: { primary: '#2563eb', secondary: '#93c5fd', background: '#eff6ff' }, strengths: ['目标推进能力强', '执行效率高', '擅长场景切换'], weaknesses: ['容易忽略真实感受', '过度结果导向', '停不下来'], careers: ['商业运营', '项目管理', '市场拓展'], bestMatch: '9' },
  { id: '4', name: '艺术家', alias: 'Individualist', description: '看重真实和独特表达，情绪体验深，审美与意义感强。', traits: ['独特', '情绪', '表达', '审美'], colors: { primary: '#7c3aed', secondary: '#c4b5fd', background: '#faf5ff' }, strengths: ['表达能力细腻', '能捕捉情绪层次', '富于审美判断'], weaknesses: ['容易陷入情绪波动', '过度比较', '不喜欢被粗暴定义'], careers: ['品牌创意', '视觉内容', '艺术策划'], bestMatch: '1' },
  { id: '5', name: '观察者', alias: 'Investigator', description: '依赖理解和独立判断来建立安全感，重视知识边界和思考空间。', traits: ['分析', '独立', '知识', '节制'], colors: { primary: '#4338ca', secondary: '#a5b4fc', background: '#eef2ff' }, strengths: ['学习快', '分析深', '面对复杂系统耐心足'], weaknesses: ['容易抽离关系', '精力保守', '行动启动慢'], careers: ['研究分析', '数据策略', '系统设计'], bestMatch: '2' },
  { id: '6', name: '忠诚者', alias: 'Loyalist', description: '擅长预判风险与不确定性，希望通过准备和验证建立可靠感。', traits: ['谨慎', '可靠', '预判', '责任'], colors: { primary: '#475569', secondary: '#cbd5e1', background: '#f8fafc' }, strengths: ['风险意识强', '能守住底线', '团队协作稳'], weaknesses: ['容易焦虑', '反复验证消耗大', '决策迟疑'], careers: ['风控合规', '项目保障', '安全运营'], bestMatch: '3' },
  { id: '7', name: '享乐者', alias: 'Enthusiast', description: '热爱体验与自由，善于打开局面，让环境充满可能性。', traits: ['乐观', '体验', '跳脱', '轻盈'], colors: { primary: '#ea580c', secondary: '#fdba74', background: '#fff7ed' }, strengths: ['创意充足', '带动氛围快', '面对变化很有弹性'], weaknesses: ['容易分散', '回避沉重问题', '不爱被束缚'], careers: ['内容策划', '活动创意', '创新业务'], bestMatch: '1' },
  { id: '8', name: '保护者', alias: 'Challenger', description: '重视力量、边界与掌控感，倾向直接处理问题并保护自己人。', traits: ['力量', '边界', '直接', '担当'], colors: { primary: '#b91c1c', secondary: '#fca5a5', background: '#fef2f2' }, strengths: ['敢拍板', '抗压强', '能扛事也能护人'], weaknesses: ['表达过硬', '不易示弱', '冲突感较强'], careers: ['团队管理', '商务谈判', '应急决策'], bestMatch: '2' },
  { id: '9', name: '调停者', alias: 'Peacemaker', description: '追求和谐与稳定，擅长让不同意见重新回到可协商状态。', traits: ['平和', '包容', '整合', '稳定'], colors: { primary: '#059669', secondary: '#6ee7b7', background: '#ecfdf5' }, strengths: ['协调感好', '让团队降温', '能看见多方需要'], weaknesses: ['容易压住自己', '决断慢', '回避正面冲突'], careers: ['组织协调', '客户关系', '内部支持'], bestMatch: '3' },
]

export const personalityTypes: PersonalityType[] = seeds.map((seed) => ({
  id: seed.id,
  name: seed.name,
  description: seed.description,
  traits: seed.traits,
  colors: seed.colors,
}))

export const encyclopedia: TypeEncyclopedia[] = seeds.map((seed) => ({
  typeId: seed.id,
  typeName: seed.name,
  alias: seed.alias,
  coreTraits: seed.traits,
  strengths: seed.strengths,
  weaknesses: seed.weaknesses,
  careers: seed.careers,
  bestMatch: seed.bestMatch,
  colors: seed.colors,
  traits: seed.traits,
}))
