import {
  describe, expect, it, jest,
} from '@jest/globals';
import { TalismanFilter, useTalisman } from 'src/composables/talisman';
import { TranslateOptions } from '@intlify/core-base';
import { i18nMocked } from 'app/test/mocks/i18n';
import { talismans } from 'app/test/mocks/models';

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
    talismans: jest.fn(() => talismans.allTalismans),
    $onAction: jest.fn(),
  })),
}));

describe('composables/talisman', () => {
  it('has a function to filter Talisman by Skill name or by Slots, and favorite or for melting', () => {
    const { filterTalismans } = useTalisman();
    const filter: TalismanFilter = {
      filterFavorite: false,
      filterForMelting: false,
      search: '',
    };
    // Find with a Skill name translated in French
    filter.search = 'Mise à mort';
    expect(filterTalismans(talismans.allTalismans, filter)).toStrictEqual([talismans.allTalismans[0], talismans.allTalismans[2]]);
    // Find with a Skill name translated in English
    filter.search = 'Weakness Exploit';
    expect(filterTalismans(talismans.allTalismans, filter)).toStrictEqual([talismans.allTalismans[0], talismans.allTalismans[2]]);
    // Find with a Slots
    filter.search = '1-1-0';
    expect(filterTalismans(talismans.allTalismans, filter)).toStrictEqual([talismans.allTalismans[1], talismans.allTalismans[3]]);
    // Find with a Slots
    filter.search = '1-0';
    expect(filterTalismans(talismans.allTalismans, filter)).toStrictEqual([talismans.allTalismans[0], talismans.allTalismans[1], talismans.allTalismans[3]]);
    // Find with favorite filter to true
    filter.search = '';
    filter.filterFavorite = true;
    filter.filterForMelting = false;
    expect(filterTalismans(talismans.allTalismans, filter)).toStrictEqual([talismans.allTalismans[2]]);
    // Find with forMelting filter to true
    filter.search = '';
    filter.filterFavorite = false;
    filter.filterForMelting = true;
    expect(filterTalismans(talismans.allTalismans, filter)).toStrictEqual([talismans.allTalismans[3]]);
    // Find with multiples filters
    filter.search = '1-0';
    filter.filterFavorite = true;
    filter.filterForMelting = false;
    expect(filterTalismans(talismans.allTalismans, filter)).toStrictEqual([]);
  });
});
