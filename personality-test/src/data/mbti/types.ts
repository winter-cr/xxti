import type { PersonalityType, TypeEncyclopedia } from '@/types'

const c = (p: string, s: string, b: string) => ({ primary: p, secondary: s, background: b })

export const types: PersonalityType[] = [
  { id: 'ENTJ', name: '统帅型', description: '天生的领导者，果断坚定，善于制定长远计划并推动执行。你享受挑战，追求高效，总能看到改进的空间。', colors: c('#E74C3C', '#F5B7B1', '#FDEDEC'), traits: ['果断', '远见', '高效', '挑战'] },
  { id: 'ENTP', name: '辩论家型', description: '聪明好奇的思想家，热爱智力辩论和创新可能。你善于从多角度思考问题，不喜欢墨守成规。', colors: c('#F39C12', '#FAD7A0', '#FEF5E7'), traits: ['创新', '好奇', '辩论', '灵活'] },
  { id: 'INTJ', name: '策划者型', description: '具有远见的战略家，独立思考，追求卓越。你擅长制定长期规划，用逻辑和决心实现目标。', colors: c('#2C3E50', '#AEB6BF', '#EAECEE'), traits: ['战略', '独立', '卓越', '逻辑'] },
  { id: 'INTP', name: '逻辑学家型', description: '富有创造力的发明家，对知识和理论有无穷的渴望。你享受探索抽象概念和发现逻辑关系。', colors: c('#7D3C98', '#C39BD3', '#F4ECF7'), traits: ['创造', '分析', '理论', '探索'] },
  { id: 'ENFJ', name: '教导者型', description: '富有魅力的激励者，天生的导师和引路人。你深切关心他人成长，善于凝聚团队向共同目标前进。', colors: c('#1ABC9C', '#A3E4D7', '#E8F8F5'), traits: ['魅力', '激励', '关怀', '凝聚'] },
  { id: 'ENFP', name: '竞选者型', description: '热情洋溢的自由精灵，创造力丰富，善于发现可能性。你对新事物和新人充满好奇与热忱。', colors: c('#E91E63', '#F48FB1', '#FCE4EC'), traits: ['热情', '创造', '好奇', '自由'] },
  { id: 'INFJ', name: '提倡者型', description: '安静而有力的理想主义者，对人类福祉有深切的关怀。你追求意义，用洞察力和决心改善世界。', colors: c('#0097A7', '#80DEEA', '#E0F7FA'), traits: ['理想', '洞察', '意义', '决心'] },
  { id: 'INFP', name: '调停者型', description: '理想主义的深思者，追求内心和谐，富有创造力和同理心。你用诗意的眼光看待世界，渴望真实。', colors: c('#795548', '#BCAAA4', '#EFEBE9'), traits: ['诗意', '和谐', '同理', '真实'] },
  { id: 'ESTJ', name: '执行官型', description: '务实高效的组织者，重视传统和秩序。你善于管理项目和人员，确保事情按计划顺利进行。', colors: c('#5D6D7E', '#AEB6BF', '#EAECEE'), traits: ['务实', '秩序', '管理', '高效'] },
  { id: 'ESTP', name: '企业家型', description: '精力充沛的冒险家，善于把握当下机会。你喜欢行动胜过讨论，在危机中表现得尤为出色。', colors: c('#FF5722', '#FFAB91', '#FBE9E7'), traits: ['冒险', '行动', '机敏', '乐观'] },
  { id: 'ISTJ', name: '检查者型', description: '可靠严谨的实干家，重视责任和秩序。你一丝不苟地完成任务，是团队中最值得信赖的人。', colors: c('#37474F', '#90A4AE', '#ECEFF1'), traits: ['可靠', '严谨', '责任', '信赖'] },
  { id: 'ISTP', name: '鉴赏家型', description: '灵活务实的工匠，善于用双手探索和创造。你冷静理性，在理解事物运作机制上有天赋。', colors: c('#4E342E', '#8D6E63', '#EFEBE9'), traits: ['灵活', '务实', '冷静', '工匠'] },
  { id: 'ESFJ', name: '领事型', description: '热心肠的社交达人，善于关心和照顾他人。你重视和谐的人际关系，乐于帮助别人解决实际困难。', colors: c('#4CAF50', '#A5D6A7', '#E8F5E9'), traits: ['热心', '社交', '关怀', '和谐'] },
  { id: 'ESFP', name: '表演者型', description: '自发乐天的艺人，热爱生活，善于发现身边的美好。你让身边的人感到快乐，是天生的气氛担当。', colors: c('#FF9800', '#FFCC80', '#FFF3E0'), traits: ['乐天', '热情', '美感', '感染'] },
  { id: 'ISFJ', name: '守卫者型', description: '谦逊可靠的守护者，默默付出，守护身边人。你忠诚温暖，用行动而非言语表达关爱。', colors: c('#5C6BC0', '#9FA8DA', '#E8EAF6'), traits: ['守护', '忠诚', '温暖', '谦逊'] },
  { id: 'ISFP', name: '探险家型', description: '温和灵活的艺术家，用行动和美感表达自我。你活在当下，对自然和艺术有着细腻的感知力。', colors: c('#26A69A', '#80CBC4', '#E0F2F1'), traits: ['艺术', '温和', '当下', '感知'] },
]

export const encyclopedia: TypeEncyclopedia[] = [
  { typeId: 'ENTJ', typeName: '统帅型', alias: '指挥官', coreTraits: ['果断', '远见', '高效'], strengths: ['天生的领导力', '战略规划能力', '高效执行力', '强大的决断力'], weaknesses: ['过于强势', '缺乏耐心', '忽视情感', '控制欲强'], careers: ['CEO/高管', '企业家', '律师', '管理顾问'], bestMatch: 'INFP', colors: c('#E74C3C', '#F5B7B1', '#FDEDEC'), description: '天生的领导者，果断坚定，善于制定长远计划并推动执行。' },
  { typeId: 'ENTP', typeName: '辩论家型', alias: '发明家', coreTraits: ['创新', '好奇', '辩论'], strengths: ['思维敏捷', '创意无限', '适应力强', '善于说服'], weaknesses: ['注意力分散', '争论成瘾', '不够务实', '拖延执行'], careers: ['创业者', '产品经理', '律师', '记者'], bestMatch: 'INFJ', colors: c('#F39C12', '#FAD7A0', '#FEF5E7'), description: '聪明好奇的思想家，热爱智力辩论和创新可能。' },
  { typeId: 'INTJ', typeName: '策划者型', alias: '建筑师', coreTraits: ['战略', '独立', '卓越'], strengths: ['远见卓识', '独立思考', '意志坚定', '高效规划'], weaknesses: ['过于傲慢', '情感疏离', '完美主义', '不够灵活'], careers: ['科学家', '战略顾问', '软件架构师', '投资分析师'], bestMatch: 'ENFP', colors: c('#2C3E50', '#AEB6BF', '#EAECEE'), description: '具有远见的战略家，独立思考，追求卓越。' },
  { typeId: 'INTP', typeName: '逻辑学家型', alias: '思考者', coreTraits: ['创造', '分析', '理论'], strengths: ['逻辑严密', '创造力强', '客观公正', '善于创新'], weaknesses: ['社交困难', '缺乏行动力', '过于抽象', '忽视情感'], careers: ['哲学家', '数学家', '软件工程师', '数据科学家'], bestMatch: 'ENTJ', colors: c('#7D3C98', '#C39BD3', '#F4ECF7'), description: '富有创造力的发明家，对知识和理论有无穷的渴望。' },
  { typeId: 'ENFJ', typeName: '教导者型', alias: '主人公', coreTraits: ['魅力', '激励', '关怀'], strengths: ['感染力强', '善于激励', '组织能力', '同理心深'], weaknesses: ['过度理想化', '太过自我牺牲', '过于敏感', '控制欲隐性'], careers: ['教师', '人力资源', '公关经理', '非营利组织领导者'], bestMatch: 'INTP', colors: c('#1ABC9C', '#A3E4D7', '#E8F8F5'), description: '富有魅力的激励者，天生的导师和引路人。' },
  { typeId: 'ENFP', typeName: '竞选者型', alias: '活动家', coreTraits: ['热情', '创造', '好奇'], strengths: ['热情洋溢', '创意丰富', '善于沟通', '乐观积极'], weaknesses: ['注意力分散', '过于理想化', '情绪化', '难以专注'], careers: ['记者', '心理咨询师', '创意总监', '自由职业者'], bestMatch: 'INTJ', colors: c('#E91E63', '#F48FB1', '#FCE4EC'), description: '热情洋溢的自由精灵，创造力丰富，善于发现可能性。' },
  { typeId: 'INFJ', typeName: '提倡者型', alias: '咨询师', coreTraits: ['理想', '洞察', '意义'], strengths: ['洞察力深', '理想坚定', '善于倾听', '有远见'], weaknesses: ['过度完美主义', '容易疲惫', '过于敏感', '回避冲突'], careers: ['心理咨询师', '作家', '社会工作者', '教师'], bestMatch: 'ENTP', colors: c('#0097A7', '#80DEEA', '#E0F7FA'), description: '安静而有力的理想主义者，对人类福祉有深切的关怀。' },
  { typeId: 'INFP', typeName: '调停者型', alias: '梦想家', coreTraits: ['诗意', '和谐', '同理'], strengths: ['创造力深', '同理心强', '忠于自我', '理想主义'], weaknesses: ['过于内向', '自我封闭', '不切实际', '过于敏感'], careers: ['作家', '艺术家', '心理咨询师', '非营利组织'], bestMatch: 'ENTJ', colors: c('#795548', '#BCAAA4', '#EFEBE9'), description: '理想主义的深思者，追求内心和谐，富有创造力和同理心。' },
  { typeId: 'ESTJ', typeName: '执行官型', alias: '监督者', coreTraits: ['务实', '秩序', '管理'], strengths: ['组织能力强', '可靠负责', '高效执行', '注重传统'], weaknesses: ['固执己见', '过于刻板', '缺乏想象', '控制欲强'], careers: ['项目经理', '军官', '法官', '行政主管'], bestMatch: 'ISFP', colors: c('#5D6D7E', '#AEB6BF', '#EAECEE'), description: '务实高效的组织者，重视传统和秩序。' },
  { typeId: 'ESTP', typeName: '企业家型', alias: '推广者', coreTraits: ['冒险', '行动', '机敏'], strengths: ['行动迅速', '善于应变', '观察敏锐', '务实果断'], weaknesses: ['冲动鲁莽', '缺乏长远规划', '冒险过度', '忽视他人感受'], careers: ['销售经理', '运动员', '急诊医生', '企业家'], bestMatch: 'ISTJ', colors: c('#FF5722', '#FFAB91', '#FBE9E7'), description: '精力充沛的冒险家，善于把握当下机会。' },
  { typeId: 'ISTJ', typeName: '检查者型', alias: '稽查员', coreTraits: ['可靠', '严谨', '责任'], strengths: ['高度可靠', '细致严谨', '忠于职责', '意志坚定'], weaknesses: ['过于刻板', '拒绝创新', '缺乏灵活', '情感内敛'], careers: ['会计师', '审计员', '系统管理员', '公务员'], bestMatch: 'ESFP', colors: c('#37474F', '#90A4AE', '#ECEFF1'), description: '可靠严谨的实干家，重视责任和秩序。' },
  { typeId: 'ISTP', typeName: '鉴赏家型', alias: '手艺人', coreTraits: ['灵活', '务实', '冷静'], strengths: ['动手能力强', '冷静理性', '善于分析', '独立自主'], weaknesses: ['不善表达', '冒险倾向', '缺乏承诺', '过于内敛'], careers: ['工程师', '飞行员', '外科医生', '技术维修'], bestMatch: 'ESTJ', colors: c('#4E342E', '#8D6E63', '#EFEBE9'), description: '灵活务实的工匠，善于用双手探索和创造。' },
  { typeId: 'ESFJ', typeName: '领事型', alias: '供给者', coreTraits: ['热心', '社交', '关怀'], strengths: ['乐于助人', '社交能力强', '忠诚可靠', '善于协调'], weaknesses: ['过于在意他人评价', '容易受伤', '控制欲隐性', '缺乏独立思考'], careers: ['护士', '教师', '人力资源', '社工'], bestMatch: 'INTP', colors: c('#4CAF50', '#A5D6A7', '#E8F5E9'), description: '热心肠的社交达人，善于关心和照顾他人。' },
  { typeId: 'ESFP', typeName: '表演者型', alias: '娱乐家', coreTraits: ['乐天', '热情', '美感'], strengths: ['热爱生活', '善于社交', '适应力强', '感染力大'], weaknesses: ['逃避冲突', '缺乏规划', '过于享乐', '注意力分散'], careers: ['演员', '导游', '活动策划', '销售代表'], bestMatch: 'ISTJ', colors: c('#FF9800', '#FFCC80', '#FFF3E0'), description: '自发乐天的艺人，热爱生活，善于发现身边的美好。' },
  { typeId: 'ISFJ', typeName: '守卫者型', alias: '保护者', coreTraits: ['守护', '忠诚', '温暖'], strengths: ['忠诚可靠', '细心体贴', '责任感强', '善于支持'], weaknesses: ['过于谦逊', '不善变通', '过度劳累', '回避冲突'], careers: ['图书馆员', '行政助理', '护士', '幼教老师'], bestMatch: 'ESFP', colors: c('#5C6BC0', '#9FA8DA', '#E8EAF6'), description: '谦逊可靠的守护者，默默付出，守护身边人。' },
  { typeId: 'ISFP', typeName: '探险家型', alias: '作曲家', coreTraits: ['艺术', '温和', '当下'], strengths: ['审美敏锐', '温和善良', '活在当下', '忠于自我'], weaknesses: ['过于内敛', '回避冲突', '缺乏规划', '容易受伤'], careers: ['艺术家', '设计师', '音乐家', '厨师'], bestMatch: 'ESTJ', colors: c('#26A69A', '#80CBC4', '#E0F2F1'), description: '温和灵活的艺术家，用行动和美感表达自我。' },
]
