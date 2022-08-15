import { boot } from 'quasar/wrappers';
import initLocalStorageForSettingsStore from '../utils/local-storage-settings';
import initLocalStorageForTalismanStore from '../utils/local-storage-talismans';

export default boot(async () => {
  initLocalStorageForSettingsStore();
  initLocalStorageForTalismanStore();
});
