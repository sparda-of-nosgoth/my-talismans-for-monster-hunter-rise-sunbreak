import { useSettingsStore } from 'stores/settings';
import localforage from 'localforage';
import { i18n } from 'boot/i18n';

export default function initLocalStorageForSettingsStore() {
  const settingsStore = useSettingsStore();

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

  // Settings store subscriber to save each modification in cache
  settingsStore.$onAction(({ after }) => {
    after(() => {
      localforage.setItem('mhrs-settings', JSON.stringify(settingsStore.$state));
    });
  });
}
