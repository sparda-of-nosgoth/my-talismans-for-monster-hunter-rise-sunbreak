// import { describe, expect, it } from '@jest/globals';
// import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { mount, shallowMount } from '@vue/test-utils';
// import { QSelect } from 'quasar';
// import AppLocaleSelector from 'components/AppLocaleSelector.vue';
// import { useMockI18n } from '../mocks/i18n';
//
// installQuasarPlugin();
//
// describe('components/AppLocaleSelector', () => {
//   const { i18n } = useMockI18n();
//
//   it('sets the correct default data', () => {
//     const { vm } = mount(AppLocaleSelector);
//
//     expect(vm.locale).toStrictEqual('fr-FR');
//     expect(vm.locales).toStrictEqual(['en-US', 'fr-FR']);
//   });
//
//   it('can change i18n locale when a value is selected', async () => {
//     const wrapper = shallowMount(AppLocaleSelector);
//     const { vm } = wrapper;
//
//     expect(i18n.global.locale).toBe('fr-FR');
//     expect(vm.locale).toStrictEqual('fr-FR');
//     const select = wrapper.getComponent(QSelect);
//     await select.setValue('en-US');
//     expect(i18n.global.locale).toBe('en-US');
//     expect(vm.locale).toStrictEqual('en-US');
//   });
// });
