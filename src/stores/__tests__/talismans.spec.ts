import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import { useTalismanStore } from 'stores/talismans';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';

jest.mock('boot/i18n');

describe('stores/talismans', () => {
  let talisman: Talisman = new Talisman({});

  beforeEach(() => {
    setActivePinia(createPinia());
    talisman = new Talisman({
      primarySkillId: 'capture-master',
      primarySkillLevel: 1,
      secondarySkillId: 'hunger-resistance',
      secondarySkillLevel: 2,
      slotsId: '2-1-0',
    });
  });

  it('add a new Talisman', () => {
    const talismanStore = useTalismanStore();
    expect(talismanStore.talismans).toHaveLength(0);

    talismanStore.addTalisman(talisman);

    expect(talismanStore.talismans).toHaveLength(1);
    expect(talismanStore.talismans).toStrictEqual([talisman]);
  });

  it('add many Talismans', () => {
    const talismanStore = useTalismanStore();
    expect(talismanStore.talismans).toHaveLength(0);

    talismanStore.addTalismans([talisman, talisman]);

    expect(talismanStore.talismans).toHaveLength(2);
    expect(talismanStore.talismans).toStrictEqual([talisman, talisman]);
  });

  it('delete a Talisman', () => {
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);

    expect(talismanStore.talismans).toStrictEqual([talisman]);
    expect(talismanStore.talismans).toHaveLength(1);

    talismanStore.deleteTalisman(talismanStore.talismans[0]);

    expect(talismanStore.talismans).toStrictEqual([]);
    expect(talismanStore.talismans).toHaveLength(0);
  });

  it('toggle favorite on a Talisman with favorite at false and forMelding at false', () => {
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field favorite will be true and forMelding will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      primarySkillId: 'capture-master',
      primarySkillLevel: 1,
      secondarySkillId: 'hunger-resistance',
      secondarySkillLevel: 2,
      slotsId: '2-1-0',
      favorite: true,
    }));
  });

  it('toggle favorite on a Talisman with favorite at true and forMelding at false', () => {
    const talismanStore = useTalismanStore();
    talisman.favorite = true;
    talismanStore.talismans.push(talisman);
    // field favorite will be false and forMelding will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      primarySkillId: 'capture-master',
      primarySkillLevel: 1,
      secondarySkillId: 'hunger-resistance',
      secondarySkillLevel: 2,
      slotsId: '2-1-0',
    }));
  });

  it('toggle favorite on a Talisman with favorite at false and forMelding at true', () => {
    const talismanStore = useTalismanStore();
    talisman.forMelding = true;
    talismanStore.talismans.push(talisman);
    // field favorite will be true and forMelding will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      primarySkillId: 'capture-master',
      primarySkillLevel: 1,
      secondarySkillId: 'hunger-resistance',
      secondarySkillLevel: 2,
      slotsId: '2-1-0',
      favorite: true,
    }));
  });

  it('toggle forMelding on a Talisman with forMelding at false and favorite at false', () => {
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field forMelding will be true and favorite will be false
    talismanStore.toggleForMelding(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      primarySkillId: 'capture-master',
      primarySkillLevel: 1,
      secondarySkillId: 'hunger-resistance',
      secondarySkillLevel: 2,
      slotsId: '2-1-0',
      forMelding: true,
    }));
  });

  it('toggle forMelding on a Talisman with forMelding at true and favorite at false', () => {
    const talismanStore = useTalismanStore();
    talisman.forMelding = true;
    talismanStore.talismans.push(talisman);
    // field forMelding will be false and favorite will be false
    talismanStore.toggleForMelding(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      primarySkillId: 'capture-master',
      primarySkillLevel: 1,
      secondarySkillId: 'hunger-resistance',
      secondarySkillLevel: 2,
      slotsId: '2-1-0',
    }));
  });

  it('toggle forMelding on a Talisman with forMelding at false and favorite at true', () => {
    const talismanStore = useTalismanStore();
    talisman.favorite = true;
    talismanStore.talismans.push(talisman);
    // field forMelding will be true and favorite will be false
    talismanStore.toggleForMelding(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual(new Talisman({
      primarySkillId: 'capture-master',
      primarySkillLevel: 1,
      secondarySkillId: 'hunger-resistance',
      secondarySkillLevel: 2,
      slotsId: '2-1-0',
      forMelding: true,
    }));
  });

  it('load new talismans', () => {
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    talismanStore.talismans.push(talisman);

    expect(talismanStore.talismans).toStrictEqual([talisman, talisman]);
    expect(talismanStore.talismans).toHaveLength(2);

    talismanStore.loadTalismans([talisman, talisman, talisman]);

    expect(talismanStore.talismans).toStrictEqual([talisman, talisman, talisman]);
    expect(talismanStore.talismans).toHaveLength(3);
  });

  it('clear all data', () => {
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    talismanStore.talismans.push(talisman);

    expect(talismanStore.talismans).toStrictEqual([talisman, talisman]);
    expect(talismanStore.talismans).toHaveLength(2);

    talismanStore.clear();

    expect(talismanStore.talismans).toStrictEqual([]);
    expect(talismanStore.talismans).toHaveLength(0);
  });
});
