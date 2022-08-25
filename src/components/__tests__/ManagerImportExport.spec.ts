import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import ManagerImport from 'components/ManagerImport.vue';
import ManagerExport from 'components/ManagerExport.vue';
import ManagerImportExport from 'components/ManagerImportExport.vue';
import { QTabPanel } from 'quasar';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/ManagerImportExport', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(ManagerImportExport);

    expect(vm.currentTab).toBe('import');
  });

  it('has a section to import talismans', async () => {
    const wrapper = mount(ManagerImportExport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;
    vm.currentTab = 'import';
    await vm.$nextTick();
    const managerImport = wrapper.getComponent(ManagerImport);
    expect(managerImport)
      .toBeTruthy();
  });

  it('has a section to export talismans', async () => {
    const wrapper = mount(ManagerImportExport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;
    vm.currentTab = 'export';
    await vm.$nextTick();
    const managerExport = wrapper.getComponent(ManagerExport);
    expect(managerExport).toBeTruthy();
  });

  it('show panel when tab change', async () => {
    const wrapper = mount(ManagerImportExport, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;

    vm.currentTab = 'import';
    await vm.$nextTick();
    expect(vm.currentTab).toBe('import');
    const importTabPanel = wrapper.findComponent(QTabPanel);
    expect(importTabPanel.vm.name).toBe('import');

    vm.currentTab = 'export';
    await vm.$nextTick();
    expect(vm.currentTab).toBe('export');
    const exportTabPanel = wrapper.findComponent(QTabPanel);
    expect(exportTabPanel.vm.name).toBe('export');
  });
});
