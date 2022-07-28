import {
  describe, expect, it, jest,
} from '@jest/globals';
import { TranslateOptions } from '@intlify/core-base';
import { useTalismanExport } from 'src/composables/talisman-export';
import _now from 'lodash/now';

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => {
        switch (key) {
          case 'agitator':
            return options.locale === 'fr' ? 'Témérité' : 'Agitator';
          case 'master-mounter':
            return options.locale === 'fr' ? 'Maître-cavalier' : 'Master Mounter';
          case 'slugger':
            return options.locale === 'fr' ? 'Cogneur' : 'Slugger';
          case 'weakness-exploit':
            return options.locale === 'fr' ? 'Mise à mort' : 'Weakness Exploit';
          case 'speed-sharpening':
            return options.locale === 'fr' ? 'Maître capture' : 'Speed Sharpening';
          default:
            return defaultMsg;
        }
      }),
    },
  },
}));

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

describe('composables/talisman-export', () => {
  it('export an empty talisman list', () => {
    const { exportedTalismans } = useTalismanExport([]);
    expect(exportedTalismans.value).toBe('');
  });

  it('export a talismans list', () => {
    const { exportedTalismans } = useTalismanExport([
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

    expect(exportedTalismans.value).toBe(''
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0\r\n'
      + 'Agitator,2,,,2,1,0');
  });
});
