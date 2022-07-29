import {
  describe, expect, it,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import AppVersion from 'components/AppVersion.vue';

installQuasarPlugin();

describe('components/AppVersion', () => {
  it('display current version', () => {
    const { vm } = shallowMount(AppVersion, {
      global: {
        mocks: {
          $appVersion: '1.0.0',
        },
      },
    });

    expect(vm.$el.textContent).toContain('v1.0.0');
  });
});
