import type { PersonalityType, TypeEncyclopedia, MatchRule } from '@/types'

const c = (p: string, s: string, b: string) => ({ primary: p, secondary: s, background: b })

export const types: PersonalityType[] = [
  { id: 'OCASE', name: '探索领航型', description: '开放创新又尽责可靠，善于在社交中展现友善与稳定。你是团队中值得信赖的开拓者。', colors: c('#4A6CF7', '#6B8AFF', '#EEF0FF'), traits: ['开拓', '可靠', '友善', '稳定'] },
  { id: 'OCSDE', name: '理性开拓型', description: '开放创新又尽责自律，独立思考中保持情绪稳定。你是冷静而有远见的行动者。', colors: c('#2C3E50', '#5D6D7E', '#EAECEE'), traits: ['创新', '自律', '独立', '冷静'] },
  { id: 'OSASE', name: '温暖随和型', description: '开放好奇却随性灵活，善于社交且友善包容。你是让人如沐春风的自由灵魂。', colors: c('#E91E63', '#F48FB1', '#FCE4EC'), traits: ['好奇', '随和', '友善', '灵活'] },
  { id: 'OSSDN', name: '敏感艺术家型', description: '开放却随性，率直表达，情绪敏感而深刻。你是用感受理解世界的创作者。', colors: c('#795548', '#BCAAA4', '#EFEBE9'), traits: ['感受', '率直', '敏感', '创造'] },
  { id: 'CCASE', name: '稳健领袖型', description: '保守务实却尽责可靠，社交活跃且友善包容。你是传统秩序中可靠的社交纽带。', colors: c('#4CAF50', '#A5D6A7', '#E8F5E9'), traits: ['务实', '尽责', '社交', '可靠'] },
  { id: 'CCSDN', name: '严苛专家型', description: '保守务实且尽责自律，率直表达，情绪敏感。你是追求完美却内心焦虑的专业者。', colors: c('#E74C3C', '#F5B7B1', '#FDEDEC'), traits: ['务实', '自律', '率直', '焦虑'] },
  { id: 'CSASE', name: '亲切守护型', description: '保守稳重却随和灵活，友善且情绪稳定。你是安静温暖、默默守护身边的人。', colors: c('#5C6BC0', '#9FA8DA', '#E8EAF6'), traits: ['稳重', '随和', '守护', '温暖'] },
  { id: 'CSSDE', name: '冷静独立型', description: '保守稳重且随性自由，率直独立而情绪稳定。你是冷静自足的独行侠。', colors: c('#37474F', '#90A4AE', '#ECEFF1'), traits: ['独立', '率直', '冷静', '自足'] },
]

export const encyclopedia: TypeEncyclopedia[] = types.map(t => ({
  typeId: t.id,
  typeName: t.name,
  alias: t.name,
  coreTraits: t.traits || [],
  strengths: t.traits?.slice(0, 2) || [],
  weaknesses: ['需要关注平衡发展'],
  careers: ['多种职业方向'],
  bestMatch: types.find(o => o.id !== t.id)?.id || '',
  colors: t.colors || c('#4A6CF7', '#6B8AFF', '#EEF0FF'),
  description: t.description,
}))

export const matchRules: MatchRule[] = [
  { dimensionId: 'OE', polePairs: { 'AA': 70, 'AB': 45, 'BA': 45, 'BB': 70 } },
  { dimensionId: 'CO', polePairs: { 'AA': 80, 'AB': 50, 'BA': 50, 'BB': 80 } },
  { dimensionId: 'EX', polePairs: { 'AA': 75, 'AB': 60, 'BA': 60, 'BB': 75 } },
  { dimensionId: 'AG', polePairs: { 'AA': 70, 'AB': 55, 'BA': 55, 'BB': 70 } },
  { dimensionId: 'NE', polePairs: { 'AA': 80, 'AB': 40, 'BA': 40, 'BB': 80 } },
]
