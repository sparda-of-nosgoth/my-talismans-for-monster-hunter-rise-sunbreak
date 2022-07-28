// import { describe, expect, it } from '@jest/globals';
// import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { config, mount, shallowMount } from '@vue/test-utils';
// import TalismanImport from 'components/TalismanImport.vue';
// import { Notify, QBtn, QInput } from 'quasar';
// import { useMockI18n } from '../mocks/i18n';
//
// installQuasarPlugin({ plugins: { Notify } });
//
// describe('components/TalismanImport', () => {
//   const { i18n } = useMockI18n();
//   config.global.mocks.$t = i18n.global.t;
//
//   it('sets the correct default data', () => {
//     const { vm } = shallowMount(TalismanImport);
//
//     expect(vm.talismanList).toStrictEqual('');
//     expect(vm.submitDisabled).toStrictEqual(true);
//   });
//
//   it('can update talismanList with input change', () => {
//     const wrapper = mount(TalismanImport);
//     const { vm } = wrapper;
//
//     const textarea = wrapper.getComponent(QInput);
//     textarea.setValue('Affûtage rapide,1,Mise à mort,1,0,0,0');
//     expect(vm.talismanList).toStrictEqual('Affûtage rapide,1,Mise à mort,1,0,0,0');
//   });
//
//   it('can\'t submit with empty data', async () => {
//     const wrapper = mount(TalismanImport);
//
//     const textarea = wrapper.getComponent(QInput);
//     await textarea.setValue('');
//     const submit = wrapper.getComponent(QBtn);
//     expect(submit.vm.$el.disabled).toBeTruthy();
//   });
//
//   it('can submit with filled talismanList data', async () => {
//     const wrapper = mount(TalismanImport);
//
//     const textarea = wrapper.getComponent(QInput);
//     await textarea.setValue('Affûtage rapide,1,Mise à mort,1,0,0,0');
//     const submit = wrapper.getComponent(QBtn);
//     expect(submit.vm.$el.disabled).toBeFalsy();
//   });
//
//   it('update store when form is submitted', () => {
//     expect(true).toBeFalsy();
//   });
// });
