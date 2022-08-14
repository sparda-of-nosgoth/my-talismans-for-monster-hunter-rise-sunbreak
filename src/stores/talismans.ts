import { defineStore } from 'pinia';
import _findIndex from 'lodash/findIndex';
import _pull from 'lodash/pull';
import { Talisman } from 'src/models/talisman';

export const useTalismanStore = defineStore('talismans', {
  state: () => ({
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
      this.talismans[index].forMelting = this.talismans[index].favorite ? false : this.talismans[index].forMelting;
    },
    toggleForMelting(talisman: Talisman) {
      const index = _findIndex(this.talismans, talisman);
      this.talismans[index].forMelting = !talisman.forMelting;
      this.talismans[index].favorite = this.talismans[index].forMelting ? false : this.talismans[index].favorite;
    },
    clear() {
      this.$reset();
    },
  },
});
