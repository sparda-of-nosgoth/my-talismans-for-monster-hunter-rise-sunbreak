import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import { QSelect } from 'quasar';
import AppLocaleSelector from 'components/AppLocaleSelector.vue';
import { i18n } from 'boot/i18n';

installQuasarPlugin();

jest.mock('boot/i18n');
jest.mock('src/utils/quasar-lang');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const quasarLangSetMocked = jest.fn();
// To test export to file and notification, exportFile and useQuasar needs to be mocked
jest.mock('quasar', () => {
  // Original functions and props, used to get normal use of Quasar, and mock only few functions.
  const original = jest.requireActual('quasar') as Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  original.Quasar.lang.set = jest.fn((langDefault) => quasarLangSetMocked(langDefault));
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  };
});

describe('components/AppLocaleSelector', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const { vm } = mount(AppLocaleSelector);

    expect(vm.locale).toBe('fr');
    expect(vm.availableLocales).toStrictEqual(['en', 'fr']);
  });

  it('can change i18n locale when a value is selected', async () => {
    const wrapper = shallowMount(AppLocaleSelector);
    const { vm } = wrapper;

    expect(i18n.global.locale.value).toBe('fr');
    expect(vm.locale).toBe('fr');
    const select = wrapper.getComponent(QSelect);
    await select.setValue('en');
    expect(i18n.global.locale.value).toBe('en');
    expect(vm.locale).toBe('en');
  });

  it('change quasar lang file  when a value is selected', async () => {
    const wrapper = shallowMount(AppLocaleSelector);

    const select = wrapper.getComponent(QSelect);
    await select.setValue('en');
    expect(quasarLangSetMocked).toHaveBeenCalledWith('en');
    await select.setValue('fr');
    expect(quasarLangSetMocked).toHaveBeenCalledWith('fr');
  });
});
