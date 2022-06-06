// import {
//   describe, expect, it, jest,
// } from '@jest/globals';
// import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { config, shallowMount } from '@vue/test-utils';
// import TalismanManagerForm from 'components/TalismanManagerForm.vue';
// import { useMockPinia } from 'app/test/mocks/pinia';
// import _cloneDeep from 'lodash/cloneDeep';
//
// installQuasarPlugin();
//
// jest.mock('vue-i18n', () => ({
//   useI18n: jest.fn(() => ({
//     locale: 'fr',
//   })),
// }));
//
// config.global.mocks.$t = jest.fn();
//
// useMockPinia();
//
// describe('components/TalismanManagerForm', () => {
//   it('has a function validateTalisman', () => {
//     const { vm } = shallowMount(TalismanManagerForm);
//     expect(typeof vm.validateTalisman).toBe('function');
//     // Test validation for an empty talisman
//     const talisman = _cloneDeep(vm.newTalisman);
//     expect(() => vm.validateTalisman(talisman)).toThrow('talisman.validation.skill1.is_empty');
//     // Test validation for skill1 is null
//     talisman.skill1 = null;
//     expect(() => vm.validateTalisman(talisman)).toThrow('talisman.validation.skill1.is_empty');
//     // expect(() => vm.validateTalisman()).toThrow('talisman.validation.skill1.not_found');
//     // expect(() => vm.validateTalisman({ skill1: { name: '' } })).toThrow('talisman.validation.skill1Level.is_empty');
//     // expect(() => vm.validateTalisman({ skill1: { name: '' }, skill1Level: 0 })).toThrow('talisman.validation.skill1Level.is_empty');
//     // Test validation for skill1Level greater than skill1.levelMaximum
//     talisman.skill1 = { name: '', levelMaximum: 2 };
//     talisman.skill1Level = 3;
//     expect(() => vm.validateTalisman(talisman)).toThrow('talisman.validation.skill1Level.exceeds_maximum');
//     // expect(() => vm.validateTalisman(talisman)).toThrow('talisman.validation.skill2.not_found');
//     talisman.skill1Level = 1;
//     talisman.skill2 = { name: '', levelMaximum: 2 };
//     expect(() => vm.validateTalisman(talisman)).toThrow('talisman.validation.skill2Level.is_empty');
//     // Test validation for skill2Level greater than skill2.levelMaximum
//     talisman.skill2Level = 3;
//     expect(() => vm.validateTalisman(talisman)).toThrow('talisman.validation.skill2Level.exceeds_maximum');
//   });
// });
