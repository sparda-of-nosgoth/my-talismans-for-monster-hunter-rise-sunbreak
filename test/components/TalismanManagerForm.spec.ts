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

  it('has a function to filter skills', async () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(typeof vm.filterSkills).toBe('function');
    const updateMock = jest.fn((callback: () => void) => callback());
    await vm.filterSkills('Cha', updateMock);
    await vm.$nextTick();
    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(vm.sortedSkills).toStrictEqual([{
      id: 107, levelMaximum: 4, name: 'chameleos-blessing', type: 9, foundOnTalismans: false,
    }, {
      id: 7, levelMaximum: 3, name: 'good-luck', type: 1, foundOnTalismans: true,
    }, {
      id: 87, levelMaximum: 2, name: 'load-shells', type: 7, foundOnTalismans: true,
    }, {
      id: 100, levelMaximum: 3, name: 'reload-speed', type: 8, foundOnTalismans: true,
    }]);
  });

  it('has a function to submit Talisman', () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(typeof vm.onSubmit).toBe('function');
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('filter skills list when a needle is typed in q-select', async () => {
  //   // TODO: Test with cypress
  // });

//  TODO: test emit created, and errors display
});
