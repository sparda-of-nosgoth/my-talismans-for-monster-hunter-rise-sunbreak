import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import AppHeaderManagerActions from 'components/AppHeaderManagerActions.vue';
import { useManagerStore } from 'stores/manager';
import { QBtn, QInput, QToggle } from 'quasar';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/AppHeaderManagerActions', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  const managerInitialState = {
    filters: {
      search: '',
      showFavorite: false,
      showMeldingFilter: false,
      options: {
        meldingFilter: {
          skipFavorite: true,
        },
      },
    },
    dialogs: {
      showHelp: false,
      showImportExport: false,
      showTalismanForm: false,
    },
  };

  it('toggle dialogs.showTalismanForm value when help button is clicked', async () => {
    const wrapper = shallowMount(AppHeaderManagerActions, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: managerInitialState,
          },
          stubActions: false,
        })],
      },
    });
    const { dialogs } = useManagerStore();

    expect(dialogs.showTalismanForm).toBeFalsy();
    // buttons : [0] = TalismanForm, [1] = ManagerImportExport, [2] = Help
    const buttons = wrapper.findAllComponents(QBtn);
    await buttons[0].trigger('click');
    expect(dialogs.showTalismanForm).toBeTruthy();
    await buttons[0].trigger('click');
    expect(dialogs.showTalismanForm).toBeFalsy();
  });

  it('toggle dialogs.showImportExport value when Import / Export button is clicked', async () => {
    const wrapper = shallowMount(AppHeaderManagerActions, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: managerInitialState,
          },
          stubActions: false,
        })],
      },
    });
    const { dialogs } = useManagerStore();

    expect(dialogs.showImportExport).toBeFalsy();
    // buttons : [0] = TalismanForm, [1] = ManagerImportExport, [2] = Help
    const buttons = wrapper.findAllComponents(QBtn);
    await buttons[1].trigger('click');
    expect(dialogs.showImportExport).toBeTruthy();
    await buttons[1].trigger('click');
    expect(dialogs.showImportExport).toBeFalsy();
  });

  it('toggle dialogs.showHelp value when help button is clicked', async () => {
    const wrapper = shallowMount(AppHeaderManagerActions, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: managerInitialState,
          },
          stubActions: false,
        })],
      },
    });
    const { dialogs } = useManagerStore();

    expect(dialogs.showHelp).toBeFalsy();
    // buttons : [0] = TalismanForm, [1] = ManagerImportExport, [2] = Help
    const buttons = wrapper.findAllComponents(QBtn);
    await buttons[2].trigger('click');
    expect(dialogs.showHelp).toBeTruthy();
    await buttons[2].trigger('click');
    expect(dialogs.showHelp).toBeFalsy();
  });

  it('update filters.showFavorite value when showFavorite toggle change', async () => {
    const wrapper = shallowMount(AppHeaderManagerActions, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: managerInitialState,
          },
          stubActions: false,
        })],
      },
    });
    const { filters } = useManagerStore();

    expect(filters.showFavorite).toBeFalsy();
    // toggles : [0] = showMeldingFilter, [1] = showFavorite
    const toggles = wrapper.findAllComponents(QToggle);
    await toggles[1].setValue(true);
    expect(filters.showFavorite).toBeTruthy();
    await toggles[1].setValue(false);
    expect(filters.showFavorite).toBeFalsy();
  });

  it('update filters.showMeldingFilter value when showMeldingFilter toggle change', async () => {
    const wrapper = shallowMount(AppHeaderManagerActions, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: managerInitialState,
          },
          stubActions: false,
        })],
      },
    });
    const { filters } = useManagerStore();

    expect(filters.showMeldingFilter).toBeFalsy();
    // toggles : [0] = showMeldingFilter, [1] = showFavorite
    const toggles = wrapper.findAllComponents(QToggle);
    await toggles[0].setValue(true);
    expect(filters.showMeldingFilter).toBeTruthy();
    await toggles[0].setValue(false);
    expect(filters.showMeldingFilter).toBeFalsy();
  });

  it('update filters.search value when search input change', async () => {
    const wrapper = shallowMount(AppHeaderManagerActions, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            manager: managerInitialState,
          },
          stubActions: false,
        })],
      },
    });
    const { filters } = useManagerStore();

    expect(filters.search).toBeFalsy();
    const input = wrapper.getComponent(QInput);
    await input.setValue('weak');
    expect(filters.search).toBe('weak');
    await input.setValue('weakness');
    expect(filters.search).toBe('weakness');
  });
});
