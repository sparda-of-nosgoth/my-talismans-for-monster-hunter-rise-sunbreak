import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
  qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import TalismanCard from 'components/TalismanCard.vue';
import { i18n } from 'boot/i18n';
import { createTestingPinia } from '@pinia/testing';
import { Talisman } from 'src/models/talisman';
import TalismanDeleteButton from 'components/TalismanDeleteButton.vue';
import TalismanActionToggles from 'components/TalismanActionToggles.vue';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/TalismanCard', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  it('sets the correct default data', () => {
    const talisman = new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
    });

    const { vm } = mount(TalismanCard, {
      props: { talisman },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.readonly).toBeFalsy();
  });

  it('when readonly is active, toggles are disabled and delete button is hidden', async () => {
    const talisman = new Talisman({
      primarySkillId: 'speed-sharpening',
      primarySkillLevel: 1,
      secondarySkillId: 'weakness-exploit',
      secondarySkillLevel: 1,
    });

    const wrapper = mount(TalismanCard, {
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

    const talismanActionToggles = wrapper.findComponent(TalismanActionToggles);
    expect(talismanActionToggles.props().disable).toBeFalsy();
    const talismanDeleteButton = wrapper.findComponent(TalismanDeleteButton);
    expect(talismanDeleteButton.exists()).toBeFalsy();
  });
});
