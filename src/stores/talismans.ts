import { defineStore } from 'pinia';
import { Talisman } from 'src/composables/talisman';
import _findIndex from 'lodash/findIndex';
import _pull from 'lodash/pull';

export const useTalismanStore = defineStore('talisman', {
  state: () => ({
    // @TODO: rename data or list ?
    talismans: [] as Talisman[],
  }),

  actions: {
    addTalisman(talisman: Talisman) {
      this.talismans.push(talisman);
    },
    deleteTalisman(talisman: Talisman) {
      _pull(this.talismans, talisman);
    },
    toggleFavorite(talisman: Talisman) {
      const index = _findIndex(this.talismans, talisman);
      this.talismans[index].favorite = !talisman.favorite;
      this.talismans[index].forMelting = !this.talismans[index].favorite;
    },
    toggleForMelting(talisman: Talisman) {
      const index = _findIndex(this.talismans, talisman);
      this.talismans[index].forMelting = !talisman.forMelting;
      this.talismans[index].favorite = !this.talismans[index].forMelting;
    },
  },
});
