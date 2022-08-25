import {
  afterEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import localforage from 'localforage';
import { config, flushPromises } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { useTalismanStore } from 'stores/talismans';
import { i18n } from 'boot/i18n';
import initLocalStorageForTalismanStore from 'src/utils/local-storage-talismans';

installQuasarPlugin();

jest.mock('boot/i18n');
jest.mock('localforage');

describe('utils/local-storage-talismans', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();
  const talismanStore = useTalismanStore();

  const allTalismans = [
    new Talisman({
      skill1: getSkillById('weakness-exploit'),
      skill1Level: 2,
      slots: getSlotsById('2-1-0'),
    }),
    new Talisman({
      skill1: getSkillById('attack-boost'),
      skill1Level: 2,
      skill2: getSkillById('slugger'),
      skill2Level: 1,
      slots: getSlotsById('1-1-0'),
    }),
    new Talisman({
      skill1: getSkillById('speed-sharpening'),
      skill1Level: 1,
      skill2: getSkillById('weakness-exploit'),
      skill2Level: 1,
      slots: getSlotsById('0-0-0'),
      favorite: true,
    }),
    new Talisman({
      skill1: getSkillById('master-mounter'),
      skill1Level: 1,
      skill2: getSkillById('slugger'),
      skill2Level: 1,
      slots: getSlotsById('1-1-0'),
      forMelding: true,
    }),
  ];

  afterEach(() => {
    talismanStore.$reset();
    jest.clearAllMocks();
  });

  describe('when no data is stored in cache', () => {
    it('load empty cache to store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__('');
      initLocalStorageForTalismanStore();
      await flushPromises();
      expect(talismanStore.talismans).toStrictEqual([]);
    });
  });

  describe('when data is stored in cache', () => {
    it('load cached talismans to store', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__(JSON.stringify(allTalismans));
      initLocalStorageForTalismanStore();
      await flushPromises();
      expect(talismanStore.talismans).toStrictEqual(allTalismans);
    });
  });

  describe('when store update his data with an action', () => {
    it('data is stored in cache', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      localforage.__setMockData__('');
      initLocalStorageForTalismanStore();
      const newTalisman = new Talisman({
        skill1: getSkillById('weakness-exploit'),
        skill1Level: 2,
        slots: getSlotsById('2-1-0'),
      });
      talismanStore.addTalisman(newTalisman);
      expect(localforage.setItem).toHaveBeenCalledWith('mhrs-talismans', JSON.stringify([newTalisman]));
    });
  });
});
