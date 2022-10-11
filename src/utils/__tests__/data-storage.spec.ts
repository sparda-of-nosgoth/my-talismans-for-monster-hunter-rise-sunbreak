import {
  afterEach,
  describe, expect, it, jest,
} from '@jest/globals';
import localforage from 'localforage';
import { config } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { i18n } from 'boot/i18n';
import { createPinia, setActivePinia } from 'pinia';
import { useSettingsStore } from 'stores/settings';
import { initSettingsStorage, initTalismansStorage } from 'src/utils/data-storage';
import { useTalismanStore } from 'stores/talismans';
import { Talisman } from 'src/models/talisman';
import _now from 'lodash/now';
import {
  synchronizeData,
  updateTalismansFromRemoteStorage,
} from 'src/utils/remote-storage';

installQuasarPlugin();

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/config');
jest.mock('boot/google-api');
jest.mock('boot/google-signin');
jest.mock('boot/i18n');
jest.mock('localforage');
jest.mock('localforage');
jest.mock('src/utils/remote-storage', () => ({
  synchronizeData: jest.fn(),
  updateTalismansFromRemoteStorage: jest.fn(),
}));

describe('utils/data-storage', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const settings = useSettingsStore();
  const talismanStore = useTalismanStore();

  afterEach(() => {
    settings.$reset();
    talismanStore.$reset();
    jest.clearAllMocks();
  });

  describe('settings storage', () => {
    it('when no data is stored in cache, load default state on store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__('');
      await initSettingsStorage();
      expect(settings.locale).toBe('fr');
      expect(settings.remoteSave).toStrictEqual({
        account: '',
        enabled: false,
        sheetId: '',
      });
    });

    it('when data is stored in cache, load cached settings to store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__(JSON.stringify({
        locale: 'en',
        remoteSave: {
          account: 'test@gmail.com',
          enabled: true,
          sheetId: '132423',
        },
      }));
      await initSettingsStorage();
      expect(settings.locale).toBe('en');
      expect(settings.remoteSave).toStrictEqual({
        account: 'test@gmail.com',
        enabled: true,
        sheetId: '132423',
      });
    });

    it('when store update his data with an action, data is stored in cache', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__(JSON.stringify({
        locale: 'en',
        remoteSave: {
          account: 'test@gmail.com',
          enabled: true,
          sheetId: '132423',
        },
      }));
      await initSettingsStorage();
      settings.updateLocale('fr');
      expect(localforage.setItem).toHaveBeenLastCalledWith('mhrs-settings', JSON.stringify({
        locale: 'fr',
        remoteSave: {
          account: 'test@gmail.com',
          enabled: true,
          sheetId: '132423',
        },
      }));
      settings.disableRemoteSave();
      expect(localforage.setItem).toHaveBeenLastCalledWith('mhrs-settings', JSON.stringify({
        locale: 'fr',
        remoteSave: {
          account: '',
          enabled: false,
          sheetId: '',
        },
      }));
    });
  });

  describe('talismans storage', () => {
    const allTalismans = [
      new Talisman({
        primarySkillId: 'weakness-exploit',
        primarySkillLevel: 2,
        slotsId: '2-1-0',
      }),
      new Talisman({
        primarySkillId: 'attack-boost',
        primarySkillLevel: 2,
        secondarySkillId: 'slugger',
        secondarySkillLevel: 1,
        slotsId: '1-1-0',
      }),
      new Talisman({
        primarySkillId: 'speed-sharpening',
        primarySkillLevel: 1,
        secondarySkillId: 'weakness-exploit',
        secondarySkillLevel: 1,
        slotsId: '0-0-0',
        favorite: true,
      }),
      new Talisman({
        primarySkillId: 'master-mounter',
        primarySkillLevel: 1,
        secondarySkillId: 'slugger',
        secondarySkillLevel: 1,
        slotsId: '1-1-0',
        forMelding: true,
      }),
    ];

    it('when no data is stored in cache, load empty cache to store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__('');
      await initTalismansStorage();
      expect(talismanStore.talismans).toStrictEqual([]);
    });

    it('when data is stored in cache, load cached talismans to store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__(JSON.stringify({ talismans: allTalismans, updatedAt: _now() }));
      await initTalismansStorage();
      expect(talismanStore.talismans).toStrictEqual(allTalismans);
    });

    it('when store update his data with an action, data is stored in cache', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__('');
      await initTalismansStorage();
      const newTalisman = new Talisman({
        primarySkillId: 'weakness-exploit',
        primarySkillLevel: 2,
        slotsId: '2-1-0',
      });
      talismanStore.addTalisman(newTalisman);
      expect(localforage.setItem).toHaveBeenLastCalledWith('mhrs-talismans', JSON.stringify({ talismans: [newTalisman], updatedAt: _now() }));
    });

    it('if remote data is enable, synchronize data', async () => {
      settings.remoteSave.enabled = true;
      await initTalismansStorage();
      expect(synchronizeData).toHaveBeenCalled();
    });

    it('if remote data is enable, when store update his data with an action, data is stored in remote', async () => {
      settings.remoteSave.enabled = true;
      await initTalismansStorage();
      const newTalisman = new Talisman({
        primarySkillId: 'weakness-exploit',
        primarySkillLevel: 2,
        slotsId: '2-1-0',
      });
      talismanStore.addTalisman(newTalisman);
      expect(updateTalismansFromRemoteStorage).toHaveBeenCalled();
    });
  });
});
