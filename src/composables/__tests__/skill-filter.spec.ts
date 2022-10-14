import {
  describe, expect, it, jest,
} from '@jest/globals';
import { useSkillFilter } from 'src/composables/skill-filter';
import { getSkillById, sortedSkills } from 'src/models/skill';

jest.mock('boot/i18n');

describe('composables/skill-filter', () => {
  it('can filter skills by name', () => {
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
