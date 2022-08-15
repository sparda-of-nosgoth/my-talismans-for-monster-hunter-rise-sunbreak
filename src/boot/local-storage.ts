import { useSettingsStore } from 'stores/settings';
import { useTalismanStore } from 'stores/talismans';
import * as localforage from 'localforage';
import { Talisman } from 'src/models/talisman';
import _each from 'lodash/each';
import { boot } from 'quasar/wrappers';
import { i18n } from 'boot/i18n';

export default boot(async () => {
  const talismanStore = useTalismanStore();
  const settingsStore = useSettingsStore();

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
  localforage.getItem<string>('mhrs-talismans')
    .then((value) => toTalismans(value));

  // Load cache for settings
  localforage.getItem<string>('mhrs-settings')
    .then((value) => JSON.parse(value || '{}'))
    .then((value) => {
      // Initialize locale settings
      if (value.locale) {
        settingsStore.locale = value.locale;
        i18n.global.locale.value = settingsStore.locale;
      }
    });

  // Talisman store subscriber to save each modification in cache
  talismanStore.$onAction(({ after }) => {
    after(() => {
      localforage.setItem('mhrs-talismans', JSON.stringify(talismanStore.talismans));
    });
  });

  // Settings store subscriber to save each modification in cache
  settingsStore.$onAction(({ after }) => {
    after(() => {
      localforage.setItem('mhrs-settings', JSON.stringify(settingsStore.$state));
    });
  });
});
