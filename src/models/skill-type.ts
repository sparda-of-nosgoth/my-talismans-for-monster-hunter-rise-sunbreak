interface SkillType {
  id: string
}

const skillTypeList: SkillType[] = [
  { id: 'quest' },
  { id: 'item' },
  { id: 'stats-offensive' },
  { id: 'stats-defensive' },
  { id: 'survival' },
  { id: 'battle' },
  { id: 'battle-swordsman' },
  { id: 'battle-gunner' },
  { id: 'set-bonus' },
];

export type { SkillType };

export { skillTypeList };
