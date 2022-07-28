import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import TalismanManagerForm from 'components/TalismanManagerForm.vue';
import { piniaMocked } from 'app/test/mocks/pinia';
import { TranslateOptions } from '@intlify/core-base';
import _now from 'lodash/now';
import { i18nMocked } from '../mocks/i18n';

installQuasarPlugin();

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => i18nMocked.global.t(key, defaultMsg, options)),
    },
  },
}));

jest.mock('localforage', () => ({
  getItem: jest.fn(() => new Promise((resolve, reject) => { reject(null); })),
  setItem: jest.fn((key, value) => new Promise((resolve) => { resolve(value); })),
}));

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

describe('components/TalismanManagerForm', () => {
  config.global.mocks.$t = i18nMocked.global.t;
  config.global.plugins = [...config.global.plugins, i18nMocked];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(vm.talisman).toStrictEqual({
      id: _now(),
      skill1: null,
      skill1Level: 1,
      skill2: null,
      skill2Level: 0,
      slots: {
        slot1: 0,
        slot2: 0,
        slot3: 0,
      },
      favorite: false,
      forMelting: false,
    });
  });

  it('has a function to submit Talisman', () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(typeof vm.onSubmit).toBe('function');
  });

//  TODO: test emit created, and errors display
});
