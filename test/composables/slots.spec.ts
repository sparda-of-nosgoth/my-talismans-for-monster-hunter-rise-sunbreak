import { describe, expect, it } from '@jest/globals';
import { useSlots } from 'src/composables/slots';

describe('composables/slots', () => {
  it('has a function to find Slots by slot', () => {
    const { findSlotsBySlot } = useSlots();
    expect(findSlotsBySlot(0, 0, 0)).toStrictEqual(
      {
        id: 1,
        slot1: 0,
        slot2: 0,
        slot3: 0,
      },
    );
    expect(findSlotsBySlot(1, 1, 1)).toStrictEqual(
      {
        id: 4,
        slot1: 1,
        slot2: 1,
        slot3: 1,
      },
    );
    expect(findSlotsBySlot(2, 2, 1)).toStrictEqual(
      {
        id: 9,
        slot1: 2,
        slot2: 2,
        slot3: 1,
      },
    );
  });
});
