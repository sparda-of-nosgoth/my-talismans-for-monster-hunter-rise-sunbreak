import { useTalismanStore } from 'stores/talismans';
import _each from 'lodash/each';
import { Talisman } from 'src/models/talisman';
import localforage from 'localforage';

export default function initLocalStorageForTalismanStore() {
  const talismanStore = useTalismanStore();

  /**
   * Convert parsed string to Talismans
   * @param value
   */
  function toTalismans(value: string | null) {
    talismanStore.clear();
    _each(JSON.parse(value || '[]'), (data) => {
      talismanStore.talismans.push(new Talisman({ ...data }));
    });
  }

  // Load cache for Talisman's list
  localforage.getItem<string>('mhrs-talismans')
    .then((value) => toTalismans(value));

  // Talisman store subscriber to save each modification in cache
  talismanStore.$onAction(({ after }) => {
    after(() => {
      localforage.setItem('mhrs-talismans', JSON.stringify(talismanStore.talismans));
    });
  });
}
