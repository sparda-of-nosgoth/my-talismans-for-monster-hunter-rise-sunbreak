import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import AppVersion from 'components/AppVersion.vue';

installQuasarPlugin();

jest.mock('boot/config');

describe('components/AppVersion', () => {
  it('display current version', () => {
    const { vm } = shallowMount(AppVersion);

    expect(vm.$el.textContent).toContain('v1.0.0');
  });
});
