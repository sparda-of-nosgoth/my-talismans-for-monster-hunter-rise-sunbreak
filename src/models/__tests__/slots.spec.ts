import { describe, expect, it } from '@jest/globals';
import { getSlotsById, getSlotsBySlot } from 'src/models/slots';

describe('models/slots', () => {
  it('can get Slots by id', () => {
    expect(getSlotsById('0-0-0')).toStrictEqual(
      {
        id: '0-0-0', slot1: 0, slot2: 0, slot3: 0,
      },
    );
    expect(getSlotsById('1-1-1')).toStrictEqual(
      {
        id: '1-1-1', slot1: 1, slot2: 1, slot3: 1,
      },
    );
    expect(getSlotsById('2-2-1')).toStrictEqual(
      {
        id: '2-2-1', slot1: 2, slot2: 2, slot3: 1,
      },
    );

    // Don't find
    expect(getSlotsById('4-4-4')).toBeFalsy();
  });

  it('can get Slots by each slot', () => {
    expect(getSlotsBySlot(0, 0, 0)).toStrictEqual(
      {
        id: '0-0-0', slot1: 0, slot2: 0, slot3: 0,
      },
    );
    expect(getSlotsBySlot(1, 1, 1)).toStrictEqual(
      {
        id: '1-1-1', slot1: 1, slot2: 1, slot3: 1,
      },
    );
    expect(getSlotsBySlot(2, 2, 1)).toStrictEqual(
      {
        id: '2-2-1', slot1: 2, slot2: 2, slot3: 1,
      },
    );

    // Don't find
    expect(getSlotsBySlot(3, 2, 2)).toBeFalsy();
    expect(getSlotsBySlot(4, 4, 4)).toBeFalsy();
  });
});
