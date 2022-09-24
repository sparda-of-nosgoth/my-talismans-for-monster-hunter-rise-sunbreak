import { defineStore } from 'pinia';
import _concat from 'lodash/concat';
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
    addTalismans(talismans: Talisman[]) {
      this.talismans = _concat(this.talismans, talismans);
    },
    deleteTalisman(talisman: Talisman) {
      _pull(this.talismans, talisman);
    },
    toggleFavorite(talisman: Talisman) {
      const index = _findIndex(this.talismans, talisman);
      this.talismans[index].favorite = !talisman.favorite;
      this.talismans[index].forMelding = this.talismans[index].favorite ? false : this.talismans[index].forMelding;
    },
    toggleForMelding(talisman: Talisman) {
      const index = _findIndex(this.talismans, talisman);
      this.talismans[index].forMelding = !talisman.forMelding;
      this.talismans[index].favorite = this.talismans[index].forMelding ? false : this.talismans[index].favorite;
    },
    loadTalismans(talismans: Talisman[]) {
      this.talismans = talismans;
    },
    clear() {
      this.$reset();
    },
  },
});
