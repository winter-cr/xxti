import type { Dimension } from '@/types'

export const dimensions: Dimension[] = [
  { id: 'OE', name: '开放性', poleAName: '开放', poleBName: '保守', poleAKey: 'O', poleBKey: 'C' },
  { id: 'CO', name: '尽责性', poleAName: '尽责', poleBName: '随性', poleAKey: 'C', poleBKey: 'S' },
  { id: 'EX', name: '外向性', poleAName: '外向', poleBName: '内向', poleAKey: 'E', poleBKey: 'I' },
  { id: 'AG', name: '宜人性', poleAName: '友善', poleBName: '率直', poleAKey: 'A', poleBKey: 'D' },
  { id: 'NE', name: '情绪性', poleAName: '稳定', poleBName: '敏感', poleAKey: 'S', poleBKey: 'N' },
]
