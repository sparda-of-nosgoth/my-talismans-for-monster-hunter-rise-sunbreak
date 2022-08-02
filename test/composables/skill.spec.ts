import {
  describe, expect, it, jest,
} from '@jest/globals';
import { useSkill } from 'src/composables/skill';
import { TranslateOptions } from '@intlify/core-base';
import { i18nMocked } from 'app/test/mocks/i18n';
import { skills } from 'app/test/mocks/models';

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => i18nMocked.global.t(key, defaultMsg, options)),
    },
  },
}));

describe('composables/skill', () => {
  it('has a function to filter skills by SkillType', () => {
    const { getSkillsByType } = useSkill();
    expect(getSkillsByType({ id: 1, name: 'quest' })).toStrictEqual([
      {
        id: 1, name: 'affinity-sliding', type: 1, levelMaximum: 1, foundOnTalismans: true,
      }, {
        id: 2, name: 'botanist', type: 1, levelMaximum: 4, foundOnTalismans: true,
      }, {
        id: 3, name: 'capture-master', type: 1, levelMaximum: 1, foundOnTalismans: false,
      }, {
        id: 4, name: 'carving-pro', type: 1, levelMaximum: 1, foundOnTalismans: true,
      }, {
        id: 5, name: 'constitution', type: 1, levelMaximum: 5, foundOnTalismans: true,
      }, {
        id: 6, name: 'geologist', type: 1, levelMaximum: 3, foundOnTalismans: true,
      }, {
        id: 7, name: 'good-luck', type: 1, levelMaximum: 3, foundOnTalismans: true,
      }, {
        id: 8, name: 'hunger-resistance', type: 1, levelMaximum: 3, foundOnTalismans: true,
      }, {
        id: 9, name: 'jump-master', type: 1, levelMaximum: 1, foundOnTalismans: true,
      }, {
        id: 10, name: 'marathon-runner', type: 1, levelMaximum: 3, foundOnTalismans: true,
      }, {
        id: 11, name: 'stamina-surge', type: 1, levelMaximum: 3, foundOnTalismans: true,
      }, {
        id: 12, name: 'wall-runner', type: 1, levelMaximum: 3, foundOnTalismans: true,
      }, {
        id: 13, name: 'wirebug-whisperer', type: 1, levelMaximum: 3, foundOnTalismans: true,
      }, {
        id: 105, name: 'carving-master', type: 1, levelMaximum: 1, foundOnTalismans: false,
      },
    ]);
  });

  it('has a function to find Skill by a translated name', () => {
    const { getSkillByName } = useSkill();
    // Find with a name translated in French
    expect(getSkillByName('Mise à mort')).toStrictEqual({
      id: 84, name: 'weakness-exploit', type: 6, levelMaximum: 3, foundOnTalismans: true,
    });

    // Find with a name translated in English
    expect(getSkillByName('Speed Sharpening')).toStrictEqual({
      id: 92, name: 'speed-sharpening', type: 7, levelMaximum: 3, foundOnTalismans: true,
    });
  });

  it('has a computed property to sort skills by translated name order', () => {
    const { sortedSkills } = useSkill();
    // Sorted in French
    expect(sortedSkills.value).toStrictEqual(skills.allSortedSkills);
  });

  it('has a function to to filter sortedSkills by name', () => {
    const { sortedSkills, filterSkillByName } = useSkill();
    filterSkillByName('Cha');
    // Sorted in French
    expect(sortedSkills.value).toStrictEqual([{
      id: 107, levelMaximum: 4, name: 'chameleos-blessing', type: 9, foundOnTalismans: false,
    }, {
      id: 7, levelMaximum: 3, name: 'good-luck', type: 1, foundOnTalismans: true,
    }, {
      id: 87, levelMaximum: 2, name: 'load-shells', type: 7, foundOnTalismans: true,
    }, {
      id: 100, levelMaximum: 3, name: 'reload-speed', type: 8, foundOnTalismans: true,
    }]);
    filterSkillByName('');
    // Sorted in French
    expect(sortedSkills.value).toStrictEqual(skills.allSortedSkills);
  });
});
