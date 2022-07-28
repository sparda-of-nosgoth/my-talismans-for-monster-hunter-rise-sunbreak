import { boot } from 'quasar/wrappers';

export default boot(async ({ app }) => {
  app.config.globalProperties.$appVersion = import.meta.env.PACKAGE_VERSION;
});
