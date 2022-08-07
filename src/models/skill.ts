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
      { id: 'slider-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'botanist',
    type: 'quest',
    levelMaximum: 4,
    foundOnTalismans: true,
    decorations: [
      { id: 'botany-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'botany-jewel-4', requiredSlot: 4, skillPoints: 3 },
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
      { id: 'carver-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'constitution',
    type: 'quest',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'physique-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'physique-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'geologist',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'geology-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'geology-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'good-luck',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'fate-jewel-3', requiredSlot: 3, skillPoints: 1 },
      { id: 'fate-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'hunger-resistance',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'hungerless-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'hungerless-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'jump-master',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'leap-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'marathon-runner',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'sprinter-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'sprinter-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'stamina-surge',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'refresh-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'refresh-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'wall-runner',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'wall-run-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'wall-run-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'wirebug-whisperer',
    type: 'quest',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'wirebug-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'wirebug-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'bombardier',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'bomber-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'bomber-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'free-meal',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'satiated-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'satiated-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'item-prolonger',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'enduring-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'enduring-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'mushroomancer',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'fungiform-jewel-3', requiredSlot: 3, skillPoints: 1 },
      { id: 'fungiform-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'recovery-up',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'recovery-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'recovery-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'speed-eating',
    type: 'item',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'gobbler-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'gobbler-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'wide-range',
    type: 'item',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'friendship-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'friendship-jewel-3', requiredSlot: 3, skillPoints: 3 },
      { id: 'friendship-jewel-4', requiredSlot: 4, skillPoints: 4 },
    ],
  },
  {
    id: 'bubbly-dance',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'bubble-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'bubble-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'divine-blessing',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'protection-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'protection-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'earplugs',
    type: 'survival',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'protection-jewel-3', requiredSlot: 3, skillPoints: 1 },
      { id: 'protection-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'evade-extender',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'jumping-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'jumping-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'evade-window',
    type: 'survival',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'evasion-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'evasion-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'flinch-free',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'brace-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'brace-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'guard-up',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'shield-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'shield-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'guard',
    type: 'survival',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'ironwall-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'ironwall-jewel-3', requiredSlot: 3, skillPoints: 2 },
    ],
  },
  {
    id: 'leap-of-faith',
    type: 'survival',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'dive-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'muck-resistance',
    type: 'survival',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'muck-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'quick-sheathe',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'sheath-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'recovery-speed',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'recovery-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'recovery-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'stun-resistance',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'steadfast-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'steadfast-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'tremor-resistance',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'footing-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'footing-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'windproof',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'wind-res-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'wind-res-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'attack-boost',
    type: 'stats-offensive',
    levelMaximum: 7,
    foundOnTalismans: true,
    decorations: [
      { id: 'attack-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'blast-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'blast-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'critical-eye',
    type: 'stats-offensive',
    levelMaximum: 7,
    foundOnTalismans: true,
    decorations: [
      { id: 'expert-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'dragon-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'dragon-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'dragon-jewel-2', requiredSlot: 2, skillPoints: 2 },
      { id: 'dragon-jewel-3', requiredSlot: 3, skillPoints: 3 },
    ],
  },
  {
    id: 'fire-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'blaze-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'blaze-jewel-2', requiredSlot: 2, skillPoints: 2 },
      { id: 'blaze-jewel-3', requiredSlot: 3, skillPoints: 3 },
    ],
  },
  {
    id: 'ice-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'frost-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'frost-jewel-2', requiredSlot: 2, skillPoints: 2 },
      { id: 'frost-jewel-3', requiredSlot: 3, skillPoints: 3 },
    ],
  },
  {
    id: 'paralysis-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'paralyzer-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'poison-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'venom-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'sleep-attack',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'sleep-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'thunder-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'bolt-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'bolt-jewel-2', requiredSlot: 2, skillPoints: 2 },
      { id: 'bolt-jewel-3', requiredSlot: 3, skillPoints: 3 },
    ],
  },
  {
    id: 'water-attack',
    type: 'stats-offensive',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'stream-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'stream-jewel-2', requiredSlot: 2, skillPoints: 2 },
      { id: 'stream-jewel-3', requiredSlot: 3, skillPoints: 3 },
    ],
  },
  {
    id: 'blast-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'antiblast-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'blight-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'resistor-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'resistor-jewel-4', requiredSlot: 4, skillPoints: 2 },
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
      { id: 'dragon-res-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'dragon-res-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'fire-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'fire-res-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'fire-res-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'ice-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'ice-res-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'ice-res-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'paralysis-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'antipara-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'poison-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'antidote-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'sleep-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'pep-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'thunder-alignment',
    type: 'set-bonus',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [
      { id: 'ice-res-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'ice-res-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'thunder-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'thunder-res-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'thunder-res-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'water-resistance',
    type: 'stats-defensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'water-res-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'water-res-jewel-4', requiredSlot: 4, skillPoints: 3 },
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
      { id: 'challenger-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'artillery',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'artillery-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'bludgeoner',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'blunt-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'counterstrike',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'counter-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'critical-boost',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'critical-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'critical-draw',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'draw-jewel-3', requiredSlot: 3, skillPoints: 1 },
      { id: 'draw-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'critical-element',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'crit-element-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'crit-element-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'diversion',
    type: 'battle',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'diversion-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'focus',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'charger-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'charger-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'fortify',
    type: 'battle',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'fortitude-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'hellfire-cloak',
    type: 'battle',
    levelMaximum: 4,
    foundOnTalismans: true,
    decorations: [
      { id: 'hellfire-jewel-3', requiredSlot: 3, skillPoints: 1 },
      { id: 'hellfire-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'heroics',
    type: 'battle',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'potential-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'latent-power',
    type: 'battle',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'throttle-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'master-mounter',
    type: 'battle',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'rodeo-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'maximum-might',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'mighty-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'offensive-guard',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'guardian-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'partbreaker',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'destroyer-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'peak-performance',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'flawless-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'power-prolonger',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'enhancer-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'enhancer-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'punishing-draw',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'gambit-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'gambit-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'resentment',
    type: 'battle',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'furor-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'resuscitate',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'crisis-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'slugger',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'ko-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'ko-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'stamina-thief',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'drain-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'drain-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'weakness-exploit',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'tenderizer-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'handicraft',
    type: 'battle-swordsman',
    levelMaximum: 5,
    foundOnTalismans: true,
    decorations: [
      { id: 'handicraft-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'horn-maestro',
    type: 'battle-swordsman',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'sonorous-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'load-shells',
    type: 'battle-swordsman',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'magazine-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'minds-eye',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'minds-eye-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'minds-eye-jewel-2', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'protective-polish',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'sharp-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'rapid-morph',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'quickswitch-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'razor-sharp',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'razor-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'speed-sharpening',
    type: 'battle-swordsman',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'grinder-jewel-2', requiredSlot: 1, skillPoints: 1 },
      { id: 'grinder-jewel-4', requiredSlot: 4, skillPoints: 3 },
    ],
  },
  {
    id: 'ballistics',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'precise-jewel-2', requiredSlot: 2, skillPoints: 1 },
      { id: 'precise-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
  {
    id: 'ammo-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'capacity-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'bow-charge-plus',
    type: 'battle-gunner',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [
      { id: 'mighty-bow-jewel-4', requiredSlot: 4, skillPoints: 1 },
    ],
  },
  {
    id: 'normal-rapid',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'forceshot-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'pierce-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'pierce-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'rapid-fire-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'salvo-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'recoil-down',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'absorber-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'reload-speed',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'quickload-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'spare-shot',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'thrift-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'special-ammo-boost',
    type: 'battle-gunner',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'trueshot-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'spread-up',
    type: 'battle-gunner',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'spread-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'steadiness',
    type: 'battle-gunner',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'sniper-jewel-1', requiredSlot: 1, skillPoints: 1 },
      { id: 'sniper-jewel-4', requiredSlot: 4, skillPoints: 2 },
    ],
  },
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
      { id: 'mastery-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'chameleos-blessing',
    type: 'set-bonus',
    levelMaximum: 4,
    foundOnTalismans: false,
    decorations: [],
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
  // Sunbreak Skills
  {
    id: 'blood-rite',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'dereliction',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'furious',
    type: 'survival',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'mail-of-hellfire',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'coalescence',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [],
  },
  {
    id: 'bloodlust',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'defiance',
    type: 'survival', // TODO : verify ?
    levelMaximum: 5,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'sneak-attack',
    type: 'battle', // TODO : verify ?
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'adrenaline-rush',
    type: 'battle', // TODO : verify ?
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'redirection',
    type: 'survival',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [],
  },
  {
    id: 'spiribirds-call',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'spiribirds-call-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'charge-master',
    type: 'stats-offensive',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'charge-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'foray',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [],
  },
  {
    id: 'tune-up',
    type: 'battle-gunner',
    levelMaximum: 2,
    foundOnTalismans: true,
    decorations: [
      { id: 'foil-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'grinder-s',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'polisher-pro-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'bladescale-hone',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [
      { id: 'bladescale-jewel-2', requiredSlot: 2, skillPoints: 1 },
    ],
  },
  {
    id: 'wall-runner-boost',
    type: 'quest',
    levelMaximum: 1,
    foundOnTalismans: true,
    decorations: [
      { id: 'flywall-jewel-1', requiredSlot: 1, skillPoints: 1 },
    ],
  },
  {
    id: 'quick-breath',
    type: 'survival',
    levelMaximum: 1,
    foundOnTalismans: false,
    decorations: [
      { id: 'breath-jewel-3', requiredSlot: 3, skillPoints: 1 },
    ],
  },
  {
    id: 'element-exploit',
    type: 'survival', // TODO : verify ?
    levelMaximum: 3,
    foundOnTalismans: false,
    decorations: [],
  },
  {
    id: 'chain-crit',
    type: 'battle',
    levelMaximum: 3,
    foundOnTalismans: true,
    decorations: [],
  },
  {
    id: 'guts',
    type: 'survival',
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
];
