import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import AppLayout from 'layouts/AppLayout.vue';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('layouts/AppLayout', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(AppLayout, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ['router-view'],
      },
    });

    expect(vm.dialogs.showHelp).toBeFalsy();
    expect(vm.dialogs.showTalismanForm).toBeFalsy();
    expect(vm.drawers.showSettings).toBeFalsy();
  });
});
