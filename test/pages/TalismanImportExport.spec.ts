import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin, qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import TalismanImport from 'components/TalismanImport.vue';
import TalismanExport from 'components/TalismanExport.vue';
import TalismanImportExport from 'pages/TalismanImportExport.vue';
import { QTabPanel } from 'quasar';
import { i18nMocked } from 'app/test/mocks/i18n';
import { TranslateOptions } from '@intlify/core-base';
import { piniaMocked } from '../mocks/pinia';

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

describe('pages/TalismanImportExport', () => {
  config.global.mocks.$t = i18nMocked.global.t;
  config.global.plugins = [...config.global.plugins, i18nMocked];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(TalismanImportExport);

    expect(vm.currentTab).toStrictEqual('import');
  });

  it('has a section to import talismans', async () => {
    const wrapper = mount(TalismanImportExport, {
      global: {
        plugins: [piniaMocked()],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    vm.currentTab = 'import';
    await vm.$nextTick();
    const talismanImport = wrapper.getComponent(TalismanImport);
    expect(talismanImport)
      .toBeTruthy();
  });

  it('has a section to export talismans', async () => {
    const wrapper = mount(TalismanImportExport, {
      global: {
        plugins: [piniaMocked()],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    vm.currentTab = 'export';
    await vm.$nextTick();
    const talismanExport = wrapper.getComponent(TalismanExport);
    expect(talismanExport).toBeTruthy();
  });

  it('show panel when tab change', async () => {
    const wrapper = mount(TalismanImportExport, {
      global: {
        plugins: [piniaMocked()],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;

    vm.currentTab = 'import';
    await vm.$nextTick();
    expect(vm.currentTab).toStrictEqual('import');
    const importTabPanel = wrapper.findComponent(QTabPanel);
    expect(importTabPanel.vm.name).toBe('import');

    vm.currentTab = 'export';
    await vm.$nextTick();
    expect(vm.currentTab).toStrictEqual('export');
    const exportTabPanel = wrapper.findComponent(QTabPanel);
    expect(exportTabPanel.vm.name).toBe('export');
  });
});
