import {
  afterEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { createPinia, setActivePinia } from 'pinia';
import localforage from 'localforage';
import { config, flushPromises } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { i18n } from 'boot/i18n';
import initLocalStorageForSettingsStore from 'src/utils/local-storage-settings';
import { useSettingsStore } from 'stores/settings';

installQuasarPlugin();

jest.mock('boot/i18n');
jest.mock('localforage');

describe('utils/local-storage-settings', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const settingsStore = useSettingsStore();

  afterEach(() => {
    settingsStore.$reset();
    jest.clearAllMocks();
  });

  describe('when no data is stored in cache', () => {
    it('load empty cache to store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__('');
      initLocalStorageForSettingsStore();
      await flushPromises();
      expect(settingsStore.locale).toStrictEqual('fr');
    });
  });

  describe('when data is stored in cache', () => {
    it('load cached settings to store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__(JSON.stringify({ locale: 'en' }));
      initLocalStorageForSettingsStore();
      await flushPromises();
      expect(settingsStore.locale).toStrictEqual('en');
    });
  });

  describe('when store update his data with an action', () => {
    it('data is stored in cache', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__(JSON.stringify({ locale: 'en' }));
      initLocalStorageForSettingsStore();
      await flushPromises();
      settingsStore.updateLocale('fr');
      expect(localforage.setItem).toHaveBeenCalledWith('mhrs-settings', JSON.stringify({ locale: 'fr' }));
    });
  });
});
