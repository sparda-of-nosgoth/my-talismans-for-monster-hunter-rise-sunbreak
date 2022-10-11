import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import SettingsClearData from 'components/SettingsClearData.vue';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';
import { useTalismanStore } from 'stores/talismans';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/SettingsClearData', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

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

  it('can clear data from stores', async () => {
    const { vm } = mount(SettingsClearData, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: {
              talismans: [
                new Talisman({
                  primarySkillId: 'speed-sharpening',
                  primarySkillLevel: 1,
                  secondarySkillId: 'weakness-exploit',
                  secondarySkillLevel: 1,
                }),
                new Talisman({
                  primarySkillId: 'bubbly-dance',
                  primarySkillLevel: 1,
                  slotsId: '2-2-1',
                  favorite: true,
                }),
                new Talisman({
                  primarySkillId: 'agitator',
                  primarySkillLevel: 2,
                  slotsId: '2-1-0',
                  favorite: true,
                }),
                new Talisman({
                  primarySkillId: 'master-mounter',
                  primarySkillLevel: 1,
                  secondarySkillId: 'slugger',
                  secondarySkillLevel: 1,
                  slotsId: '1-1-0',
                }),
              ],
            },
          },
          stubActions: false,
        })],
      },
    });
    const talismanStore = useTalismanStore();

    expect(typeof vm.clearAllData).toBe('function');
    expect(talismanStore.talismans).toHaveLength(4);
    vm.clearAllData();
    expect(talismanStore.talismans).toHaveLength(0);
  });
});
