import {
  afterEach, beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
  qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import TalismanManager from 'pages/TalismanManager.vue';
import { i18n } from 'boot/i18n';
import { QTh, QTr } from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('pages/TalismanManager', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  const talisman1: Talisman = new Talisman({
    primarySkillId: 'speed-sharpening',
    primarySkillLevel: 1,
    secondarySkillId: 'weakness-exploit',
    secondarySkillLevel: 1,
  });

  const talisman2: Talisman = new Talisman({
    primarySkillId: 'bubbly-dance',
    primarySkillLevel: 1,
    slotsId: '2-2-1',
    favorite: true,
  });

  const talisman3: Talisman = new Talisman({
    primarySkillId: 'agitator',
    primarySkillLevel: 2,
    slotsId: '2-1-0',
    favorite: true,
  });

  const talisman4: Talisman = new Talisman({
    primarySkillId: 'master-mounter',
    primarySkillLevel: 1,
    secondarySkillId: 'slugger',
    secondarySkillLevel: 1,
    slotsId: '1-1-0',
  });

  let talismans: Talisman[] = [];

  beforeEach(() => {
    talismans = [talisman1, talisman2, talisman3, talisman4];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('display Talismans', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();
    await vm.$nextTick();

    const rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
  });

  it('can sort by primarySkill', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    // No sorting
    let rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.$el.textContent).toContain('Affûtage rapide');
    expect(rows[1].vm.$el.textContent).toContain('Ébullition');
    expect(rows[2].vm.$el.textContent).toContain('Témérité');
    expect(rows[3].vm.$el.textContent).toContain('Maître-cavalier');
    // Sorting ASC
    const headerColumns = wrapper.findAllComponents(QTh);
    expect(headerColumns).toHaveLength(5);
    await headerColumns[1].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.$el.textContent).toContain('Affûtage rapide');
    expect(rows[1].vm.$el.textContent).toContain('Ébullition');
    expect(rows[2].vm.$el.textContent).toContain('Maître-cavalier');
    expect(rows[3].vm.$el.textContent).toContain('Témérité');
    // Sorting DESC
    await headerColumns[1].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.$el.textContent).toContain('Témérité');
    expect(rows[1].vm.$el.textContent).toContain('Maître-cavalier');
    expect(rows[2].vm.$el.textContent).toContain('Ébullition');
    expect(rows[3].vm.$el.textContent).toContain('Affûtage rapide');
  });

  it('can sort by secondarySkill', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    // No sorting
    let rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.$el.textContent).toContain('Mise à mort');
    expect(rows[1].vm.$el.textContent).toContain('');
    expect(rows[2].vm.$el.textContent).toContain('');
    expect(rows[3].vm.$el.textContent).toContain('Cogneur');
    // Sorting ASC
    const headerColumns = wrapper.findAllComponents(QTh);
    expect(headerColumns).toHaveLength(5);
    await headerColumns[2].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.$el.textContent).toContain(' ');
    expect(rows[1].vm.$el.textContent).toContain(' ');
    expect(rows[2].vm.$el.textContent).toContain('Cogneur');
    expect(rows[3].vm.$el.textContent).toContain('Mise à mort');
    // Sorting DESC
    await headerColumns[2].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.$el.textContent).toContain('Mise à mort');
    expect(rows[1].vm.$el.textContent).toContain('Cogneur');
    expect(rows[2].vm.$el.textContent).toContain(' ');
    expect(rows[3].vm.$el.textContent).toContain(' ');
  });

  it('can sort by slots', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    // No sorting
    let rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.props.row).toStrictEqual(talisman1);
    expect(rows[1].vm.props.row).toStrictEqual(talisman2);
    expect(rows[2].vm.props.row).toStrictEqual(talisman3);
    expect(rows[3].vm.props.row).toStrictEqual(talisman4);
    // Sorting ASC
    const headerColumns = wrapper.findAllComponents(QTh);
    expect(headerColumns).toHaveLength(5);
    await headerColumns[3].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.props.row).toStrictEqual(talisman1);
    expect(rows[1].vm.props.row).toStrictEqual(talisman4);
    expect(rows[2].vm.props.row).toStrictEqual(talisman3);
    expect(rows[3].vm.props.row).toStrictEqual(talisman2);
    // Sorting DESC
    await headerColumns[3].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(4);
    expect(rows[0].vm.props.row).toStrictEqual(talisman2);
    expect(rows[1].vm.props.row).toStrictEqual(talisman3);
    expect(rows[2].vm.props.row).toStrictEqual(talisman4);
    expect(rows[3].vm.props.row).toStrictEqual(talisman1);
  });

  it('show filtered rows for search filter', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: {
              filters: {
                search: '2-1-0',
              },
            },
            talismans: { talismans },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });

    const rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(1);
  });

  it('show filtered rows for showFavorite filter', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: {
              filters: {
                showFavorite: true,
              },
            },
            talismans: { talismans },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });

    const rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(2);
  });

  it('show filtered rows for showMeldingFilter filter', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: {
              filters: {
                showMeldingFilter: true,
              },
            },
            talismans: { talismans },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });

    const rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(1);
  });

  it('show filtered rows with multiple filters', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: {
              filters: {
                search: '2-1-0',
                showFavorite: true,
              },
            },
            talismans: { talismans },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });

    const rows = wrapper.findAllComponents(QTr);
    expect(rows).toHaveLength(1);
  });
});
