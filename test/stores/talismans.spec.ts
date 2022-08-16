import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { useTalismanStore } from 'stores/talismans';
import { initFakeTimers } from 'app/test/mocks';
import { Talisman } from 'src/models/talisman';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';

initFakeTimers();

jest.mock('boot/i18n');

describe('stores/talismans', () => {
  let talisman: Talisman = new Talisman({});

  beforeEach(() => {
    setActivePinia(createPinia());
    const { getSkillById } = useSkillStore();
    const { getSlotsById } = useSlotsStore();
    talisman = new Talisman({
      skill1: getSkillById('capture-master'),
      skill1Level: 1,
      skill2: getSkillById('hunger-resistance'),
      skill2Level: 2,
      slots: getSlotsById('2-1-0'),
    });
  });

  it('add a new Talisman', () => {
    const talismanStore = useTalismanStore();
    expect(talismanStore.talismans.length).toBe(0);

    talismanStore.addTalisman(talisman);

    expect(talismanStore.talismans.length).toBe(1);
    expect(talismanStore.talismans).toStrictEqual([talisman]);
  });

  it('delete a Talisman', () => {
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);

    expect(talismanStore.talismans).toStrictEqual([talisman]);
    expect(talismanStore.talismans.length).toBe(1);

    talismanStore.deleteTalisman(talismanStore.talismans[0]);

    expect(talismanStore.talismans).toStrictEqual([]);
    expect(talismanStore.talismans.length).toBe(0);
  });

  it('toggle favorite on a Talisman with favorite at false and forMelding at false', () => {
    const { getSkillById } = useSkillStore();
    const { getSlotsById } = useSlotsStore();
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field favorite will be true and forMelding will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      skill1: getSkillById('capture-master'),
      skill1Level: 1,
      skill2: getSkillById('hunger-resistance'),
      skill2Level: 2,
      slots: getSlotsById('2-1-0'),
      favorite: true,
    }));
  });

  it('toggle favorite on a Talisman with favorite at true and forMelding at false', () => {
    const { getSkillById } = useSkillStore();
    const { getSlotsById } = useSlotsStore();
    const talismanStore = useTalismanStore();
    talisman.favorite = true;
    talismanStore.talismans.push(talisman);
    // field favorite will be false and forMelding will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      skill1: getSkillById('capture-master'),
      skill1Level: 1,
      skill2: getSkillById('hunger-resistance'),
      skill2Level: 2,
      slots: getSlotsById('2-1-0'),
    }));
  });

  it('toggle favorite on a Talisman with favorite at false and forMelding at true', () => {
    const { getSkillById } = useSkillStore();
    const { getSlotsById } = useSlotsStore();
    const talismanStore = useTalismanStore();
    talisman.forMelding = true;
    talismanStore.talismans.push(talisman);
    // field favorite will be true and forMelding will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      skill1: getSkillById('capture-master'),
      skill1Level: 1,
      skill2: getSkillById('hunger-resistance'),
      skill2Level: 2,
      slots: getSlotsById('2-1-0'),
      favorite: true,
    }));
  });

  it('toggle forMelding on a Talisman with forMelding at false and favorite at false', () => {
    const { getSkillById } = useSkillStore();
    const { getSlotsById } = useSlotsStore();
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field forMelding will be true and favorite will be false
    talismanStore.toggleForMelding(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      skill1: getSkillById('capture-master'),
      skill1Level: 1,
      skill2: getSkillById('hunger-resistance'),
      skill2Level: 2,
      slots: getSlotsById('2-1-0'),
      forMelding: true,
    }));
  });

  it('toggle forMelding on a Talisman with forMelding at true and favorite at false', () => {
    const { getSkillById } = useSkillStore();
    const { getSlotsById } = useSlotsStore();
    const talismanStore = useTalismanStore();
    talisman.forMelding = true;
    talismanStore.talismans.push(talisman);
    // field forMelding will be false and favorite will be false
    talismanStore.toggleForMelding(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      skill1: getSkillById('capture-master'),
      skill1Level: 1,
      skill2: getSkillById('hunger-resistance'),
      skill2Level: 2,
      slots: getSlotsById('2-1-0'),
    }));
  });

  it('toggle forMelding on a Talisman with forMelding at false and favorite at true', () => {
    const { getSkillById } = useSkillStore();
    const { getSlotsById } = useSlotsStore();
    const talismanStore = useTalismanStore();
    talisman.favorite = true;
    talismanStore.talismans.push(talisman);
    // field forMelding will be true and favorite will be false
    talismanStore.toggleForMelding(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      skill1: getSkillById('capture-master'),
      skill1Level: 1,
      skill2: getSkillById('hunger-resistance'),
      skill2Level: 2,
      slots: getSlotsById('2-1-0'),
      forMelding: true,
    }));
  });

  it('clear all data', () => {
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    talismanStore.talismans.push(talisman);

    expect(talismanStore.talismans).toStrictEqual([talisman, talisman]);
    expect(talismanStore.talismans.length).toBe(2);

    talismanStore.clear();

    expect(talismanStore.talismans).toStrictEqual([]);
    expect(talismanStore.talismans.length).toBe(0);
  });
});
