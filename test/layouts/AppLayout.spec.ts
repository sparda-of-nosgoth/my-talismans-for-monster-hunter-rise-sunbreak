// import { describe, expect, it } from '@jest/globals';
// import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { config, mount, shallowMount } from '@vue/test-utils';
// import AppLayout from 'layouts/AppLayout.vue';
// import { QBtn, QToolbarTitle } from 'quasar';
// import { useMockI18n } from 'app/test/mocks/i18n';
// import AppLocaleSelector from 'components/AppLocaleSelector.vue';
// import { useMockRouter } from 'app/test/mocks/router';
//
// installQuasarPlugin();
//
// describe('layouts/AppLayout', () => {
//   const { i18n } = useMockI18n();
//   useMockRouter();
//
//   config.global.mocks.$t = i18n.global.t;
//
//   it('sets the correct default data', () => {
//     const { vm } = shallowMount(AppLayout);
//
//     expect(typeof vm.leftDrawerOpen).toBe('boolean');
//     expect(vm.leftDrawerOpen).toBeFalsy();
//   });
//
//   it('has toggleLeftDrawer method', () => {
//     const { vm } = shallowMount(AppLayout);
//
//     expect(typeof vm.toggleLeftDrawer).toBe('function');
//   });
//
//   it('correctly toggle LeftDrawer when menu button is pressed', async () => {
//     const wrapper = mount(AppLayout);
//
//     expect(wrapper.vm.leftDrawerOpen).toBeFalsy();
//     const button = wrapper.findComponent(QBtn);
//     await button.trigger('click');
//     expect(wrapper.vm.leftDrawerOpen).toBeTruthy();
//   });
//
//   it('display application name in header', async () => {
//     const wrapper = mount(AppLayout);
//
//     const toolbarTitle = wrapper.findComponent(QToolbarTitle);
//     expect(toolbarTitle.vm.$el.textContent).toContain('MHRS - Gestionnaire de talismans');
//   });
//
//   it('has a locale selector', async () => {
//     const wrapper = mount(AppLayout);
//
//     const localeSelector = wrapper.findComponent(AppLocaleSelector);
//     expect(localeSelector.vm.$el.textContent).toContain('fr-FR');
//   });
// });
