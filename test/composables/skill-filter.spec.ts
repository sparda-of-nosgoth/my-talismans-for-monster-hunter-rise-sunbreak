import {
  describe, expect, it, jest,
} from '@jest/globals';
import { useSkillFilter } from 'src/composables/skill-filter';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';

jest.mock('boot/i18n');

describe('composables/skill-filter', () => {
  setActivePinia(createPinia());

  it('has a function to to filter skills by name', () => {
    const { getSkillById, sortedSkills } = useSkillStore();
    const { filteredSkills, filterSkillByName } = useSkillFilter(sortedSkills);
    filterSkillByName('Cha');
    // Sorted in French
    expect(filteredSkills.value).toStrictEqual([
      getSkillById('chameleos-blessing'),
      getSkillById('good-luck'),
      getSkillById('charge-master'),
      getSkillById('load-shells'),
      getSkillById('reload-speed'),
    ]);
    filterSkillByName('');
    // Sorted in French
    expect(filteredSkills.value).toStrictEqual(sortedSkills);
  });
});
