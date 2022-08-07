import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { useTalismanImport } from 'src/composables/talisman-import';
import { ref } from 'vue';
import { initFakeTimers } from 'app/test/mocks';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import { Talisman } from 'src/models/talisman';

initFakeTimers();

jest.mock('boot/i18n');

describe('composables/talisman-import', () => {
  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  describe('with a ref', () => {
    const csv = ref('');
    const { talismansToImport, errorsFromImport } = useTalismanImport(csv);

    async function updateCsv(newValue: string) {
      csv.value = newValue;
    }

    beforeEach(() => {
      csv.value = '';
    });

    it('import an empty string', () => {
      expect(talismansToImport.value).toStrictEqual([]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [],
        skill1NotFound: [],
        skill1LevelIsEmpty: [],
        skill1LevelExceedsMaximum: [],
        skill2IsEmpty: [],
        skill2NotFound: [],
        skill2LevelIsEmpty: [],
        skill2LevelExceedsMaximum: [],
        slotsNotFound: [],
      });
    });

    it('import valid talismans', async () => {
      await updateCsv(''
        + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
        + 'Agitator,2,,,2,1,0');
      expect(talismansToImport.value).toStrictEqual([
        new Talisman({
          skill1: getSkillById('speed-sharpening'),
          skill1Level: 1,
          skill2: getSkillById('weakness-exploit'),
          skill2Level: 1,
          slots: getSlotsById('0-0-0'),
        }),
        new Talisman({
          skill1: getSkillById('master-mounter'),
          skill1Level: 1,
          skill2: getSkillById('slugger'),
          skill2Level: 1,
          slots: getSlotsById('1-1-0'),
        }),
        new Talisman({
          skill1: getSkillById('agitator'),
          skill1Level: 2,
          slots: getSlotsById('2-1-0'),
        }),
      ]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [],
        skill1NotFound: [],
        skill1LevelIsEmpty: [],
        skill1LevelExceedsMaximum: [],
        skill2IsEmpty: [],
        skill2NotFound: [],
        skill2LevelIsEmpty: [],
        skill2LevelExceedsMaximum: [],
        slotsNotFound: [],
      });
    });

    it('import invalid talismans', async () => {
      await updateCsv(''
        + ',1,Weakness Exploit,1,0,0,0\r\n'
        + 'Speed,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Speed Sharpening,1,,1,0,0,0\r\n'
        + 'Speed Sharpening,1,Exploit,1,0,0,0\r\n'
        + 'Speed Sharpening,1,Weakness Exploit,4,0,0,0\r\n'
        + 'Master Mounter,,Slugger,1,1,1,0\r\n'
        + 'Master Mounter,1,Slugger,,1,1,0\r\n'
        + 'Master Mounter,8,Slugger,1,1,1,0\r\n'
        + 'Agitator,2,,,4,4,4');
      expect(talismansToImport.value).toStrictEqual([]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [{
          skill1: null, skill1Level: 1, skill2: 'Weakness Exploit', skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill1NotFound: [{
          skill1: 'Speed', skill1Level: 1, skill2: 'Weakness Exploit', skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill1LevelIsEmpty: [{
          skill1: 'Master Mounter', skill1Level: null, skill2: 'Slugger', skill2Level: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill1LevelExceedsMaximum: [{
          skill1: 'Master Mounter', skill1Level: 8, skill2: 'Slugger', skill2Level: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill2IsEmpty: [{
          skill1: 'Speed Sharpening', skill1Level: 1, skill2: null, skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill2NotFound: [{
          skill1: 'Speed Sharpening', skill1Level: 1, skill2: 'Exploit', skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill2LevelIsEmpty: [{
          skill1: 'Master Mounter', skill1Level: 1, skill2: 'Slugger', skill2Level: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill2LevelExceedsMaximum: [{
          skill1: 'Speed Sharpening', skill1Level: 1, skill2: 'Weakness Exploit', skill2Level: 4, slot1: 0, slot2: 0, slot3: 0,
        }],
        slotsNotFound: [{
          skill1: 'Agitator', skill1Level: 2, skill2: null, skill2Level: null, slot1: 4, slot2: 4, slot3: 4,
        }],
      });
    });

    it('import mixed valid and invalid talismans', async () => {
      await updateCsv(''
        + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Master Mounter,1,Slugger,,1,1,0\r\n'
        + 'Agitator,2,,,4,4,4');
      expect(talismansToImport.value).toStrictEqual([
        new Talisman({
          skill1: getSkillById('speed-sharpening'),
          skill1Level: 1,
          skill2: getSkillById('weakness-exploit'),
          skill2Level: 1,
          slots: getSlotsById('0-0-0'),
        })]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [],
        skill1NotFound: [],
        skill1LevelIsEmpty: [],
        skill1LevelExceedsMaximum: [],
        skill2IsEmpty: [],
        skill2NotFound: [],
        skill2LevelIsEmpty: [{
          skill1: 'Master Mounter', skill1Level: 1, skill2: 'Slugger', skill2Level: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill2LevelExceedsMaximum: [],
        slotsNotFound: [{
          skill1: 'Agitator', skill1Level: 2, skill2: null, skill2Level: null, slot1: 4, slot2: 4, slot3: 4,
        }],
      });
    });
  });

  describe('with a string', () => {
    it('import an empty string', () => {
      const { talismansToImport, errorsFromImport } = useTalismanImport('');
      expect(talismansToImport.value).toStrictEqual([]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [],
        skill1NotFound: [],
        skill1LevelIsEmpty: [],
        skill1LevelExceedsMaximum: [],
        skill2IsEmpty: [],
        skill2NotFound: [],
        skill2LevelIsEmpty: [],
        skill2LevelExceedsMaximum: [],
        slotsNotFound: [],
      });
    });

    it('import valid talismans', () => {
      const { talismansToImport, errorsFromImport } = useTalismanImport(''
        + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
        + 'Agitator,2,,,2,1,0');
      expect(talismansToImport.value).toStrictEqual([
        new Talisman({
          skill1: getSkillById('speed-sharpening'),
          skill1Level: 1,
          skill2: getSkillById('weakness-exploit'),
          skill2Level: 1,
          slots: getSlotsById('0-0-0'),
        }),
        new Talisman({
          skill1: getSkillById('master-mounter'),
          skill1Level: 1,
          skill2: getSkillById('slugger'),
          skill2Level: 1,
          slots: getSlotsById('1-1-0'),
        }),
        new Talisman({
          skill1: getSkillById('agitator'),
          skill1Level: 2,
          slots: getSlotsById('2-1-0'),
        }),
      ]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [],
        skill1NotFound: [],
        skill1LevelIsEmpty: [],
        skill1LevelExceedsMaximum: [],
        skill2IsEmpty: [],
        skill2NotFound: [],
        skill2LevelIsEmpty: [],
        skill2LevelExceedsMaximum: [],
        slotsNotFound: [],
      });
    });

    it('import invalid talismans', () => {
      const { talismansToImport, errorsFromImport } = useTalismanImport(''
        + ',1,Weakness Exploit,1,0,0,0\r\n'
        + 'Speed,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Speed Sharpening,1,,1,0,0,0\r\n'
        + 'Speed Sharpening,1,Exploit,1,0,0,0\r\n'
        + 'Speed Sharpening,1,Weakness Exploit,4,0,0,0\r\n'
        + 'Master Mounter,,Slugger,1,1,1,0\r\n'
        + 'Master Mounter,1,Slugger,,1,1,0\r\n'
        + 'Master Mounter,8,Slugger,1,1,1,0\r\n'
        + 'Agitator,2,,,4,4,4');
      expect(talismansToImport.value).toStrictEqual([]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [{
          skill1: null, skill1Level: 1, skill2: 'Weakness Exploit', skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill1NotFound: [{
          skill1: 'Speed', skill1Level: 1, skill2: 'Weakness Exploit', skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill1LevelIsEmpty: [{
          skill1: 'Master Mounter', skill1Level: null, skill2: 'Slugger', skill2Level: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill1LevelExceedsMaximum: [{
          skill1: 'Master Mounter', skill1Level: 8, skill2: 'Slugger', skill2Level: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill2IsEmpty: [{
          skill1: 'Speed Sharpening', skill1Level: 1, skill2: null, skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill2NotFound: [{
          skill1: 'Speed Sharpening', skill1Level: 1, skill2: 'Exploit', skill2Level: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        skill2LevelIsEmpty: [{
          skill1: 'Master Mounter', skill1Level: 1, skill2: 'Slugger', skill2Level: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill2LevelExceedsMaximum: [{
          skill1: 'Speed Sharpening', skill1Level: 1, skill2: 'Weakness Exploit', skill2Level: 4, slot1: 0, slot2: 0, slot3: 0,
        }],
        slotsNotFound: [{
          skill1: 'Agitator', skill1Level: 2, skill2: null, skill2Level: null, slot1: 4, slot2: 4, slot3: 4,
        }],
      });
    });

    it('import mixed valid and invalid talismans', () => {
      const { talismansToImport, errorsFromImport } = useTalismanImport(''
        + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Master Mounter,1,Slugger,,1,1,0\r\n'
        + 'Agitator,2,,,4,4,4');
      expect(talismansToImport.value).toStrictEqual([
        new Talisman({
          skill1: getSkillById('speed-sharpening'),
          skill1Level: 1,
          skill2: getSkillById('weakness-exploit'),
          skill2Level: 1,
          slots: getSlotsById('0-0-0'),
        })]);
      expect(errorsFromImport.value).toStrictEqual({
        skill1IsEmpty: [],
        skill1NotFound: [],
        skill1LevelIsEmpty: [],
        skill1LevelExceedsMaximum: [],
        skill2IsEmpty: [],
        skill2NotFound: [],
        skill2LevelIsEmpty: [{
          skill1: 'Master Mounter', skill1Level: 1, skill2: 'Slugger', skill2Level: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        skill2LevelExceedsMaximum: [],
        slotsNotFound: [{
          skill1: 'Agitator', skill1Level: 2, skill2: null, skill2Level: null, slot1: 4, slot2: 4, slot3: 4,
        }],
      });
    });
  });
});
