import { ref } from 'vue';
import _find from 'lodash/find';

export interface Slots {
  id?: number
  slot1: number
  slot2: number
  slot3: number
}

export function useSlots() {
  const slots = ref<Slots[]>([
    {
      id: 1,
      slot1: 0,
      slot2: 0,
      slot3: 0,
    },
    {
      id: 2,
      slot1: 1,
      slot2: 0,
      slot3: 0,
    },
    {
      id: 3,
      slot1: 1,
      slot2: 1,
      slot3: 0,
    },
    {
      id: 4,
      slot1: 1,
      slot2: 1,
      slot3: 1,
    },
    {
      id: 5,
      slot1: 2,
      slot2: 0,
      slot3: 0,
    },
    {
      id: 6,
      slot1: 2,
      slot2: 1,
      slot3: 0,
    },
    {
      id: 7,
      slot1: 2,
      slot2: 1,
      slot3: 1,
    },
    {
      id: 8,
      slot1: 2,
      slot2: 2,
      slot3: 0,
    },
    {
      id: 9,
      slot1: 2,
      slot2: 2,
      slot3: 1,
    },
    {
      id: 10,
      slot1: 3,
      slot2: 0,
      slot3: 0,
    },
    {
      id: 11,
      slot1: 3,
      slot2: 1,
      slot3: 0,
    },
    {
      id: 12,
      slot1: 3,
      slot2: 1,
      slot3: 1,
    },
    {
      id: 13,
      slot1: 3,
      slot2: 2,
      slot3: 0,
    },
    {
      id: 14,
      slot1: 3,
      slot2: 2,
      slot3: 1,
    },
  ]);

  function findSlotsBySlot(slot1: number, slot2: number, slot3: number): Slots|undefined {
    return _find(slots.value, { slot1, slot2, slot3 });
  }

  return { slots, findSlotsBySlot };
}
