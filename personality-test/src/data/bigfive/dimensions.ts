import type { Dimension } from '@/types'

export const dimensions: Dimension[] = [
  {
    id: 'OP',
    name: '思维开放度',
    poleAName: '开放',
    poleBName: '务实',
    poleAKey: 'O',
    poleBKey: 'R',
  },
  {
    id: 'CS',
    name: '自我管理',
    poleAName: '尽责',
    poleBName: '松弛',
    poleAKey: 'C',
    poleBKey: 'F',
  },
  {
    id: 'EI',
    name: '社交能量',
    poleAName: '外向',
    poleBName: '内敛',
    poleAKey: 'E',
    poleBKey: 'I',
  },
  {
    id: 'AD',
    name: '人际取向',
    poleAName: '亲和',
    poleBName: '坚定',
    poleAKey: 'A',
    poleBKey: 'D',
  },
  {
    id: 'NS',
    name: '情绪波动',
    poleAName: '敏感',
    poleBName: '稳定',
    poleAKey: 'N',
    poleBKey: 'S',
  },
]
