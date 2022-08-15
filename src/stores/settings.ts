import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    locale: 'fr',
  }),
  actions: {
    updateLocale(locale: string) {
      this.locale = locale;
    },
  },
});
