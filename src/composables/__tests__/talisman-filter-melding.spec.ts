import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { useMeldingFilter } from 'src/composables/talisman-filter-melding';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/i18n');

describe('composables/talisman-filter-melding', () => {
  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  let talismans: Talisman[] = [];

  beforeEach(() => {
    talismans = [
      // #1: To melt, no skill2, no slot, useless
      new Talisman({
        skill1: getSkillById('evade-extender'),
        skill1Level: 2,
      }),
      // #2: To melt, good, but we had a better talisman with those skills #3
      new Talisman({
        skill1: getSkillById('evade-extender'),
        skill1Level: 1,
        skill2: getSkillById('evade-window'),
        skill2Level: 2,
        slots: getSlotsById('2-2-0'),
      }),
      // #3: To keep, very good one
      new Talisman({
        skill1: getSkillById('evade-extender'),
        skill1Level: 2,
        skill2: getSkillById('evade-window'),
        skill2Level: 2,
        slots: getSlotsById('3-2-1'),
      }),
      // #4: To melt, good skill1, but no skill2
      new Talisman({
        skill1: getSkillById('weakness-exploit'),
        skill1Level: 2,
        slots: getSlotsById('2-2-0'),
      }),
      // #5: To keep, good one
      new Talisman({
        skill1: getSkillById('weakness-exploit'),
        skill1Level: 1,
        skill2: getSkillById('attack-boost'),
        skill2Level: 1,
        slots: getSlotsById('2-1-0'),
      }),
      // #6: To melt, not good, skills mixed between swordsman and gunner
      new Talisman({
        skill1: getSkillById('razor-sharp'),
        skill1Level: 1,
        skill2: getSkillById('ammo-up'),
        skill2Level: 1,
        slots: getSlotsById('1-1-0'),
      }),
      // #7: To melt, not good, skills mixed between swordsman and gunner
      new Talisman({
        skill1: getSkillById('ammo-up'),
        skill1Level: 1,
        skill2: getSkillById('razor-sharp'),
        skill2Level: 2,
        slots: getSlotsById('2-1-1'),
      }),
      // #8: To melt, can be better
      new Talisman({
        skill1: getSkillById('fire-attack'),
        skill1Level: 1,
        skill2: getSkillById('ice-attack'),
        skill2Level: 1,
        slots: getSlotsById('1-1-0'),
      }),
      // #9: To melt, good, but we had better
      new Talisman({
        skill1: getSkillById('fire-attack'),
        skill1Level: 2,
        skill2: getSkillById('ice-attack'),
        skill2Level: 1,
        slots: getSlotsById('2-1-0'),
      }),
      // #10: To keep if skipFavorite = true, else to melt because we had better
      new Talisman({
        skill1: getSkillById('fire-attack'),
        skill1Level: 2,
        skill2: getSkillById('ice-attack'),
        skill2Level: 2,
        slots: getSlotsById('2-0-0'),
        favorite: true,
      }),
      // #11: To keep, very good one
      new Talisman({
        skill1: getSkillById('fire-attack'),
        skill1Level: 3,
        skill2: getSkillById('ice-attack'),
        skill2Level: 2,
        slots: getSlotsById('1-1-1'),
      }),
      // #12: To melt, tagged has forMelding
      new Talisman({
        skill1: getSkillById('botanist'),
        skill1Level: 2,
        skill2: getSkillById('jump-master'),
        skill2Level: 1,
        slots: getSlotsById('2-1-1'),
        forMelding: true,
      }),
      // #13: To keep, good one
      new Talisman({
        skill1: getSkillById('evade-extender'),
        skill1Level: 3,
        skill2: getSkillById('razor-sharp'),
        skill2Level: 1,
        slots: getSlotsById('2-2-0'),
      }),
    ];
  });

  it('apply melding filter with skipFavorite at false', () => {
    const { applyMeldingFilter } = useMeldingFilter(talismans, { skipFavorite: false });
    const talismansToMelt = applyMeldingFilter();
    expect(talismansToMelt).toStrictEqual([
      talismans[0],
      talismans[1],
      talismans[3],
      talismans[5],
      talismans[6],
      talismans[7],
      talismans[8],
      talismans[9],
      talismans[11],
    ]);
  });

  it('apply melding filter with skipFavorite at true', () => {
    const { applyMeldingFilter } = useMeldingFilter(talismans, { skipFavorite: true });
    const talismansToMelt = applyMeldingFilter();
    expect(talismansToMelt).toStrictEqual([
      talismans[0],
      talismans[1],
      talismans[3],
      talismans[5],
      talismans[6],
      talismans[7],
      talismans[8],
      talismans[11],
    ]);
  });
});