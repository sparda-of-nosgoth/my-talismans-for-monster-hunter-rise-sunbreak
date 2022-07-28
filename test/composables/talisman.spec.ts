import {
  describe, expect, it, jest,
} from '@jest/globals';
import { useTalisman } from 'src/composables/talisman';
import { TranslateOptions } from '@intlify/core-base';
import { i18nMocked } from 'app/test/mocks/i18n';
import { piniaMocked } from 'app/test/mocks/pinia';

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => i18nMocked.global.t(key, defaultMsg, options)),
    },
  },
}));

jest.mock('localforage', () => ({
  getItem: jest.fn(() => new Promise((resolve, reject) => { reject(null); })),
  setItem: jest.fn((key, value) => new Promise((resolve) => { resolve(value); })),
}));

jest.mock('stores/talismans', () => ({
  useTalismanStore: jest.fn(() => ({
    talismans: jest.fn(() => piniaMocked.state),
    $onAction: jest.fn(),
  })),
}));

describe('composables/talisman', () => {
  const talismans = [
    {
      id: 1658793600000,
      skill1: {
        id: 84,
        name: 'weakness-exploit',
        type: 6,
        levelMaximum: 3,
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
    {
      id: 1658793600000,
      skill1: {
        id: 36,
        name: 'attack-boost',
        type: 3,
        levelMaximum: 7,
        foundOnTalismans: true,
      },
      skill1Level: 2,
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
  ];

  it('has a function to filter Talisman by Skill name or by Slots', () => {
    const { filterTalismans } = useTalisman();
    // Find with a Skill name translated in French
    expect(filterTalismans(talismans, 'Mise à mort')).toStrictEqual([talismans[0]]);
    // Find with a Skill name translated in English
    expect(filterTalismans(talismans, 'Weakness Exploit')).toStrictEqual([talismans[0]]);
    // Find with a Slots
    expect(filterTalismans(talismans, '1-1-0')).toStrictEqual([talismans[1]]);
    // Find with a Slots
    expect(filterTalismans(talismans, '1-0')).toStrictEqual(talismans);
  });
});
