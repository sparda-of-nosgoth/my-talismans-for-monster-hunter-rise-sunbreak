import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import SettingsMenu from 'components/SettingsMenu.vue';
import SettingsClearData from 'components/SettingsClearData.vue';
import SettingsLocaleSelector from 'components/SettingsLocaleSelector.vue';
import SettingsRemoteSave from 'components/SettingsRemoteSave.vue';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

jest.mock('boot/config');
jest.mock('boot/google-api');
jest.mock('boot/google-signin');
jest.mock('boot/i18n');

describe('components/AppMenu', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('display settings section', () => {
    const wrapper = mount(SettingsMenu, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const localeSelector = wrapper.getComponent(SettingsLocaleSelector);
    expect(localeSelector).toBeTruthy();
    const remoteSave = wrapper.getComponent(SettingsRemoteSave);
    expect(remoteSave).toBeTruthy();
    const clearData = wrapper.getComponent(SettingsClearData);
    expect(clearData).toBeTruthy();
  });
});
