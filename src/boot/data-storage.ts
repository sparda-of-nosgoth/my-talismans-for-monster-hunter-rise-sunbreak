import { boot } from 'quasar/wrappers';
import { initSettingsStorage, initTalismansStorage } from 'src/utils/data-storage';

export default boot(async () => {
  initSettingsStorage()
    .then(() => initTalismansStorage());
});
