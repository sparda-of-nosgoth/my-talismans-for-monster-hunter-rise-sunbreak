import { useSettingsStore } from 'stores/settings';
import localforage from 'localforage';
import { i18n } from 'boot/i18n';
import { useTalismanStore } from 'stores/talismans';
import { Talisman } from 'src/models/talisman';
import _now from 'lodash/now';
import {
  synchronizeData,
  updateTalismansFromRemoteStorage,
} from 'src/utils/remote-storage';
import _map from 'lodash/map';

export interface TalismansStorage {
  talismans: Talisman[],
  updatedAt: number | null,
}

export async function initSettingsStorage() {
  const settings = useSettingsStore();

  // Load cache for settings
  const localSettings = JSON.parse(await localforage.getItem<string>('mhrs-settings') || '{}');
  // Initialize locale settings
  if (localSettings.locale) {
    settings.locale = localSettings.locale;
    i18n.global.locale.localSettings = settings.locale;
  }
  // Initialize remote save settings
  if (localSettings.remoteSave) {
    settings.remoteSave.account = localSettings.remoteSave.account;
    settings.remoteSave.enabled = localSettings.remoteSave.enabled;
    settings.remoteSave.sheetId = localSettings.remoteSave.sheetId;
  }

  // Settings store subscriber to save each modification in cache
  settings.$onAction(({ after }) => {
    after(() => {
      localforage.setItem('mhrs-settings', JSON.stringify(settings.$state));
    });
  });
}

export async function initTalismansStorage() {
  const settings = useSettingsStore();
  const talismanStore = useTalismanStore();

  // Load local save for Talisman's list
  const localStorage = JSON.parse(await localforage.getItem<string>('mhrs-talismans') || '{ "talismans": [] }');
  // Convert parsed string to Talismans
  talismanStore.talismans = _map(localStorage.talismans, (talisman) => new Talisman(talisman));

  // If Remote Save is enabled, we sync data
  if (settings.remoteSave.enabled) {
    await synchronizeData();
  }

  // Talisman store subscriber to save each modification in cache
  talismanStore.$onAction(({ after }) => {
    after(() => {
      const talismans = JSON.stringify({
        talismans: talismanStore.talismans,
        updatedAt: _now(),
      });

      localforage.setItem('mhrs-talismans', talismans);

      if (settings.remoteSave.enabled) {
        // TODO: catch error ?
        updateTalismansFromRemoteStorage(talismans);
      }
    });
  });
}
