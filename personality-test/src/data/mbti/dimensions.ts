import type { Dimension } from '@/types'

export const dimensions: Dimension[] = [
  {
    id: 'EI',
    name: '能量方向',
    poleAName: '外向',
    poleBName: '内向',
    poleAKey: 'E',
    poleBKey: 'I',
  },
  {
    id: 'NS',
    name: '认知方式',
    poleAName: '直觉',
    poleBName: '感知',
    poleAKey: 'N',
    poleBKey: 'S',
  },
  {
    id: 'TF',
    name: '决策方式',
    poleAName: '思考',
    poleBName: '情感',
    poleAKey: 'T',
    poleBKey: 'F',
  },
  {
    id: 'JP',
    name: '生活态度',
    poleAName: '判断',
    poleBName: '知觉',
    poleAKey: 'J',
    poleBKey: 'P',
  },
]
