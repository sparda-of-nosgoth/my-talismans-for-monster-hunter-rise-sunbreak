import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, shallowMount } from '@vue/test-utils';
import TalismanManagerForm from 'components/TalismanManagerForm.vue';
import { i18n } from 'boot/i18n';
import { initFakeTimers } from 'app/test/mocks';
import { Talisman } from 'src/models/talisman';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';

installQuasarPlugin();
initFakeTimers();

jest.mock('boot/i18n');

describe('components/TalismanManagerForm', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();

  it('sets the correct default data', () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.talisman)
      .toStrictEqual(new Talisman({}));
  });

  it('has a function to filter skills', async () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    expect(typeof vm.filterSkills).toBe('function');
    const updateMock = jest.fn((callback: () => void) => callback());
    await vm.filterSkills('Cha', updateMock);
    await vm.$nextTick();
    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(vm.filteredSkills).toStrictEqual([
      getSkillById('chameleos-blessing'),
      getSkillById('good-luck'),
      getSkillById('charge-master'),
      getSkillById('load-shells'),
      getSkillById('reload-speed'),
    ]);
  });

  it('has a function to submit Talisman', () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(typeof vm.onSubmit).toBe('function');
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('filter skills list when a needle is typed in q-select', async () => {
  //   // TODO: Test with cypress
  // });

//  TODO: test emit created, and errors display
});
