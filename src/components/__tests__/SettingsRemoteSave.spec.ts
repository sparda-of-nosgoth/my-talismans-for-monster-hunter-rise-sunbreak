import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import { i18n } from 'boot/i18n';
import SettingsRemoteSave from 'components/SettingsRemoteSave.vue';
import { createTestingPinia } from '@pinia/testing';
import { GoogleSignInButton } from 'vue3-google-signin';
import { QBtn } from 'quasar';
import { googleCredentials } from 'boot/google-api';

installQuasarPlugin();

jest.mock('boot/config');
jest.mock('boot/google-api');
jest.mock('boot/google-signin');
jest.mock('boot/i18n');

const notifyMocked = jest.fn();
// To notification, useQuasar needs to be mocked
jest.mock('quasar', () => {
  // Original functions and props, used to get normal use of Quasar, and mock only few functions.
  const original = jest.requireActual('quasar') as Record<string, unknown>;
  return {
    __esModule: true,
    ...original,
    useQuasar: jest.fn(() => ({
      notify: notifyMocked,
    })),
  };
});

describe('components/SettingsRemoteSave', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('show google sign-in button when remote save is not enable', () => {
    const wrapper = mount(SettingsRemoteSave, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const btn = wrapper.findComponent(QBtn);
    expect(btn.exists()).toBeFalsy();
    const googleSignInButton = wrapper.findComponent(GoogleSignInButton);
    expect(googleSignInButton.exists()).toBeTruthy();
  });

  it('show logout button when remote save is enable', () => {
    const wrapper = mount(SettingsRemoteSave, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            settings: {
              remoteSave: {
                enabled: true,
              },
            },
          },
        })],
      },
    });
    const btn = wrapper.findComponent(QBtn);
    expect(btn.exists()).toBeTruthy();
    const googleSignInButton = wrapper.findComponent(GoogleSignInButton);
    expect(googleSignInButton.exists()).toBeFalsy();
  });

  it('After a successful login, remote save is enabled', async () => {
    const { vm } = shallowMount(SettingsRemoteSave, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    await vm.handleOnSuccess({
      credential: 'credential_string',
    });
    expect(vm.settings.remoteSave).toStrictEqual({
      account: 'test_account@gmail.com',
      enabled: true,
      sheetId: '123456789',
    });
  });

  it('After a successful login, an error occurred when trying to enable remote save', async () => {
    googleCredentials.private_key = 'WRONG_PRIVATE_KEY';
    const { vm } = shallowMount(SettingsRemoteSave, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    await vm.handleOnSuccess({
      credential: 'credential_string',
    });
    expect(vm.settings.remoteSave).toStrictEqual({
      account: '',
      enabled: false,
      sheetId: '',
    });
  });

  it('notify user when an error occurred on login', () => {
    const { vm } = shallowMount(SettingsRemoteSave, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    vm.handleOnError();
    expect(notifyMocked).toHaveBeenCalledWith({
      message: 'Impossible de se connecter avec le compte Google',
      color: 'negative',
      icon: 'warning',
    });
  });
});
