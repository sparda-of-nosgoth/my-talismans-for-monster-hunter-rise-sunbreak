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
import {
  QBtn, QTh, QTr,
} from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import { Talisman } from 'src/models/talisman';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('pages/TalismanManager', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  const talisman1: Talisman = new Talisman({
    skill1: getSkillById('speed-sharpening'),
    skill1Level: 1,
    skill2: getSkillById('weakness-exploit'),
    skill2Level: 1,
  });

  const talisman2: Talisman = new Talisman({
    skill1: getSkillById('bubbly-dance'),
    skill1Level: 1,
    slots: getSlotsById('2-2-1'),
    favorite: true,
  });

  const talisman3: Talisman = new Talisman({
    skill1: getSkillById('agitator'),
    skill1Level: 2,
    slots: getSlotsById('2-1-0'),
    favorite: true,
  });

  const talisman4: Talisman = new Talisman({
    skill1: getSkillById('master-mounter'),
    skill1Level: 1,
    skill2: getSkillById('slugger'),
    skill2Level: 1,
    slots: getSlotsById('1-1-0'),
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
    expect(rows.length).toBe(4);
  });

  it('has a favorite toggle button on a Talisman row', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    const rows = wrapper.findAllComponents(QTr);
    let btn = rows[0].findAllComponents(QBtn);
    expect(btn[0].exists()).toBeTruthy();
    expect(btn[0].props().icon).toBe('favorite');
    expect(btn[0].props().color).toBe('grey');
    await btn[0].trigger('click');
    await vm.$nextTick();
    btn = rows[0].findAllComponents(QBtn);
    expect(btn[0].exists()).toBeTruthy();
    expect(btn[0].props().icon).toBe('favorite');
    expect(btn[0].props().color).toBe('pink-8');
  });

  it('has a recycling toggle button on a Talisman row', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    const rows = wrapper.findAllComponents(QTr);
    let btn = rows[0].findAllComponents(QBtn);
    expect(btn[1].exists()).toBeTruthy();
    expect(btn[1].props().icon).toBe('recycling');
    expect(btn[1].props().color).toBe('grey');
    await btn[1].trigger('click');
    await vm.$nextTick();
    btn = rows[0].findAllComponents(QBtn);
    expect(btn[1].exists()).toBeTruthy();
    expect(btn[1].props().icon).toBe('recycling');
    expect(btn[1].props().color).toBe('green-10');
  });

  it('has a delete button on a Talisman row', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: { talismans },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    let rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(4);
    const btn = rows[0].findAllComponents(QBtn);
    expect(btn[2].exists()).toBeTruthy();
    expect(btn[2].props().icon).toBe('delete');
    await btn[2].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(3);
  });

  it('can sort by skill1', async () => {
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
    expect(rows.length).toBe(4);
    expect(rows[0].vm.$el.textContent).toContain('Affûtage rapide');
    expect(rows[1].vm.$el.textContent).toContain('Ébullition');
    expect(rows[2].vm.$el.textContent).toContain('Témérité');
    expect(rows[3].vm.$el.textContent).toContain('Maître-cavalier');
    // Sorting ASC
    const headerColumns = wrapper.findAllComponents(QTh);
    expect(headerColumns.length).toBe(5);
    await headerColumns[1].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(4);
    expect(rows[0].vm.$el.textContent).toContain('Affûtage rapide');
    expect(rows[1].vm.$el.textContent).toContain('Ébullition');
    expect(rows[2].vm.$el.textContent).toContain('Maître-cavalier');
    expect(rows[3].vm.$el.textContent).toContain('Témérité');
    // Sorting DESC
    await headerColumns[1].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(4);
    expect(rows[0].vm.$el.textContent).toContain('Témérité');
    expect(rows[1].vm.$el.textContent).toContain('Maître-cavalier');
    expect(rows[2].vm.$el.textContent).toContain('Ébullition');
    expect(rows[3].vm.$el.textContent).toContain('Affûtage rapide');
  });

  it('can sort by skill2', async () => {
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
    expect(rows.length).toBe(4);
    expect(rows[0].vm.$el.textContent).toContain('Mise à mort');
    expect(rows[1].vm.$el.textContent).toContain('');
    expect(rows[2].vm.$el.textContent).toContain('');
    expect(rows[3].vm.$el.textContent).toContain('Cogneur');
    // Sorting ASC
    const headerColumns = wrapper.findAllComponents(QTh);
    expect(headerColumns.length).toBe(5);
    await headerColumns[2].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(4);
    expect(rows[0].vm.$el.textContent).toContain(' ');
    expect(rows[1].vm.$el.textContent).toContain(' ');
    expect(rows[2].vm.$el.textContent).toContain('Cogneur');
    expect(rows[3].vm.$el.textContent).toContain('Mise à mort');
    // Sorting DESC
    await headerColumns[2].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(4);
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
    expect(rows.length).toBe(4);
    expect(rows[0].vm.props.row).toStrictEqual(talisman1);
    expect(rows[1].vm.props.row).toStrictEqual(talisman2);
    expect(rows[2].vm.props.row).toStrictEqual(talisman3);
    expect(rows[3].vm.props.row).toStrictEqual(talisman4);
    // Sorting ASC
    const headerColumns = wrapper.findAllComponents(QTh);
    expect(headerColumns.length).toBe(5);
    await headerColumns[3].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(4);
    expect(rows[0].vm.props.row).toStrictEqual(talisman1);
    expect(rows[1].vm.props.row).toStrictEqual(talisman4);
    expect(rows[2].vm.props.row).toStrictEqual(talisman3);
    expect(rows[3].vm.props.row).toStrictEqual(talisman2);
    // Sorting DESC
    await headerColumns[3].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(4);
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
    expect(rows.length).toBe(1);
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
    expect(rows.length).toBe(2);
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
    expect(rows.length).toBe(1);
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
    expect(rows.length).toBe(1);
  });
});
