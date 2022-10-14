import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { useMeldingFilter } from 'src/composables/talisman-filter-melding';
import { Talisman } from 'src/models/talisman';

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/i18n');

describe('composables/talisman-filter-melding', () => {
  let talismans: Talisman[] = [];

  beforeEach(() => {
    talismans = [
      // #1: To melt, no secondarySkill, no slot, useless
      new Talisman({
        primarySkillId: 'evade-extender',
        primarySkillLevel: 2,
      }),
      // #2: To melt, good, but we had a better talisman with those skills #3
      new Talisman({
        primarySkillId: 'evade-extender',
        primarySkillLevel: 1,
        secondarySkillId: 'evade-window',
        secondarySkillLevel: 2,
        slotsId: '2-2-0',
      }),
      // #3: To keep, very good one
      new Talisman({
        primarySkillId: 'evade-extender',
        primarySkillLevel: 2,
        secondarySkillId: 'evade-window',
        secondarySkillLevel: 2,
        slotsId: '3-2-1',
      }),
      // #4: To melt, good primarySkill, but no secondarySkill
      new Talisman({
        primarySkillId: 'weakness-exploit',
        primarySkillLevel: 2,
        slotsId: '2-2-0',
      }),
      // #5: To keep, good one
      new Talisman({
        primarySkillId: 'weakness-exploit',
        primarySkillLevel: 1,
        secondarySkillId: 'attack-boost',
        secondarySkillLevel: 1,
        slotsId: '2-1-0',
      }),
      // #6: To melt, not good, skills mixed between swordsman and gunner
      new Talisman({
        primarySkillId: 'razor-sharp',
        primarySkillLevel: 1,
        secondarySkillId: 'ammo-up',
        secondarySkillLevel: 1,
        slotsId: '1-1-0',
      }),
      // #7: To melt, not good, skills mixed between swordsman and gunner
      new Talisman({
        primarySkillId: 'ammo-up',
        primarySkillLevel: 1,
        secondarySkillId: 'razor-sharp',
        secondarySkillLevel: 2,
        slotsId: '2-1-1',
      }),
      // #8: To melt, can be better
      new Talisman({
        primarySkillId: 'fire-attack',
        primarySkillLevel: 1,
        secondarySkillId: 'ice-attack',
        secondarySkillLevel: 1,
        slotsId: '1-1-0',
      }),
      // #9: To melt, good, but we had better
      new Talisman({
        primarySkillId: 'fire-attack',
        primarySkillLevel: 2,
        secondarySkillId: 'ice-attack',
        secondarySkillLevel: 1,
        slotsId: '2-1-0',
      }),
      // #10: To keep if skipFavorite = true, else to melt because we had better
      new Talisman({
        primarySkillId: 'fire-attack',
        primarySkillLevel: 2,
        secondarySkillId: 'ice-attack',
        secondarySkillLevel: 2,
        slotsId: '2-0-0',
        favorite: true,
      }),
      // #11: To keep, very good one
      new Talisman({
        primarySkillId: 'fire-attack',
        primarySkillLevel: 3,
        secondarySkillId: 'ice-attack',
        secondarySkillLevel: 2,
        slotsId: '1-1-1',
      }),
      // #12: To melt, tagged has forMelding
      new Talisman({
        primarySkillId: 'botanist',
        primarySkillLevel: 2,
        secondarySkillId: 'jump-master',
        secondarySkillLevel: 1,
        slotsId: '2-1-1',
        forMelding: true,
      }),
      // #13: To keep, good one
      new Talisman({
        primarySkillId: 'evade-extender',
        primarySkillLevel: 3,
        secondarySkillId: 'razor-sharp',
        secondarySkillLevel: 1,
        slotsId: '2-2-0',
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
