// import { describe, expect, it } from '@jest/globals';
// import {
//   installQuasarPlugin, qLayoutInjections,
// } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { flushPromises, mount, shallowMount } from '@vue/test-utils';
// import SkillTypeList from 'pages/TranslationSkill.vue';
// import { useMockI18n } from 'app/test/mocks/i18n';
// import SkillTypeListTranslations from 'components/SkillTypeListTranslations.vue';
//
// installQuasarPlugin();
//
// describe('pages/SkillTypeList', () => {
//   useMockI18n();
//
//   it('sets the correct default data', () => {
//     const { vm } = shallowMount(SkillTypeList);
//
//     expect(typeof vm.skillTypes).toBe('object');
//     expect(vm.skillTypes).toBeFalsy();
//   });
//
//   it('show skillTypes translation into SkillTypeListTranslations components', async () => {
//     const wrapper = mount(SkillTypeList, {
//       global: {
//         provide: qLayoutInjections(),
//       },
//     });
//     const { vm } = wrapper;
//
//     await flushPromises();
//     const skillTypeListTranslations = wrapper.findAllComponents(SkillTypeListTranslations);
//     expect(vm.skillTypes.length).toBe(9);
//     expect(skillTypeListTranslations.length).toBe(9);
//     // display skillType name, and one skill translation by skill type
//     expect(vm.$el.textContent).toContain('Quête');
//     expect(vm.$el.textContent).toContain('Affinity Sliding');
//     expect(vm.$el.textContent).toContain('Roi de la glisse');
//
//     expect(vm.$el.textContent).toContain('Objet');
//     expect(vm.$el.textContent).toContain('Bombardier');
//     expect(vm.$el.textContent).toContain('Bombardier');
//
//     expect(vm.$el.textContent).toContain('Statistiques - Offensive');
//     expect(vm.$el.textContent).toContain('Attack Boost');
//     expect(vm.$el.textContent).toContain('Machine de guerre');
//
//     expect(vm.$el.textContent).toContain('Statistiques - Défensive');
//     expect(vm.$el.textContent).toContain('Blast Resistance');
//     expect(vm.$el.textContent).toContain('Anti-explosion');
//
//     expect(vm.$el.textContent).toContain('Survie');
//     expect(vm.$el.textContent).toContain('Bubbly Dance');
//     expect(vm.$el.textContent).toContain('Ébullition');
//
//     expect(vm.$el.textContent).toContain('Combat');
//     expect(vm.$el.textContent).toContain('Agitator');
//     expect(vm.$el.textContent).toContain('Témérité');
//
//     expect(vm.$el.textContent).toContain('Combat - Épéiste');
//     expect(vm.$el.textContent).toContain('Handicraft');
//     expect(vm.$el.textContent).toContain('Savoir-faire');
//
//     expect(vm.$el.textContent).toContain('Combat - Artilleur');
//     expect(vm.$el.textContent).toContain('Ballistics');
//     expect(vm.$el.textContent).toContain('Balistique');
//
//     expect(vm.$el.textContent).toContain('Bonus de set');
//     expect(vm.$el.textContent).toContain('Thunder Alignment');
//     expect(vm.$el.textContent).toContain('Alignement tonnerre');
//   });
// });
