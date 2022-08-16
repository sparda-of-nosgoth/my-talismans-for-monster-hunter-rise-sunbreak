import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import ManagerTalismanForm from 'components/ManagerTalismanForm.vue';
import { i18n } from 'boot/i18n';
import { initFakeTimers } from 'app/test/mocks';
import { Talisman } from 'src/models/talisman';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { useSlotsStore } from 'stores/slots';
import { useTalismanStore } from 'stores/talismans';

installQuasarPlugin();
initFakeTimers();

jest.mock('boot/i18n');

describe('components/ManagerTalismanForm', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

  it('sets the correct default data', () => {
    const { vm } = shallowMount(ManagerTalismanForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(vm.talisman)
      .toStrictEqual(new Talisman({}));
  });

  it('can filter skills', async () => {
    const { vm } = shallowMount(ManagerTalismanForm, {
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
      getSkillById('good-luck'),
      getSkillById('charge-master'),
      getSkillById('load-shells'),
      getSkillById('reload-speed'),
    ]);
  });

  it('watch each slot to update Talisman Slots id value', async () => {
    const wrapper = mount(ManagerTalismanForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const { vm } = wrapper;

    expect(vm.talisman).toStrictEqual(new Talisman({}));
    vm.talisman.slots.slot1 = 3;
    await vm.$nextTick();
    expect(vm.talisman).toStrictEqual(new Talisman({
      slots: {
        id: '3-0-0',
        slot1: 3,
        slot2: 0,
        slot3: 0,
      },
    }));
  });

  it('on submit when a talisman is valid, add talisman to store', async () => {
    const wrapper = mount(ManagerTalismanForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const { vm } = wrapper;
    const { talismans } = useTalismanStore();

    expect(talismans).toStrictEqual([]);
    expect(vm.talisman).toStrictEqual(new Talisman({}));
    vm.talisman = new Talisman({
      skill1Level: 2,
      skill2: getSkillById('good-luck'),
      skill2Level: 1,
      slots: getSlotsById('3-2-1'),
    });
    await vm.$nextTick();
    expect(vm.false).toBeFalsy();
    vm.talisman = new Talisman({
      skill1: getSkillById('charge-master'),
      skill1Level: 2,
      skill2: getSkillById('good-luck'),
      skill2Level: 1,
      slots: getSlotsById('3-2-1'),
    });
    await vm.$nextTick();
    expect(vm.isValid).toBeTruthy();
    expect(vm.talisman).toStrictEqual(new Talisman({
      skill1: getSkillById('charge-master'),
      skill1Level: 2,
      skill2: getSkillById('good-luck'),
      skill2Level: 1,
      slots: getSlotsById('3-2-1'),
    }));
    vm.onSubmit();
    expect(talismans).toStrictEqual([new Talisman({
      skill1: getSkillById('charge-master'),
      skill1Level: 2,
      skill2: getSkillById('good-luck'),
      skill2Level: 1,
      slots: getSlotsById('3-2-1'),
    })]);
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('filter skills list when a needle is typed in q-select', async () => {
  //   // TODO: Test with cypress
  // });
//  TODO: errors display
});
