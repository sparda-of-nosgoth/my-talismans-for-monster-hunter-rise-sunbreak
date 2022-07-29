import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin, qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import {
  config, flushPromises, mount, shallowMount,
} from '@vue/test-utils';
import TranslationSkill from 'pages/TranslationSkill.vue';
import { QCard, QItem } from 'quasar';
import { i18nMocked } from 'app/test/mocks/i18n';

installQuasarPlugin();

jest.mock('boot/i18n', () => ({ i18n: jest.fn() }));

describe('pages/SkillTypeList', () => {
  config.global.mocks.$t = i18nMocked.global.t;

  it('sets the correct default data', () => {
    const { vm } = shallowMount(TranslationSkill);

    expect(typeof vm.skillTypes).toBe('object');
    expect(vm.skillTypes).toStrictEqual([
      {
        id: 1,
        name: 'quest',
      },
      {
        id: 2,
        name: 'item',
      },
      {
        id: 3,
        name: 'stats-offensive',
      },
      {
        id: 4,
        name: 'stats-defensive',
      },
      {
        id: 5,
        name: 'survival',
      },
      {
        id: 6,
        name: 'battle',
      },
      {
        id: 7,
        name: 'battle-swordsman',
      },
      {
        id: 8,
        name: 'battle-gunner',
      },
      {
        id: 9,
        name: 'set-bonus',
      },
    ]);
  });

  it('show skillTypes translation into SkillTypeListTranslations components', async () => {
    const wrapper = mount(TranslationSkill, {
      global: {
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;

    await flushPromises();
    const cards = wrapper.findAllComponents(QCard);
    expect(vm.skillTypes.length).toBe(9);
    expect(cards.length).toBe(9);
    const items = wrapper.findAllComponents(QItem);
    expect(items.length).toBe(111);
    // display skillType name, and one skill translation by skill type
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
