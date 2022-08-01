import {
  afterEach, describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
  qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import TalismanManager from 'pages/TalismanManager.vue';
import { i18nMocked } from 'app/test/mocks/i18n';
import {
  QBtn, QInput, QTr,
} from 'quasar';
import { TranslateOptions } from '@intlify/core-base';
import { piniaMocked } from '../mocks/pinia';

installQuasarPlugin();

jest.mock('boot/i18n', () => ({
  i18n: {
    global: {
      locale: 'fr',
      availableLocales: ['en', 'fr'],
      t: jest.fn((key: string, defaultMsg: string, options: TranslateOptions) => i18nMocked.global.t(key, defaultMsg, options)),
    },
  },
}));

jest.mock('localforage', () => ({
  getItem: jest.fn(() => new Promise((resolve, reject) => { reject(null); })),
  setItem: jest.fn((key, value) => new Promise((resolve) => { resolve(value); })),
}));

describe('pages/TalismanManager', () => {
  config.global.mocks.$t = i18nMocked.global.t;
  config.global.plugins = [...config.global.plugins, i18nMocked];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets the correct default data', () => {
    const { vm } = shallowMount(TalismanManager, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(vm.filter).toBe('');
    expect(vm.dialog).toBe(false);
  });

  it('has a function to open Dialog', () => {
    const { vm } = shallowMount(TalismanManager, {
      global: {
        plugins: [piniaMocked()],
      },
    });

    expect(typeof vm.openDialog).toBe('function');
  });

  it('display Talismans', () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [piniaMocked()],
        provide: qLayoutInjections(),
      },
    });

    const rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(2);
  });

  it('has a favorite toggle button on a Talisman row', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [piniaMocked()],
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
        plugins: [piniaMocked()],
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
        plugins: [piniaMocked()],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    let rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(2);
    const btn = rows[0].findAllComponents(QBtn);
    expect(btn[2].exists()).toBeTruthy();
    expect(btn[2].props().icon).toBe('delete');
    await btn[2].trigger('click');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(1);
  });

  it('has a search filter', async () => {
    const wrapper = mount(TalismanManager, {
      global: {
        plugins: [piniaMocked()],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;
    await vm.$nextTick();

    let rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(2);
    const input = wrapper.getComponent(QInput);
    await input.setValue('2-1-0');
    await vm.$nextTick();
    rows = wrapper.findAllComponents(QTr);
    expect(rows.length).toBe(1);
  });

  // TODO: test for sorting
  // TODO: test for QPageStick and QDialog

  // TODO: Test this with cypress ?
  // eslint-disable-next-line jest/no-commented-out-tests
  // describe('on small screen', () => {
  // eslint-disable-next-line jest/no-commented-out-tests
  //   it('has a favorite toggle button on a Talisman card', async () => {
  //     resizeScreen();
  //
  //     const wrapper = mount(TalismanManager, {
  //       global: {
  //         plugins: [piniaMocked()],
  //         provide: qLayoutInjections(),
  //       },
  //     });
  //     const { vm } = wrapper;
  //     await vm.$nextTick();
  //
  //     const cards = wrapper.findAllComponents(QCard);
  //     let btn = cards[0].findAllComponents(QBtn);
  //     expect(btn[0].exists()).toBeTruthy();
  //     expect(btn[0].props().icon).toBe('favorite');
  //     expect(btn[0].props().color).toBe('grey');
  //     await btn[0].trigger('click');
  //     await vm.$nextTick();
  //     btn = cards[0].findAllComponents(QBtn);
  //     expect(btn[0].exists()).toBeTruthy();
  //     expect(btn[0].props().icon).toBe('favorite');
  //     expect(btn[0].props().color).toBe('pink-8');
  //   });
  //
  // eslint-disable-next-line jest/no-commented-out-tests
  //   it('has a recycling toggle button on a Talisman card', async () => {
  //     const wrapper = mount(TalismanManager, {
  //       global: {
  //         plugins: [piniaMocked()],
  //         provide: qLayoutInjections(),
  //       },
  //     });
  //     const { vm } = wrapper;
  //     await vm.$nextTick();
  //
  //     const cards = wrapper.findAllComponents(QCard);
  //     let btn = cards[0].findAllComponents(QBtn);
  //     expect(btn[1].exists()).toBeTruthy();
  //     expect(btn[1].props().icon).toBe('recycling');
  //     expect(btn[1].props().color).toBe('grey');
  //     await btn[1].trigger('click');
  //     await vm.$nextTick();
  //     btn = cards[0].findAllComponents(QBtn);
  //     expect(btn[1].exists()).toBeTruthy();
  //     expect(btn[1].props().icon).toBe('recycling');
  //     expect(btn[1].props().color).toBe('green-10');
  //   });
  //
  // eslint-disable-next-line jest/no-commented-out-tests
  //   it('has a delete button on a Talisman card', async () => {
  //     const wrapper = mount(TalismanManager, {
  //       global: {
  //         plugins: [piniaMocked()],
  //         provide: qLayoutInjections(),
  //       },
  //     });
  //     const { vm } = wrapper;
  //     await vm.$nextTick();
  //
  //     let cards = wrapper.findAllComponents(QCard);
  //     expect(cards.length).toBe(2);
  //     const btn = cards[0].findAllComponents(QBtn);
  //     expect(btn[2].exists()).toBeTruthy();
  //     expect(btn[2].props().icon).toBe('delete');
  //     await btn[2].trigger('click');
  //     await vm.$nextTick();
  //     cards = wrapper.findAllComponents(QCard);
  //     expect(cards.length).toBe(1);
  //   });
  // });
});
