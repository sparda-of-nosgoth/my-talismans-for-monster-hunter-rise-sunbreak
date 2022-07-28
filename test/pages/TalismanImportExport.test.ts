// import { describe, expect, it } from '@jest/globals';
// import {
//   installQuasarPlugin, qLayoutInjections,
// } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { config, mount, shallowMount } from '@vue/test-utils';
// import TalismanImport from 'components/TalismanImport.vue';
// import TalismanExport from 'components/TalismanExport.vue';
// import TalismanImportExport from 'pages/TalismanImportExport.vue';
// import { QTabPanel } from 'quasar';
// import { nextTick } from 'vue';
// import { useMockI18n } from '../mocks/i18n';
//
// installQuasarPlugin();
//
// describe('pages/TalismanImportExport', () => {
//   const { i18n } = useMockI18n();
//   config.global.mocks.$t = i18n.global.t;
//
//   it('sets the correct default data', () => {
//     const { vm } = shallowMount(TalismanImportExport);
//
//     expect(vm.tab).toStrictEqual('import');
//   });
//
//   it('has a section to import talismans', async () => {
//     const wrapper = mount(TalismanImportExport, {
//       global: {
//         provide: qLayoutInjections(),
//       },
//     });
//     const { vm } = wrapper;
//     vm.tab = 'import';
//     await nextTick();
//     const talismanImport = wrapper.getComponent(TalismanImport);
//     expect(talismanImport)
//       .toBeTruthy();
//   });
//
//   it('has a section to export talismans', async () => {
//     const wrapper = mount(TalismanImportExport, {
//       global: {
//         provide: qLayoutInjections(),
//       },
//     });
//     const { vm } = wrapper;
//     vm.tab = 'export';
//     await nextTick();
//     const talismanExport = wrapper.getComponent(TalismanExport);
//     expect(talismanExport).toBeTruthy();
//   });
//
//   it('show panel when tab change', async () => {
//     const wrapper = mount(TalismanImportExport, {
//       global: {
//         provide: qLayoutInjections(),
//       },
//     });
//     const { vm } = wrapper;
//
//     vm.tab = 'import';
//     await nextTick();
//     expect(vm.tab).toStrictEqual('import');
//     const importTabPanel = wrapper.findComponent(QTabPanel);
//     expect(importTabPanel.vm.name).toBe('import');
//
//     vm.tab = 'export';
//     await nextTick();
//     expect(vm.tab).toStrictEqual('export');
//     const exportTabPanel = wrapper.findComponent(QTabPanel);
//     expect(exportTabPanel.vm.name).toBe('export');
//   });
// });
