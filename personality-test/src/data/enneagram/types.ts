import type { PersonalityType, TypeEncyclopedia, MatchRule } from '@/types'

const c = (p: string, s: string, b: string) => ({ primary: p, secondary: s, background: b })

export const types: PersonalityType[] = [
  { id: 'HTLP', name: '助人成就者', description: '以助人为核心驱动的掌控者，理性思考中追求忠诚关系。你是坚定守护他人利益的行动派。', colors: c('#E74C3C', '#F5B7B1', '#FDEDEC'), traits: ['助人', '掌控', '理性', '忠诚'] },
  { id: 'HTLE', name: '关怀探索者', description: '助人导向的理性探索者，在自由中寻找人生意义。你是用智慧温暖他人的旅者。', colors: c('#F39C12', '#FAD7A0', '#FEF5E7'), traits: ['助人', '探索', '理性', '自由'] },
  { id: 'HTWP', name: '和谐守护者', description: '助人型和平主义者，感受力强且重视忠诚。你是温柔体贴、默默守护身边人的天使。', colors: c('#1ABC9C', '#A3E4D7', '#E8F8F5'), traits: ['助人', '和平', '感受', '忠诚'] },
  { id: 'HTWE', name: '感性旅者', description: '助人型的感性探索者，在和平中追寻自由体验。你是善解人意、热爱生命的灵魂旅者。', colors: c('#E91E63', '#F48FB1', '#FCE4EC'), traits: ['助人', '和平', '感受', '自由'] },
  { id: 'ATLP', name: '理性统帅', description: '成就驱动的理性掌控者，重视忠诚与秩序。你是目标明确、意志坚定的天生领导者。', colors: c('#2C3E50', '#5D6D7E', '#EAECEE'), traits: ['成就', '掌控', '理性', '忠诚'] },
  { id: 'ATLE', name: '远见开拓者', description: '成就驱动的理性探索者，不断开拓新领域。你是视野开阔、敢于突破的先驱者。', colors: c('#7D3C98', '#C39BD3', '#F4ECF7'), traits: ['成就', '探索', '理性', '开拓'] },
  { id: 'ATWP', name: '稳健实干家', description: '成就驱动的感性掌控者，在和谐中追求目标。你是踏实可靠、温暖有力的执行者。', colors: c('#4CAF50', '#A5D6A7', '#E8F5E9'), traits: ['成就', '和平', '感受', '稳健'] },
  { id: 'ATWE', name: '自由创造者', description: '成就驱动的感性探索者，在自由中创造价值。你是充满激情、追求精彩的冒险家。', colors: c('#FF9800', '#FFCC80', '#FFF3E0'), traits: ['成就', '和平', '感受', '自由'] },
  { id: 'AFLP', name: '思考守护者', description: '以感受为导向的理性忠诚者，在掌控中守护。你是深沉内敛、逻辑清晰的守护者。', colors: c('#37474F', '#90A4AE', '#ECEFF1'), traits: ['感受', '掌控', '理性', '忠诚'] },
  { id: 'AFLE', name: '灵感捕手', description: '感性思考者与自由探索者，在感受中寻找创新灵感。你是敏感细腻、创意无限的梦想家。', colors: c('#0097A7', '#80DEEA', '#E0F7FA'), traits: ['感受', '探索', '理性', '灵感'] },
  { id: 'AFWP', name: '温柔守望者', description: '感性的和平主义者，忠于关系且重视和谐。你是安静温暖、包容一切的避风港。', colors: c('#5C6BC0', '#9FA8DA', '#E8EAF6'), traits: ['感受', '和平', '忠诚', '温柔'] },
  { id: 'AFWE', name: '浪漫冒险者', description: '感性的自由灵魂，在和平中追寻浪漫体验。你是用情感丈量世界、热爱美好的诗人。', colors: c('#795548', '#BCAAA4', '#EFEBE9'), traits: ['感受', '和平', '自由', '浪漫'] },
  { id: 'HFLP', name: '忠诚思考者', description: '助人型理性忠诚者，用逻辑守护所爱。你是冷静分析、默默付出的守卫者。', colors: c('#5D6D7E', '#AEB6BF', '#EAECEE'), traits: ['助人', '掌控', '理性', '忠诚'] },
  { id: 'HFLE', name: '自由思想者', description: '助人型理性探索者，用创新方式关怀世界。你是思想开放、善良真诚的改革者。', colors: c('#26A69A', '#80CBC4', '#E0F2F1'), traits: ['助人', '探索', '理性', '自由'] },
  { id: 'HFWP', name: '温暖依靠者', description: '助人型感性忠诚者，以和平方式守护关系。你是柔软可靠、让人安心的港湾。', colors: c('#4E342E', '#8D6E63', '#EFEBE9'), traits: ['助人', '和平', '感受', '忠诚'] },
  { id: 'HFWE', name: '随性关怀者', description: '助人型感性探索者，在自由中传递温暖。你是轻松自在、用爱感染身边人的阳光者。', colors: c('#FF5722', '#FFAB91', '#FBE9E7'), traits: ['助人', '和平', '感受', '自由'] },
]

export const encyclopedia: TypeEncyclopedia[] = types.map(t => ({
  typeId: t.id,
  typeName: t.name,
  alias: t.name,
  coreTraits: t.traits || [],
  strengths: t.traits?.slice(0, 2) || [],
  weaknesses: ['需要关注内在平衡'],
  careers: ['多种职业方向'],
  bestMatch: types.find(o => o.id !== t.id)?.id || '',
  colors: t.colors || c('#4A6CF7', '#6B8AFF', '#EEF0FF'),
  description: t.description,
}))

export const matchRules: MatchRule[] = [
  { dimensionId: 'HR', polePairs: { 'AA': 75, 'AB': 55, 'BA': 55, 'BB': 75 } },
  { dimensionId: 'IT', polePairs: { 'AA': 70, 'AB': 85, 'BA': 85, 'BB': 70 } },
  { dimensionId: 'SC', polePairs: { 'AA': 80, 'AB': 45, 'BA': 45, 'BB': 80 } },
  { dimensionId: 'PW', polePairs: { 'AA': 60, 'AB': 75, 'BA': 75, 'BB': 60 } },
]
