import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin, qLayoutInjections } from '@quasar/quasar-app-extension-testing-unit-jest';
import {
  config, mount, shallowMount,
} from '@vue/test-utils';
import TranslationSkill from 'pages/SkillTranslation.vue';
import { QCard, QItem } from 'quasar';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('pages/SkillTranslation', () => {
  config.global.mocks.$t = i18n.global.t;

  it('show skillTypes translation into SkillTypeListTranslations components', async () => {
    const wrapper = mount(TranslationSkill, {
      global: {
        provide: qLayoutInjections(),
        plugins: [createTestingPinia()],
      },
    });
    const { vm } = wrapper;

    const cards = wrapper.findAllComponents(QCard);
    expect(cards).toHaveLength(9);
    const items = wrapper.findAllComponents(QItem);
    expect(items).toHaveLength(135);
    // display skillType id, and one skill translation by skill type
    expect(vm.$el.textContent).toContain('Quête');
    expect(vm.$el.textContent).toContain('Affinity Sliding');
    expect(vm.$el.textContent).toContain('Roi de la glisse');

    expect(vm.$el.textContent).toContain('Objet');
    expect(vm.$el.textContent).toContain('Bombardier');
    expect(vm.$el.textContent).toContain('Bombardier');

    expect(vm.$el.textContent).toContain('Statistiques - Offensive');
    expect(vm.$el.textContent).toContain('Attack Boost');
    expect(vm.$el.textContent).toContain('Machine de guerre');

    expect(vm.$el.textContent).toContain('Statistiques - Défensive');
    expect(vm.$el.textContent).toContain('Blast Resistance');
    expect(vm.$el.textContent).toContain('Anti-explosion');

    expect(vm.$el.textContent).toContain('Survie');
    expect(vm.$el.textContent).toContain('Bubbly Dance');
    expect(vm.$el.textContent).toContain('Ébullition');

    expect(vm.$el.textContent).toContain('Combat');
    expect(vm.$el.textContent).toContain('Agitator');
    expect(vm.$el.textContent).toContain('Témérité');

    expect(vm.$el.textContent).toContain('Combat - Épéiste');
    expect(vm.$el.textContent).toContain('Handicraft');
    expect(vm.$el.textContent).toContain('Savoir-faire');

    expect(vm.$el.textContent).toContain('Combat - Artilleur');
    expect(vm.$el.textContent).toContain('Ballistics');
    expect(vm.$el.textContent).toContain('Balistique');

    expect(vm.$el.textContent).toContain('Bonus de set');
    expect(vm.$el.textContent).toContain('Thunder Alignment');
    expect(vm.$el.textContent).toContain('Alignement tonnerre');
  });
});
