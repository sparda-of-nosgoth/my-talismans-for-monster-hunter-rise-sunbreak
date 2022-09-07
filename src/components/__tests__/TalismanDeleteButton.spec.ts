import {
  describe, expect, it, jest,
} from '@jest/globals';
import {
  installQuasarPlugin,
  qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import TalismanDeleteButton from 'components/TalismanDeleteButton.vue';
import { i18n } from 'boot/i18n';
import { QBtn } from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { Talisman } from 'src/models/talisman';
import { useTalismanStore } from 'stores/talismans';

installQuasarPlugin();

jest.mock('boot/i18n');

describe('components/TalismanDeleteButton', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();

  it('has a delete button on a Talisman row', async () => {
    const talisman = new Talisman({
      skill1: getSkillById('speed-sharpening'),
      skill1Level: 1,
      skill2: getSkillById('weakness-exploit'),
      skill2Level: 1,
    });

    const wrapper = mount(TalismanDeleteButton, {
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
    const talismanStore = useTalismanStore();

    expect(talismanStore.talismans).toHaveLength(1);
    const btn = wrapper.getComponent(QBtn);
    expect(btn.props().icon).toBe('delete');
    await btn.trigger('click');
    await vm.$nextTick();
    expect(talismanStore.talismans).toHaveLength(0);
  });
});
