import {
  describe, expect, it, jest,
} from '@jest/globals';
import { TalismanFilter, useTalismanFilter } from 'src/composables/talisman-filter';
import { Talisman } from 'src/models/talisman';

jest.mock('boot/i18n');

describe('composables/talisman', () => {
  const allTalismans = [
    new Talisman({
      primarySkillId: 'weakness-exploit',
      primarySkillLevel: 2,
      slotsId: '2-1-0',
    }),
    new Talisman({
      primarySkillId: 'attack-boost',
      primarySkillLevel: 2,
      secondarySkillId: 'slugger',
      secondarySkillLevel: 1,
      slotsId: '1-1-0',
    }),
    new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
      slotsId: '0-0-0',
      favorite: true,
    }),
    new Talisman({
      primarySkillId: 'master-mounter',
      primarySkillLevel: 1,
      secondarySkillId: 'slugger',
      secondarySkillLevel: 1,
      slotsId: '1-1-0',
      forMelding: true,
    }),
  ];

  it('can filter Talisman with different options', () => {
    const { filterTalismans } = useTalismanFilter();
    const filter: TalismanFilter = {
      search: '',
      showFavorite: false,
      showMeldingFilter: false,
      options: {
        meldingFilter: {
          skipFavorite: true,
        },
      },
    };
    // Find with a Skill name translated in current locale (French)
    filter.search = 'Mise à mort';
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[0], allTalismans[2]]);
    // Find with a Skill name translated in English (Disabled) TODO: maybe return has an option
    // filter.search = 'Weakness Exploit';
    // expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[0], allTalismans[2]]);
    // Find with a Slots
    filter.search = '1-1-0';
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[1], allTalismans[3]]);
    // Find with a Slots
    filter.search = '1-0';
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[0], allTalismans[1], allTalismans[3]]);
    // Find with favorite filter to true
    filter.search = '';
    filter.showFavorite = true;
    filter.showMeldingFilter = false;
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[2]]);
    // Find with multiples filters
    filter.search = '1-0';
    filter.showFavorite = true;
    filter.showMeldingFilter = false;
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([]);
    // Show Melding Filter result
    filter.search = '';
    filter.showFavorite = false;
    filter.showMeldingFilter = true;
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[0], allTalismans[3]]);
    // Show Melding Filter result with other filters
    filter.search = '1-1';
    filter.showMeldingFilter = true;
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[3]]);
    // Find result with combined search filters
    filter.search = 'Mise à mort, 2-1';
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[0]]);
  });
});
