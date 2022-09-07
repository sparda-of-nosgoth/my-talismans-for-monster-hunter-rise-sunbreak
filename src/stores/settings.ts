import { defineStore } from 'pinia';

interface RemoteSaveSettings {
  account: string;
  enabled: boolean;
  sheetId: string;
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    locale: 'fr',
    remoteSave: {
      account: '',
      enabled: false,
      sheetId: '',
    } as RemoteSaveSettings,
  }),
  actions: {
    enableRemoteSave({ account, sheetId } : { account: string, sheetId: string }) {
      this.remoteSave.enabled = true;
      this.remoteSave.account = account;
      this.remoteSave.sheetId = sheetId;
    },
    disableRemoteSave() {
      this.remoteSave.enabled = false;
      this.remoteSave.account = '';
      this.remoteSave.sheetId = '';
    },
    updateLocale(locale: string) {
      this.locale = locale;
    },
  },
});
