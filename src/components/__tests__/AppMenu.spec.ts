import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import AppMenu from 'components/AppMenu.vue';
import AppMenuLink from 'components/AppMenuLink.vue';
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

  it('display menu links', () => {
    const wrapper = mount(AppMenu, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const links = wrapper.findAllComponents(AppMenuLink);
    expect(links).toHaveLength(2);
    expect(links[0].vm.$props.title).toBe('menu.talisman_manager.label');
    expect(links[0].vm.$props.icon).toBe('img:icons/talisman_white.svg');
    expect(links[0].vm.$props.link).toBe('/');
    expect(links[0].vm.$props.separator).toBeFalsy();
    expect(links[1].vm.$props.title).toBe('menu.skills_translation.label');
    expect(links[1].vm.$props.icon).toBe('img:icons/skill.svg');
    expect(links[1].vm.$props.link).toBe('/skills/translation');
    expect(links[1].vm.$props.separator).toBeTruthy();
  });
});
