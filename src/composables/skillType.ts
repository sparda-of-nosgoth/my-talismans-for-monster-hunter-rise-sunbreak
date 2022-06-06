import { ref } from 'vue';

export interface SkillType {
  id: number
  name: string
}

export function useSkillType() {
  const skillTypes = ref<SkillType[]>([
    {
      id: 1,
      name: 'quest',
    },
    {
      id: 2,
      name: 'item',
    },
    {
      id: 3,
      name: 'stats-offensive',
    },
    {
      id: 4,
      name: 'stats-defensive',
    },
    {
      id: 5,
      name: 'survival',
    },
    {
      id: 6,
      name: 'battle',
    },
    {
      id: 7,
      name: 'battle-swordsman',
    },
    {
      id: 8,
      name: 'battle-gunner',
    },
    {
      id: 9,
      name: 'set-bonus',
    },
  ]);

  return { skillTypes };
}
