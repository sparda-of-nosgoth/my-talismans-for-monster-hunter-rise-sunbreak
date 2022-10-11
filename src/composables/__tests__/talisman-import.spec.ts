import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { useTalismanImport } from 'src/composables/talisman-import';
import { ref } from 'vue';
import { Talisman } from 'src/models/talisman';

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/i18n');

describe('composables/talisman-import', () => {
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
        primarySkillIsEmpty: [],
        primarySkillNotFound: [],
        primarySkillLevelIsEmpty: [],
        primarySkillLevelExceedsMaximum: [],
        secondarySkillIsEmpty: [],
        secondarySkillNotFound: [],
        secondarySkillLevelIsEmpty: [],
        secondarySkillLevelExceedsMaximum: [],
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
          primarySkillId: 'speed-sharpening',
          primarySkillLevel: 1,
          secondarySkillId: 'weakness-exploit',
          secondarySkillLevel: 1,
          slotsId: '0-0-0',
        }),
        new Talisman({
          primarySkillId: 'master-mounter',
          primarySkillLevel: 1,
          secondarySkillId: 'slugger',
          secondarySkillLevel: 1,
          slotsId: '1-1-0',
        }),
        new Talisman({
          primarySkillId: 'agitator',
          primarySkillLevel: 2,
          slotsId: '2-1-0',
        }),
      ]);
      expect(errorsFromImport.value).toStrictEqual({
        primarySkillIsEmpty: [],
        primarySkillNotFound: [],
        primarySkillLevelIsEmpty: [],
        primarySkillLevelExceedsMaximum: [],
        secondarySkillIsEmpty: [],
        secondarySkillNotFound: [],
        secondarySkillLevelIsEmpty: [],
        secondarySkillLevelExceedsMaximum: [],
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
        primarySkillIsEmpty: [{
          primarySkillName: null, primarySkillLevel: 1, secondarySkillName: 'Weakness Exploit', secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        primarySkillNotFound: [{
          primarySkillName: 'Speed', primarySkillLevel: 1, secondarySkillName: 'Weakness Exploit', secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        primarySkillLevelIsEmpty: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: null, secondarySkillName: 'Slugger', secondarySkillLevel: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        primarySkillLevelExceedsMaximum: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: 8, secondarySkillName: 'Slugger', secondarySkillLevel: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        secondarySkillIsEmpty: [{
          primarySkillName: 'Speed Sharpening', primarySkillLevel: 1, secondarySkillName: null, secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        secondarySkillNotFound: [{
          primarySkillName: 'Speed Sharpening', primarySkillLevel: 1, secondarySkillName: 'Exploit', secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        secondarySkillLevelIsEmpty: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: 1, secondarySkillName: 'Slugger', secondarySkillLevel: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        secondarySkillLevelExceedsMaximum: [{
          primarySkillName: 'Speed Sharpening', primarySkillLevel: 1, secondarySkillName: 'Weakness Exploit', secondarySkillLevel: 4, slot1: 0, slot2: 0, slot3: 0,
        }],
        slotsNotFound: [{
          primarySkillName: 'Agitator', primarySkillLevel: 2, secondarySkillName: null, secondarySkillLevel: null, slot1: 4, slot2: 4, slot3: 4,
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
          primarySkillId: 'speed-sharpening',
          primarySkillLevel: 1,
          secondarySkillId: 'weakness-exploit',
          secondarySkillLevel: 1,
          slotsId: '0-0-0',
        })]);
      expect(errorsFromImport.value).toStrictEqual({
        primarySkillIsEmpty: [],
        primarySkillNotFound: [],
        primarySkillLevelIsEmpty: [],
        primarySkillLevelExceedsMaximum: [],
        secondarySkillIsEmpty: [],
        secondarySkillNotFound: [],
        secondarySkillLevelIsEmpty: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: 1, secondarySkillName: 'Slugger', secondarySkillLevel: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        secondarySkillLevelExceedsMaximum: [],
        slotsNotFound: [{
          primarySkillName: 'Agitator', primarySkillLevel: 2, secondarySkillName: null, secondarySkillLevel: null, slot1: 4, slot2: 4, slot3: 4,
        }],
      });
    });
  });

  describe('with a string', () => {
    it('import an empty string', () => {
      const { talismansToImport, errorsFromImport } = useTalismanImport('');
      expect(talismansToImport.value).toStrictEqual([]);
      expect(errorsFromImport.value).toStrictEqual({
        primarySkillIsEmpty: [],
        primarySkillNotFound: [],
        primarySkillLevelIsEmpty: [],
        primarySkillLevelExceedsMaximum: [],
        secondarySkillIsEmpty: [],
        secondarySkillNotFound: [],
        secondarySkillLevelIsEmpty: [],
        secondarySkillLevelExceedsMaximum: [],
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
          primarySkillId: 'speed-sharpening',
          primarySkillLevel: 1,
          secondarySkillId: 'weakness-exploit',
          secondarySkillLevel: 1,
          slotsId: '0-0-0',
        }),
        new Talisman({
          primarySkillId: 'master-mounter',
          primarySkillLevel: 1,
          secondarySkillId: 'slugger',
          secondarySkillLevel: 1,
          slotsId: '1-1-0',
        }),
        new Talisman({
          primarySkillId: 'agitator',
          primarySkillLevel: 2,
          slotsId: '2-1-0',
        }),
      ]);
      expect(errorsFromImport.value).toStrictEqual({
        primarySkillIsEmpty: [],
        primarySkillNotFound: [],
        primarySkillLevelIsEmpty: [],
        primarySkillLevelExceedsMaximum: [],
        secondarySkillIsEmpty: [],
        secondarySkillNotFound: [],
        secondarySkillLevelIsEmpty: [],
        secondarySkillLevelExceedsMaximum: [],
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
        primarySkillIsEmpty: [{
          primarySkillName: null, primarySkillLevel: 1, secondarySkillName: 'Weakness Exploit', secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        primarySkillNotFound: [{
          primarySkillName: 'Speed', primarySkillLevel: 1, secondarySkillName: 'Weakness Exploit', secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        primarySkillLevelIsEmpty: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: null, secondarySkillName: 'Slugger', secondarySkillLevel: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        primarySkillLevelExceedsMaximum: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: 8, secondarySkillName: 'Slugger', secondarySkillLevel: 1, slot1: 1, slot2: 1, slot3: 0,
        }],
        secondarySkillIsEmpty: [{
          primarySkillName: 'Speed Sharpening', primarySkillLevel: 1, secondarySkillName: null, secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        secondarySkillNotFound: [{
          primarySkillName: 'Speed Sharpening', primarySkillLevel: 1, secondarySkillName: 'Exploit', secondarySkillLevel: 1, slot1: 0, slot2: 0, slot3: 0,
        }],
        secondarySkillLevelIsEmpty: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: 1, secondarySkillName: 'Slugger', secondarySkillLevel: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        secondarySkillLevelExceedsMaximum: [{
          primarySkillName: 'Speed Sharpening', primarySkillLevel: 1, secondarySkillName: 'Weakness Exploit', secondarySkillLevel: 4, slot1: 0, slot2: 0, slot3: 0,
        }],
        slotsNotFound: [{
          primarySkillName: 'Agitator', primarySkillLevel: 2, secondarySkillName: null, secondarySkillLevel: null, slot1: 4, slot2: 4, slot3: 4,
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
          primarySkillId: 'speed-sharpening',
          primarySkillLevel: 1,
          secondarySkillId: 'weakness-exploit',
          secondarySkillLevel: 1,
          slotsId: '0-0-0',
        })]);
      expect(errorsFromImport.value).toStrictEqual({
        primarySkillIsEmpty: [],
        primarySkillNotFound: [],
        primarySkillLevelIsEmpty: [],
        primarySkillLevelExceedsMaximum: [],
        secondarySkillIsEmpty: [],
        secondarySkillNotFound: [],
        secondarySkillLevelIsEmpty: [{
          primarySkillName: 'Master Mounter', primarySkillLevel: 1, secondarySkillName: 'Slugger', secondarySkillLevel: null, slot1: 1, slot2: 1, slot3: 0,
        }],
        secondarySkillLevelExceedsMaximum: [],
        slotsNotFound: [{
          primarySkillName: 'Agitator', primarySkillLevel: 2, secondarySkillName: null, secondarySkillLevel: null, slot1: 4, slot2: 4, slot3: 4,
        }],
      });
    });
  });
});
