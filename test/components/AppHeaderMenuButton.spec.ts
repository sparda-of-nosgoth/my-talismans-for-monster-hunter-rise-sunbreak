import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import AppHeaderMenuButton from 'components/AppHeaderMenuButton.vue';
import { useManagerStore } from 'stores/manager';
import { QBtn } from 'quasar';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/AppHeaderMenuButton', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('toggle drawers.showSettings value when button is clicked', async () => {
    const wrapper = shallowMount(AppHeaderMenuButton, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: {
              drawers: {
                showSettings: false,
              },
            },
          },
          stubActions: false,
        })],
      },
    });
    const { drawers } = useManagerStore();

    expect(drawers.showSettings).toBeFalsy();
    const button = wrapper.getComponent(QBtn);
    await button.trigger('click');
    expect(drawers.showSettings).toBeTruthy();
    await button.trigger('click');
    expect(drawers.showSettings).toBeFalsy();
  });
});
