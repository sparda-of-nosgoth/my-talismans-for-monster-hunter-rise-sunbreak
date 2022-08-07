import messages from 'src/i18n';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'fr',
  availableLocales: ['en', 'fr'],
  messages,
});

export { i18n };
