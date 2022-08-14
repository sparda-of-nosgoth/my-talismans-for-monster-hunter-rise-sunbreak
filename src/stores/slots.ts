import { defineStore } from 'pinia';
import _find from 'lodash/find';
import _cloneDeep from 'lodash/cloneDeep';
import { slotsList } from '../models/slots';

export const useSlotsStore = defineStore('slots', {
  state: () => ({
    slots: slotsList,
  }),

  getters: {
    getSlotsById: (state) => (id: string) => _cloneDeep(_find(state.slots, { id })),
    getSlotsBySlot: (state) => (slot1: number, slot2: number, slot3: number) => _cloneDeep(_find(state.slots, { slot1, slot2, slot3 })),
  },
});
