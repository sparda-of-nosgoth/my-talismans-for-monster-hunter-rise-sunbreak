import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import AppHeaderTitle from 'components/AppHeaderTitle.vue';
import { QBadge, QToolbarTitle } from 'quasar';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/AppHeaderTitle', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('display application name in header', async () => {
    const wrapper = mount(AppHeaderTitle, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const toolbarTitle = wrapper.findComponent(QToolbarTitle);
    expect(toolbarTitle.vm.$el.textContent).toContain('Mes talismans');
  });

  it('display talismans number in a badge', async () => {
    const wrapper = mount(AppHeaderTitle, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: {
              filteredTalismans: 18,
            },
          },
        })],
      },
    });

    const badge = wrapper.getComponent(QBadge);
    expect(badge.vm.$el.textContent).toContain(18);
  });

  it('doesn\'t display badge if talismans number is 0', async () => {
    const wrapper = mount(AppHeaderTitle, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: {
              filteredTalismans: 0,
            },
          },
        })],
      },
    });

    const badge = wrapper.findComponent(QBadge);
    expect(badge.exists()).toBeFalsy();
  });
});
