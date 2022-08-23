import { defineStore } from 'pinia';

export const useManagerStore = defineStore('manager', {
  state: () => ({
    filteredTalismans: 0,
    filters: {
      search: '',
      showFavorite: false,
      showMeldingFilter: false,
      options: {
        meldingFilter: {
          skipFavorite: true,
        },
      },
    },
    dialogs: {
      showHelp: false,
      showImportExport: false,
      showTalismanForm: false,
    },
    drawers: {
      showSettings: false,
    },
  }),
  actions: {
    toggleHelp() {
      this.dialogs.showHelp = !this.dialogs.showHelp;
    },
    toggleImportExport() {
      this.dialogs.showImportExport = !this.dialogs.showImportExport;
    },
    toggleSettings() {
      this.drawers.showSettings = !this.drawers.showSettings;
    },
    toggleTalismanForm() {
      this.dialogs.showTalismanForm = !this.dialogs.showTalismanForm;
    },
  },
});
