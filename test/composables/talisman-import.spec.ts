import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { TranslateOptions } from '@intlify/core-base';
import _now from 'lodash/now';
import { useTalismanImport } from 'src/composables/talisman-import';
import { ref } from 'vue';
import { i18nMocked } from 'app/test/mocks/i18n';

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => i18nMocked.global.t(key, defaultMsg, options)),
    },
  },
}));

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

describe('composables/talisman-import', () => {
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
      {
        id: _now(),
        skill1: {
          id: 92,
          name: 'speed-sharpening',
          type: 7,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill1Level: 1,
        skill2: {
          id: 84,
          name: 'weakness-exploit',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 1,
        slots: {
          id: 1,
          slot1: 0,
          slot2: 0,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 73,
          name: 'master-mounter',
          type: 6,
          levelMaximum: 1,
          foundOnTalismans: true,
        },
        skill1Level: 1,
        skill2: {
          id: 82,
          name: 'slugger',
          type: 6,
          levelMaximum: 3,
          foundOnTalismans: true,
        },
        skill2Level: 1,
        slots: {
          id: 3,
          slot1: 1,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
      {
        id: _now(),
        skill1: {
          id: 60,
          name: 'agitator',
          type: 6,
          levelMaximum: 5,
          foundOnTalismans: true,
        },
        skill1Level: 2,
        skill2: null,
        skill2Level: null,
        slots: {
          id: 6,
          slot1: 2,
          slot2: 1,
          slot3: 0,
        },
        favorite: false,
        forMelting: false,
      },
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
        skill1: null,
        skill1Level: 1,
        skill2: 'Weakness Exploit',
        skill2Level: 1,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      }],
      skill1NotFound: [{
        skill1: 'Speed',
        skill1Level: 1,
        skill2: 'Weakness Exploit',
        skill2Level: 1,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      }],
      skill1LevelIsEmpty: [{
        skill1: 'Master Mounter',
        skill1Level: null,
        skill2: 'Slugger',
        skill2Level: 1,
        slot1: 1,
        slot2: 1,
        slot3: 0,
      }],
      skill1LevelExceedsMaximum: [{
        skill1: 'Master Mounter',
        skill1Level: 8,
        skill2: 'Slugger',
        skill2Level: 1,
        slot1: 1,
        slot2: 1,
        slot3: 0,
      }],
      skill2IsEmpty: [{
        skill1: 'Speed Sharpening',
        skill1Level: 1,
        skill2: null,
        skill2Level: 1,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      }],
      skill2NotFound: [{
        skill1: 'Speed Sharpening',
        skill1Level: 1,
        skill2: 'Exploit',
        skill2Level: 1,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      }],
      skill2LevelIsEmpty: [{
        skill1: 'Master Mounter',
        skill1Level: 1,
        skill2: 'Slugger',
        skill2Level: null,
        slot1: 1,
        slot2: 1,
        slot3: 0,
      }],
      skill2LevelExceedsMaximum: [{
        skill1: 'Speed Sharpening',
        skill1Level: 1,
        skill2: 'Weakness Exploit',
        skill2Level: 4,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      }],
      slotsNotFound: [{
        skill1: 'Agitator',
        skill1Level: 2,
        skill2: null,
        skill2Level: null,
        slot1: 4,
        slot2: 4,
        slot3: 4,
      }],
    });
  });

  it('import mixed valid and invalid talismans', async () => {
    await updateCsv(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,,1,1,0\r\n'
      + 'Agitator,2,,,4,4,4');
    expect(talismansToImport.value).toStrictEqual([{
      id: _now(),
      skill1: {
        id: 92,
        name: 'speed-sharpening',
        type: 7,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill1Level: 1,
      skill2: {
        id: 84,
        name: 'weakness-exploit',
        type: 6,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 1,
      slots: {
        id: 1,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    }]);
    expect(errorsFromImport.value).toStrictEqual({
      skill1IsEmpty: [],
      skill1NotFound: [],
      skill1LevelIsEmpty: [],
      skill1LevelExceedsMaximum: [],
      skill2IsEmpty: [],
      skill2NotFound: [],
      skill2LevelIsEmpty: [{
        skill1: 'Master Mounter',
        skill1Level: 1,
        skill2: 'Slugger',
        skill2Level: null,
        slot1: 1,
        slot2: 1,
        slot3: 0,
      }],
      skill2LevelExceedsMaximum: [],
      slotsNotFound: [{
        skill1: 'Agitator',
        skill1Level: 2,
        skill2: null,
        skill2Level: null,
        slot1: 4,
        slot2: 4,
        slot3: 4,
      }],
    });
  });
});
