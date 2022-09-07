import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import AppMenuLink from 'components/AppMenuLink.vue';
import { i18n } from 'boot/i18n';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/AppMenu', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(AppMenuLink, {
      props: {
        title: 'my custom title',
      },
    });

    expect(vm.title).toBe('my custom title');
    expect(vm.link).toBe('#');
    expect(vm.icon).toBe('');
    expect(vm.separator).toBeFalsy();
  });
});
