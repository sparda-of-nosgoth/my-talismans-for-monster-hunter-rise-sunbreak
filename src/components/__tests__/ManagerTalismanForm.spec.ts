import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import ManagerTalismanForm from 'components/ManagerTalismanForm.vue';
import { i18n } from 'boot/i18n';
import { Talisman } from 'src/models/talisman';
import { createTestingPinia } from '@pinia/testing';
import { useTalismanStore } from 'stores/talismans';
import { getSkillById } from 'src/models/skill';
import { getSlotsById } from 'src/models/slots';

installQuasarPlugin();

jest
  .setSystemTime(new Date('2022-07-26').getTime());

jest.mock('boot/i18n');

describe('components/ManagerTalismanForm', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

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
    vm.talisman.primarySkill = null;
    expect(vm.isValid).toBeFalsy();
    vm.talisman.primarySkill = getSkillById('charge-master');
    expect(vm.isValid).toBeFalsy();
    vm.talisman.primarySkillLevel = 2;
    expect(vm.isValid).toBeFalsy();
    vm.talisman.secondarySkill = null;
    expect(vm.isValid).toBeFalsy();
    vm.talisman.secondarySkill = getSkillById('good-luck');
    expect(vm.isValid).toBeFalsy();
    vm.talisman.secondarySkillLevel = 1;
    expect(vm.isValid).toBeFalsy();
    vm.talisman.slots = null;
    expect(vm.isValid).toBeFalsy();
    vm.talisman.slots = getSlotsById('3-2-1');
    expect(vm.isValid).toBeFalsy();
    await vm.$nextTick();
    expect(vm.isValid).toBeTruthy();
    expect(vm.talisman).toStrictEqual(new Talisman({
      primarySkillId: 'charge-master',
      primarySkillLevel: 2,
      secondarySkillId: 'good-luck',
      secondarySkillLevel: 1,
      slotsId: '3-2-1',
    }));
    vm.onSubmit();
    expect(talismans).toStrictEqual([new Talisman({
      primarySkillId: 'charge-master',
      primarySkillLevel: 2,
      secondarySkillId: 'good-luck',
      secondarySkillLevel: 1,
      slotsId: '3-2-1',
    })]);
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('filter skills list when a needle is typed in q-select', async () => {
  //   // TODO: Test with cypress
  // });
//  TODO: errors display
});
