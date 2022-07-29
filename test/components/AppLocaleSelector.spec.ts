import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import { QSelect } from 'quasar';
import AppLocaleSelector from 'components/AppLocaleSelector.vue';
import { i18nMocked } from '../mocks/i18n';

installQuasarPlugin();

describe('components/AppLocaleSelector', () => {
  config.global.plugins = [...config.global.plugins, i18nMocked];

  it('sets the correct default data', () => {
    const { vm } = mount(AppLocaleSelector);

    expect(vm.locale).toBe('fr');
    expect(vm.availableLocales).toStrictEqual(['en', 'fr']);
  });

  it('can change i18n locale when a value is selected', async () => {
    const wrapper = shallowMount(AppLocaleSelector);
    const { vm } = wrapper;

    expect(i18nMocked.global.locale.value).toBe('fr');
    expect(vm.locale).toBe('fr');
    const select = wrapper.getComponent(QSelect);
    await select.setValue('en');
    expect(i18nMocked.global.locale.value).toBe('en');
    expect(vm.locale).toBe('en');
  });
});
