import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import { QSelect } from 'quasar';
import SettingsLocaleSelector from 'components/SettingsLocaleSelector.vue';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/SettingsLocaleSelector', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const { vm } = mount(SettingsLocaleSelector, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.locale).toBe('fr');
    expect(vm.availableLocales).toStrictEqual(['en', 'fr']);
  });

  it('can change i18n locale when a value is selected', async () => {
    const wrapper = shallowMount(SettingsLocaleSelector, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const { vm } = wrapper;

    expect(i18n.global.locale.value).toBe('fr');
    expect(vm.locale).toBe('fr');
    expect(vm.settings.locale).toBe('fr');
    const select = wrapper.getComponent(QSelect);
    await select.setValue('en');
    expect(i18n.global.locale.value).toBe('en');
    expect(vm.locale).toBe('en');
    expect(vm.settings.locale).toBe('en');
  });
});
