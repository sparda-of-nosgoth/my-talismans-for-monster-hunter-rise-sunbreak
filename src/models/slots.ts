import _find from 'lodash/find';

interface Slots {
  id: string
  slot1: number
  slot2: number
  slot3: number
}

const slotsList: Slots[] = [
  {
    id: '0-0-0',
    slot1: 0,
    slot2: 0,
    slot3: 0,
  },
  {
    id: '1-0-0',
    slot1: 1,
    slot2: 0,
    slot3: 0,
  },
  {
    id: '1-1-0',
    slot1: 1,
    slot2: 1,
    slot3: 0,
  },
  {
    id: '1-1-1',
    slot1: 1,
    slot2: 1,
    slot3: 1,
  },
  {
    id: '2-0-0',
    slot1: 2,
    slot2: 0,
    slot3: 0,
  },
  {
    id: '2-1-0',
    slot1: 2,
    slot2: 1,
    slot3: 0,
  },
  {
    id: '2-1-1',
    slot1: 2,
    slot2: 1,
    slot3: 1,
  },
  {
    id: '2-2-0',
    slot1: 2,
    slot2: 2,
    slot3: 0,
  },
  {
    id: '2-2-1',
    slot1: 2,
    slot2: 2,
    slot3: 1,
  },
  {
    id: '3-0-0',
    slot1: 3,
    slot2: 0,
    slot3: 0,
  },
  {
    id: '3-1-0',
    slot1: 3,
    slot2: 1,
    slot3: 0,
  },
  {
    id: '3-1-1',
    slot1: 3,
    slot2: 1,
    slot3: 1,
  },
  {
    id: '3-2-0',
    slot1: 3,
    slot2: 2,
    slot3: 0,
  },
  {
    id: '3-2-1',
    slot1: 3,
    slot2: 2,
    slot3: 1,
  },
  {
    id: '4-0-0',
    slot1: 4,
    slot2: 0,
    slot3: 0,
  },
];

// To get one slots by his id
const getSlotsById = (id: string) => _find(slotsList, { id });
// To get one slots by slot1, slot2 and slot3
const getSlotsBySlot = (slot1: number, slot2: number, slot3: number) => _find(slotsList, { slot1, slot2, slot3 });

export type { Slots };

export {
  getSlotsById, getSlotsBySlot,
};
