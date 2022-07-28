import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import TalismanExport from 'components/TalismanExport.vue';
import { TranslateOptions } from '@intlify/core-base';
import { i18nMocked } from 'app/test/mocks/i18n';
import { QInput } from 'quasar';
import { piniaMocked } from 'app/test/mocks/pinia';

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

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-07-26').getTime());

describe('components/TalismanExport', () => {
  it('display all talismans formatted to csv', () => {
    const wrapper = shallowMount(TalismanExport, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    const input = wrapper.getComponent(QInput);
    expect(input.vm.modelValue).toStrictEqual(''
      + 'Weakness Exploit,2,,,2,1,0\r\n'
      + 'Attack Boost,2,Slugger,1,1,1,0');
  });
});
