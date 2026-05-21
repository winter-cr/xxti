import type { PersonalityType, TypeColors, TypeEncyclopedia } from '@/types'

interface DimensionChoice {
  key: string
  label: string
}

const choices: Record<string, [DimensionChoice, DimensionChoice]> = {
  OP: [
    { key: 'O', label: '开放' },
    { key: 'R', label: '务实' },
  ],
  CS: [
    { key: 'C', label: '尽责' },
    { key: 'F', label: '松弛' },
  ],
  EI: [
    { key: 'E', label: '外向' },
    { key: 'I', label: '内敛' },
  ],
  AD: [
    { key: 'A', label: '亲和' },
    { key: 'D', label: '坚定' },
  ],
  NS: [
    { key: 'N', label: '敏感' },
    { key: 'S', label: '稳定' },
  ],
}

function colorsFromCode(code: string): TypeColors {
  const hash = [...code].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 7), 0)
  const hue = hash % 360
  return {
    primary: `hsl(${hue} 68% 42%)`,
    secondary: `hsl(${hue} 78% 78%)`,
    background: `hsl(${hue} 70% 97%)`,
  }
}

function bestMatchFor(code: string): string {
  const chars = code.split('')
  const last = chars[chars.length - 1]
  chars[chars.length - 1] = last === 'N' ? 'S' : last === 'S' ? 'N' : last
  return chars.join('')
}

function buildDescription(traits: string[]): string {
  return `你呈现出${traits.join('、')}的组合，既有稳定的行为偏好，也会在不同场景里表现出鲜明节奏。面对工作与关系时，你通常会沿着这组倾向去做选择。`
}

function createEntry(code: string, traits: string[]): PersonalityType {
  return {
    id: code,
    name: `${traits[0]}${traits[1]}型`,
    description: buildDescription(traits),
    traits,
    colors: colorsFromCode(code),
  }
}

function createEncyclopedia(type: PersonalityType): TypeEncyclopedia {
  return {
    typeId: type.id,
    typeName: type.name,
    alias: `Big Five ${type.id}`,
    coreTraits: type.traits,
    strengths: [
      `在${type.traits[0]}相关场景中反应自然`,
      `能把${type.traits[1]}与行动节奏结合起来`,
      '面对熟悉环境时表现稳定',
    ],
    weaknesses: [
      `在过度依赖${type.traits[0]}时可能失衡`,
      `容易放大${type.traits[1]}带来的惯性`,
      '碰到完全相反的合作风格时磨合较慢',
    ],
    careers: ['项目协作', '产品运营', '研究分析'],
    bestMatch: bestMatchFor(type.id),
    colors: type.colors,
    traits: type.traits,
  }
}

function buildTypes(): PersonalityType[] {
  let combinations: { code: string; traits: string[] }[] = [{ code: '', traits: [] }]

  for (const dimensionId of ['OP', 'CS', 'EI', 'AD', 'NS'] as const) {
    const dimension = { id: dimensionId }
    const [choiceA, choiceB] = choices[dimension.id]
    combinations = combinations.flatMap((item) => [
      {
        code: item.code + choiceA.key,
        traits: [...item.traits, choiceA.label],
      },
      {
        code: item.code + choiceB.key,
        traits: [...item.traits, choiceB.label],
      },
    ])
  }

  return combinations.map((item) => createEntry(item.code, item.traits))
}

export const personalityTypes: PersonalityType[] = buildTypes()
export const encyclopedia: TypeEncyclopedia[] = personalityTypes.map(createEncyclopedia)
