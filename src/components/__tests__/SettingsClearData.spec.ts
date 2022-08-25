import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import SettingsClearData from 'components/SettingsClearData.vue';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/SettingsClearData', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  it('show confirm dialog to warn user', () => {
    const { vm } = shallowMount(SettingsClearData, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(typeof vm.showConfirmDialog).toBe('function');
    expect(vm.confirmDialog).toBeFalsy();
    vm.showConfirmDialog();
    expect(vm.confirmDialog).toBeTruthy();
  });

  it('can clear data from stores', () => {
    const { vm } = shallowMount(SettingsClearData, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    vm.talismanStore.addTalisman(new Talisman({
      skill1: getSkillById('speed-sharpening'),
      skill1Level: 1,
      skill2: getSkillById('weakness-exploit'),
      skill2Level: 1,
      slots: getSlotsById('0-0-0'),
    }));
    vm.talismanStore.addTalisman(new Talisman({
      skill1: getSkillById('master-mounter'),
      skill1Level: 1,
      skill2: getSkillById('slugger'),
      skill2Level: 1,
      slots: getSlotsById('1-1-0'),
    }));
    vm.talismanStore.addTalisman(new Talisman({
      skill1: getSkillById('agitator'),
      skill1Level: 2,
      slots: getSlotsById('2-1-0'),
    }));
    expect(typeof vm.clearAllData).toBe('function');
    expect(vm.talismanStore.talismans).toHaveLength(3);
    vm.clearAllData();
    expect(vm.talismanStore.talismans).toHaveLength(0);
  });
});
