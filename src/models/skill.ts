import { Decoration } from 'src/models/decoration';

export interface Skill {
  id: string
  type: string
  levelMaximum: number
  foundOnTalismans: boolean
  decorations: Decoration[]
}

/**
 * List of all Skill
 */
export const skillList: Skill[] = [
  {
    id: 'affinity-sliding',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'affinity-sliding-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'botanist',
    type: 'quest',
    levelMaximum: 4,
    foundOnTalismans: true,
    decorations: [
      { id: 'botanist-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'botanist-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'capture-master',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'carving-pro',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'carving-pro-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'constitution',
    type: 'quest',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'constitution-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'constitution-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'geologist',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'geologist-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'geologist-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'good-luck',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'good-luck-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'good-luck-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'hunger-resistance',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'hunger-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'hunger-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'jump-master',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'jump-master-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'marathon-runner',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'marathon-runner-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'marathon-runner-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'stamina-surge',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'stamina-surge-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'stamina-surge-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'wall-runner',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'wall-runner-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'wall-runner-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'wirebug-whisperer',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'wirebug-whisperer-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'wirebug-whisperer-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'bombardier',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'bombardier-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'bombardier-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'free-meal',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'free-meal-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'free-meal-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'item-prolonger',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'item-prolonger-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'item-prolonger-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'mushroomancer',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'mushroomancer-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'mushroomancer-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'recovery-up',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'recovery-up-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'recovery-up-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'speed-eating',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'speed-eating-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'speed-eating-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'wide-range',
    type: 'item',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'wide-range-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'wide-range-jewel+3', requiredSlot: 3, skillPoints: 3 },
      { id: 'wide-range-jewel+4', requiredSlot: 4, skillPoints: 4 },
    ],
  },
  {
    id: 'bubbly-dance',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'bubbly-dance-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'bubbly-dance-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'divine-blessing',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'divine-blessing-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'divine-blessing-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'earplugs',
    type: 'survival',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'earplugs-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'earplugs-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'evade-extender',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'evade-extender-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'evade-extender-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'evade-window',
    type: 'survival',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'evade-window-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'evade-window-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'flinch-free',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'flinch-free-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'flinch-free-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'guard-up',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'guard-up-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'guard-up-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'guard',
    type: 'survival',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'guard-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'guard-jewel+2', requiredSlot: 3, skillPoints: 2 },
    ],
  },
  {
    id: 'leap-of-faith',
    type: 'survival',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'leap-of-faith-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'muck-resistance',
    type: 'survival',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'muck-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'quick-sheathe',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'quick-sheathe-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'quick-sheathe-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'recovery-speed',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'recovery-speed-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'recovery-speed-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'stun-resistance',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'stun-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'stun-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'tremor-resistance',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'tremor-resistance-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'tremor-resistance-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'windproof',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'windproof-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'windproof-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'attack-boost',
    type: 'stats-offensive',
    levelMaximum: 7,
    foundOnTalismans: true,
    decorations: [
      { id: 'attack-boost-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'blast-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'blast-attack-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'blast-attack-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'critical-eye',
    type: 'stats-offensive',
    levelMaximum: 7,
    foundOnTalismans: true,
    decorations: [
      { id: 'critical-eye-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'dragon-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'dragon-attack-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'dragon-attack-jewel+2', requiredSlot: 2, skillPoints: 2 },
      { id: 'dragon-attack-jewel+3', requiredSlot: 3, skillPoints: 3 },
      { id: 'dragon-attack-jewel+4', requiredSlot: 4, skillPoints: 4 },
    ],
  },
  {
    id: 'fire-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'fire-attack-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'fire-attack-jewel+2', requiredSlot: 2, skillPoints: 2 },
      { id: 'fire-attack-jewel+3', requiredSlot: 3, skillPoints: 3 },
      { id: 'fire-attack-jewel+4', requiredSlot: 4, skillPoints: 4 },
    ],
  },
  {
    id: 'ice-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'ice-attack-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'ice-attack-jewel+2', requiredSlot: 2, skillPoints: 2 },
      { id: 'ice-attack-jewel+3', requiredSlot: 3, skillPoints: 3 },
      { id: 'ice-attack-jewel+4', requiredSlot: 4, skillPoints: 4 },
    ],
  },
  {
    id: 'paralysis-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'paralysis-attack-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'paralysis-attack-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'poison-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'poison-attack-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'poison-attack-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'sleep-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'sleep-attack-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'sleep-attack-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'thunder-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'thunder-attack-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'thunder-attack-jewel+2', requiredSlot: 2, skillPoints: 2 },
      { id: 'thunder-attack-jewel+3', requiredSlot: 3, skillPoints: 3 },
      { id: 'thunder-attack-jewel+4', requiredSlot: 4, skillPoints: 4 },
    ],
  },
  {
    id: 'water-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'water-attack-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'water-attack-jewel+2', requiredSlot: 2, skillPoints: 2 },
      { id: 'water-attack-jewel+3', requiredSlot: 3, skillPoints: 3 },
      { id: 'water-attack-jewel+4', requiredSlot: 4, skillPoints: 4 },
    ],
  },
  {
    id: 'blast-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'blast-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'blast-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'blight-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'blight-resistance-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'blight-resistance-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'defense-boost',
    type: 'stats-defensive',
    levelMaximum: 7,
    foundOnTalismans: true,
    decorations: [
      { id: 'defense-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'defense-jewel-2', requiredSlot: 2, skillPoints: 2 },
      { id: 'defense-jewel-3', requiredSlot: 3, skillPoints: 3 },
      { id: 'defense-jewel-4', requiredSlot: 4, skillPoints: 5 },
    ],
  },
  {
    id: 'dragon-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'dragon-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'dragon-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'fire-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'fire-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'fire-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'ice-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'ice-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'ice-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'paralysis-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'paralysis-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'paralysis-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'poison-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'poison-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'poison-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'sleep-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'sleep-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'sleep-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'thunder-alignment',
    type: 'set-bonus',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [
      { id: 'thunder-alignment-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'thunder-alignment-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'thunder-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'thunder-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'thunder-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'water-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'water-resistance-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'water-resistance-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'wind-alignment',
    type: 'set-bonus',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'agitator',
    type: 'battle',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'agitator-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'artillery',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'artillery-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'artillery-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'bludgeoner',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'bludgeoner-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'counterstrike',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'counterstrike-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'counterstrike-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'critical-boost',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'critical-boost-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'critical-draw',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'critical-draw-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'critical-draw-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'critical-element',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'critical-element-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'critical-element-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'diversion',
    type: 'battle',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'diversion-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'focus',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'focus-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'focus-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'fortify',
    type: 'battle',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'fortify-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'hellfire-cloak',
    type: 'battle',
    levelMaximum: 4,
    foundOnTalismans: true,
    decorations: [
      { id: 'hellfire-cloak-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'hellfire-cloak-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'heroics',
    type: 'battle',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'heroics-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'latent-power',
    type: 'battle',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'latent-power-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'master-mounter',
    type: 'battle',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'master-mounter-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'maximum-might',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'maximum-might-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'maximum-might-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'offensive-guard',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'offensive-guard-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'partbreaker',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'partbreaker-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'partbreaker-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'peak-performance',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'peak-performance-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'power-prolonger',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'power-prolonger-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'power-prolonger-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'punishing-draw',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'punishing-draw-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'punishing-draw-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'resentment',
    type: 'battle',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'resentment-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'resuscitate',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'resuscitate-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'resuscitate-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'slugger',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'slugger-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'slugger-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'stamina-thief',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'stamina-thief-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'stamina-thief-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'weakness-exploit',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'weakness-exploit-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'handicraft',
    type: 'battle-swordsman',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'handicraft-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'handicraft-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'horn-maestro',
    type: 'battle-swordsman',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'horn-maestro-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'load-shells',
    type: 'battle-swordsman',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'load-shells-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'load-shells-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'minds-eye',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'minds-eye-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'minds-eye-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'protective-polish',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'protective-polish-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'protective-polish-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'rapid-morph',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'rapid-morph-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'rapid-morph-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'razor-sharp',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'razor-sharp-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'razor-sharp-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'speed-sharpening',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'speed-sharpening-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'speed-sharpening-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'ballistics',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'ballistics-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'ballistics-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'ammo-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'ammo-up-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'bow-charge-plus',
    type: 'battle-gunner',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [
      { id: 'bow-charge-plus-jewel+1', requiredSlot: 4, skillPoints: 1 },
    ],
  },
  {
    id: 'normal-rapid',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'normal-rapid-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'normal-rapid-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'pierce-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'pierce-up-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'pierce-up-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'rapid-fire-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'rapid-fire-up-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'recoil-down',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'recoil-down-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'reload-speed',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'reload-speed-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'spare-shot',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'spare-shot-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'special-ammo-boost',
    type: 'battle-gunner',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'special-ammo-boost-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'special-ammo-boost-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'spread-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'spread-up-jewel+1', requiredSlot: 3, skillPoints: 1 },
      { id: 'spread-up-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'steadiness',
    type: 'battle-gunner',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'steadiness-jewel+1', requiredSlot: 1, skillPoints: 1 },
      { id: 'steadiness-jewel+2', requiredSlot: 4, skillPoints: 2 },
      { id: 'steadiness-jewel+3', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  // Update 2.0 Skills
  {
    id: 'carving-master',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'masters-touch',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'masters-touch-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'masters-touch-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'chameleos-blessing',
    type: 'set-bonus',
    levelMaximum: 4,
    foundOnTalismans: false,
    decorations: [
      { id: 'chameleos-blessing-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'kushala-blessing',
    type: 'set-bonus',
    levelMaximum: 4,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'teostra-blessing',
    type: 'set-bonus',
    levelMaximum: 4,
    foundOnTalismans: false,
    decorations: [],
  },
  // Update 3.0 Skills
  {
    id: 'dragonheart',
    type: 'set-bonus',
    levelMaximum: 5,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'stormsoul',
    type: 'set-bonus',
    levelMaximum: 5,
    foundOnTalismans: false,
    decorations: [],
  },
  // Update 10.0 Skills - Sunbreak
  {
    id: 'bladescale-hone',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'bladescale-hone-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'bloodlust',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'blood-rite',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'burst',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [
      { id: 'burst-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'charge-master',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'charge-master-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'chain-crit',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [],
  },
  {
    id: 'coalescence',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'coalescence-jewel+1', requiredSlot: 2, skillPoints: 1 },
      { id: 'coalescence-jewel+2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'dereliction',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'foray',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'foray-jewel+1', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'furious',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'grinder-s',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'grinder-s-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'mail-of-hellfire',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'quick-breath',
    type: 'survival',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [
      { id: 'quick-breath-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'redirection',
    type: 'survival',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'redirection-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'spiribirds-call',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'spiribirds-call-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'tune-up',
    type: 'battle-gunner',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'tune-up-jewel+1', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'wall-runner-boost',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'wall-runner-boost-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  // Update 11.0 Skills - Sunbreak
  {
    id: 'adrenaline-rush',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'element-exploit',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'defiance',
    type: 'stats-defensive',
    levelMaximum: 5,
    foundOnTalismans: false,
    decorations: [
      { id: 'defiance-jewel+1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'guts',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'sneak-attack',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'status-trigger',
    type: 'batlle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  // Update 12.0 Skills - Sunbreak
  {
    id: 'buildup-boost',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'embolden',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'intrepid-heart',
    type: 'survival',
    levelMaximum: 2,
    foundOnTalismans: false,
    decorations: [],
  },
];
