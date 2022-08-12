import {
  describe, expect, it, jest,
} from '@jest/globals';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import localforage from 'localforage';
import { config, shallowMount } from '@vue/test-utils';
import TalismanManager from 'pages/TalismanManager.vue';
import { createTestingPinia } from '@pinia/testing';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { i18n } from 'boot/i18n';

installQuasarPlugin();

jest.mock('localforage');

jest.mock('boot/i18n');

describe('composables/local-forage', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

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
      forMelting: true,
    }),
  ];

  it('when component if mounted, load cached talismans to store', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    localforage.__setMockData__(JSON.stringify(allTalismans));
    const { vm } = shallowMount(TalismanManager, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    await vm.$nextTick();
    expect(vm.talismanStore.talismans).toStrictEqual(allTalismans);
  });

  it('when component if mounted, load empty cache to store', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    localforage.__setMockData__('');
    const { vm } = shallowMount(TalismanManager, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    await vm.$nextTick();
    expect(vm.talismanStore.talismans).toStrictEqual([]);
  });
});
