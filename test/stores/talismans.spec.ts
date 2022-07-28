import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import { useTalismanStore } from 'stores/talismans';
import _now from 'lodash/now';

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

describe('stores/talismans', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('add a new Talisman', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    };
    const talismanStore = useTalismanStore();
    expect(talismanStore.talismans.length).toBe(0);
    talismanStore.addTalisman(talisman);
    expect(talismanStore.talismans.length).toBe(1);
    expect(talismanStore.talismans).toStrictEqual([talisman]);
  });

  it('delete a Talisman', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    };
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    expect(talismanStore.talismans).toStrictEqual([talisman]);
    expect(talismanStore.talismans.length).toBe(1);
    talismanStore.deleteTalisman(talismanStore.talismans[0]);
    expect(talismanStore.talismans).toStrictEqual([]);
    expect(talismanStore.talismans.length).toBe(0);
  });

  it('toggle favorite on a Talisman with favorite at false and forMelting at false', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    };
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field favorite will be true and forMelting will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual({
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: true,
      forMelting: false,
    });
  });

  it('toggle favorite on a Talisman with favorite at true and forMelting at false', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: true,
      forMelting: false,
    };
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field favorite will be false and forMelting will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual({
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    });
  });

  it('toggle favorite on a Talisman with favorite at false and forMelting at true', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: true,
    };
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field favorite will be true and forMelting will be false
    talismanStore.toggleFavorite(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual({
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: true,
      forMelting: false,
    });
  });

  it('toggle forMelting on a Talisman with forMelting at false and favorite at false', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    };
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field forMelting will be true and favorite will be false
    talismanStore.toggleForMelting(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual({
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: true,
    });
  });

  it('toggle forMelting on a Talisman with forMelting at true and favorite at false', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: true,
    };
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field forMelting will be false and favorite will be false
    talismanStore.toggleForMelting(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual({
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    });
  });

  it('toggle forMelting on a Talisman with forMelting at false and favorite at true', () => {
    const talisman = {
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: true,
      forMelting: false,
    };
    const talismanStore = useTalismanStore();
    talismanStore.talismans.push(talisman);
    // field forMelting will be true and favorite will be false
    talismanStore.toggleForMelting(talisman);
    expect(talismanStore.talismans[0]).toStrictEqual({
      id: _now(),
      skill1: {
        id: 3,
        name: 'Capture Master',
        type: 1,
        levelMaximum: 1,
        foundOnTalismans: false,
      },
      skill1Level: 1,
      skill2: {
        id: 8,
        name: 'Spartiate',
        type: 1,
        levelMaximum: 3,
        foundOnTalismans: true,
      },
      skill2Level: 2,
      slots: {
        id: 6,
        slot1: 2,
        slot2: 1,
        slot3: 0,
      },
      favorite: false,
      forMelting: true,
    });
  });
});
