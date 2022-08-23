import {
  describe, expect, it, jest,
} from '@jest/globals';
import { TalismanFilter, useTalismanFilter } from 'src/composables/talisman-filter';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';

jest.mock('boot/i18n');

describe('composables/talisman', () => {
  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  const allTalismans = [
    new Talisman({
      skill1: getSkillById('weakness-exploit'),
      skill1Level: 2,
      slots: getSlotsById('2-1-0'),
    }),
    new Talisman({
      skill1: getSkillById('attack-boost'),
      skill1Level: 2,
      skill2: getSkillById('slugger'),
      skill2Level: 1,
      slots: getSlotsById('1-1-0'),
    }),
    new Talisman({
      skill1: getSkillById('speed-sharpening'),
      skill1Level: 1,
      skill2: getSkillById('weakness-exploit'),
      skill2Level: 1,
      slots: getSlotsById('0-0-0'),
      favorite: true,
    }),
    new Talisman({
      skill1: getSkillById('master-mounter'),
      skill1Level: 1,
      skill2: getSkillById('slugger'),
      skill2Level: 1,
      slots: getSlotsById('1-1-0'),
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
    // Find with a Skill name translated in French
    filter.search = 'Mise à mort';
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[0], allTalismans[2]]);
    // Find with a Skill name translated in English
    filter.search = 'Weakness Exploit';
    expect(filterTalismans(allTalismans, filter)).toStrictEqual([allTalismans[0], allTalismans[2]]);
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
  });
});
