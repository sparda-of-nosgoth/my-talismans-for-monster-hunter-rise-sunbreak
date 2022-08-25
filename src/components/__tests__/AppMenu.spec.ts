import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import AppMenu from 'components/AppMenu.vue';
import SettingsClearData from 'components/SettingsClearData.vue';
import SettingsLocaleSelector from 'components/SettingsLocaleSelector.vue';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/AppMenu', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('display settings section', () => {
    const wrapper = mount(AppMenu, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const localeSelector = wrapper.getComponent(SettingsLocaleSelector);
    expect(localeSelector).toBeTruthy();
    const clearData = wrapper.getComponent(SettingsClearData);
    expect(clearData).toBeTruthy();
  });
});
