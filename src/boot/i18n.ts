import { boot } from 'quasar/wrappers';
// TODO: VOir si une autre méthodologie est possible
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createI18n } from 'app/node_modules/vue-i18n/dist/vue-i18n.esm-bundler';

import messages from 'src/i18n';

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'fr',
  availableLocales: ['en', 'fr'],
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
