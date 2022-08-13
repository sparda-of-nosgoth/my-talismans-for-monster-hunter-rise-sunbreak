import { useTalismanStore } from 'stores/talismans';
import { onMounted } from 'vue';
import * as localforage from 'localforage';
import { Talisman } from 'src/models/talisman';
import _each from 'lodash/each';

export function useLocalStorage() {
  const talismanStore = useTalismanStore();

  /**
   * Convert parsed string to Talismans
   * @param value
   */
  function toTalismans(value: string | null) {
    talismanStore.$reset();
    _each(JSON.parse(value || '[]'), (data) => {
      talismanStore.talismans.push(new Talisman({ ...data }));
    });
  }

  // Load cache for Talisman's list
  onMounted(() => {
    localforage.getItem<string>('mhrs-talismans')
      .then((value) => toTalismans(value))
      .catch(() => null/* TODO catch error, use notify ? */);
  });

  // Store subscriber to save each modification in cache
  talismanStore.$onAction(({ after }) => {
    after(() => {
      localforage.setItem('mhrs-talismans', JSON.stringify(talismanStore.talismans))
        .catch(() => null/* TODO catch error, use notify ? */);
    });
  });
}
