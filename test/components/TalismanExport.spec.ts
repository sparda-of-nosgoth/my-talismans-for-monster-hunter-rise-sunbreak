import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import TalismanExport from 'components/TalismanExport.vue';
import { TranslateOptions } from '@intlify/core-base';
import { i18nMocked } from 'app/test/mocks/i18n';
import { Notify, QInput } from 'quasar';
import { piniaMocked } from 'app/test/mocks/pinia';
import _now from 'lodash/now';

installQuasarPlugin({ plugins: { Notify } });

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exportFileMocked = jest.fn((...args) => false);
const notifyMocked = jest.fn();
// To test export to file and notification, exportFile and useQuasar needs to be mocked
jest.mock('quasar', () => {
  // Original functions and props, used to get normal use of Quasar, and mock only few functions.
  const original = jest.requireActual('quasar') as Record<string, unknown>;
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
    exportFile: (fileName: string, rawData: string, opts: string) => exportFileMocked(fileName, rawData, opts),
    useQuasar: jest.fn(() => ({
      notify: notifyMocked,
    })),
  };
});

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

describe('components/TalismanExport', () => {
  config.global.mocks.$t = i18nMocked.global.t;
  config.global.plugins = [...config.global.plugins, i18nMocked];

  it('has a function to download a csv file', async () => {
    const { vm } = shallowMount(TalismanExport, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(typeof vm.exportTable).toBe('function');
    await vm.exportTable();
    expect(exportFileMocked)
      .toHaveBeenCalledWith(
        `mhrs_talismansvue--${_now()}.csv`,
        'Weakness Exploit,2,,,2,1,0\r\n'
        + 'Attack Boost,2,Slugger,1,1,1,0\r\n'
        + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
        + 'Master Mounter,1,Slugger,1,1,1,0',
        'text/csv',
      );
    // Test notify return when exportFile return is false
    expect(notifyMocked).toHaveBeenCalledTimes(1);
  });

  it('display all talismans formatted to csv', () => {
    const wrapper = shallowMount(TalismanExport, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    const input = wrapper.getComponent(QInput);
    expect(input.vm.modelValue).toStrictEqual(''
      + 'Weakness Exploit,2,,,2,1,0\r\n'
      + 'Attack Boost,2,Slugger,1,1,1,0\r\n'
      + 'Speed Sharpening,1,Weakness Exploit,1,0,0,0\r\n'
      + 'Master Mounter,1,Slugger,1,1,1,0');
  });
});
