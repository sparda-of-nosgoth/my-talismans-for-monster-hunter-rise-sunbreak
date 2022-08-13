import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import AppLayout from 'layouts/AppLayout.vue';
import { QBtn, QToolbarTitle } from 'quasar';
import { i18n } from 'boot/i18n';

installQuasarPlugin();

jest.mock('boot/i18n');
jest.mock('src/utils/quasar-lang');

describe('layouts/AppLayout', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const { vm } = shallowMount(AppLayout);

    expect(typeof vm.leftDrawerOpen).toBe('boolean');
    expect(vm.leftDrawerOpen).toBeFalsy();
  });

  it('has toggleLeftDrawer method', () => {
    const { vm } = shallowMount(AppLayout);

    expect(typeof vm.toggleLeftDrawer).toBe('function');
  });

  it('correctly toggle LeftDrawer when menu button is pressed', async () => {
    const wrapper = mount(AppLayout);
    const { vm } = wrapper;

    expect(vm.leftDrawerOpen).toBeFalsy();
    const button = wrapper.findComponent(QBtn);
    await button.trigger('click');
    expect(vm.leftDrawerOpen).toBeTruthy();
    await button.trigger('click');
    expect(vm.leftDrawerOpen).toBeFalsy();
  });

  it('display application name in header', async () => {
    const wrapper = mount(AppLayout);

    const toolbarTitle = wrapper.findComponent(QToolbarTitle);
    expect(toolbarTitle.vm.$el.textContent).toContain('MHRS - Gestionnaire de talismans');
  });
});
