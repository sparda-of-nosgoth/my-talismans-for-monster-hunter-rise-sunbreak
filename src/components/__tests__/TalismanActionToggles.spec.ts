import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
  qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import TalismanActionToggles from 'components/TalismanActionToggles.vue';
import { i18n } from 'boot/i18n';
import { QBtn } from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/TalismanActionToggles', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const talisman = new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
    });

    const { vm } = mount(TalismanActionToggles, {
      props: { talisman },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.readonly).toBeFalsy();
  });

  it('has a favorite toggle button', async () => {
    const talisman = new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
    });

    const wrapper = mount(TalismanActionToggles, {
      props: { talisman },
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: {
              talismans: [talisman],
            },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;

    let btn = wrapper.findAllComponents(QBtn);
    expect(btn[0].exists()).toBeTruthy();
    expect(btn[0].props().icon).toBe('favorite');
    expect(btn[0].props().color).toBe('grey');
    await btn[0].trigger('click');
    await vm.$nextTick();
    btn = wrapper.findAllComponents(QBtn);
    expect(btn[0].exists()).toBeTruthy();
    expect(btn[0].props().icon).toBe('favorite');
    expect(btn[0].props().color).toBe('pink-8');
  });

  it('has a recycling toggle button', async () => {
    const talisman = new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
    });

    const wrapper = mount(TalismanActionToggles, {
      props: { talisman },
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: {
              talismans: [talisman],
            },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;

    let btn = wrapper.findAllComponents(QBtn);
    expect(btn[1].exists()).toBeTruthy();
    expect(btn[1].props().icon).toBe('recycling');
    expect(btn[1].props().color).toBe('grey');
    await btn[1].trigger('click');
    await vm.$nextTick();
    btn = wrapper.findAllComponents(QBtn);
    expect(btn[1].exists()).toBeTruthy();
    expect(btn[1].props().icon).toBe('recycling');
    expect(btn[1].props().color).toBe('green-10');
  });

  it('can\'t use buttons when readonly is active', async () => {
    const talisman = new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
    });

    const wrapper = mount(TalismanActionToggles, {
      props: {
        talisman,
        readonly: true,
      },
      global: {
        plugins: [createTestingPinia({
          initialState: {
            talismans: {
              talismans: [talisman],
            },
          },
          stubActions: false,
        })],
        provide: qLayoutInjections(),
      },
    });
    const { vm } = wrapper;

    let btn = wrapper.findAllComponents(QBtn);
    expect(btn[0].exists()).toBeTruthy();
    expect(btn[0].props().disable).toBeTruthy();
    expect(btn[0].props().icon).toBe('favorite');
    expect(btn[0].props().color).toBe('grey');
    await btn[0].trigger('click');
    await vm.$nextTick();
    expect(btn[1].exists()).toBeTruthy();
    expect(btn[1].props().disable).toBeTruthy();
    expect(btn[1].props().icon).toBe('recycling');
    expect(btn[1].props().color).toBe('grey');
    await btn[1].trigger('click');
    await vm.$nextTick();
    btn = wrapper.findAllComponents(QBtn);
    expect(btn[0].exists()).toBeTruthy();
    expect(btn[0].props().icon).toBe('favorite');
    expect(btn[0].props().color).toBe('grey');
    expect(btn[1].exists()).toBeTruthy();
    expect(btn[1].props().icon).toBe('recycling');
    expect(btn[1].props().color).toBe('grey');
  });
});
