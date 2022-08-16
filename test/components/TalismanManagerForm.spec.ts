import {
  describe, expect, it, jest,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount, shallowMount } from '@vue/test-utils';
import TalismanManagerForm from 'components/TalismanManagerForm.vue';
import { i18n } from 'boot/i18n';
import { initFakeTimers } from 'app/test/mocks';
import { Talisman } from 'src/models/talisman';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useSkillStore } from 'stores/skills';
import { QBtnToggle, QSelect, QSlider } from 'quasar';
import { useSlotsStore } from 'stores/slots';

installQuasarPlugin();
initFakeTimers();

jest.mock('boot/i18n');

describe('components/TalismanManagerForm', () => {
  config.global.mocks.$t = i18n.global.t;
  config.global.plugins = [...config.global.plugins, i18n];

  setActivePinia(createPinia());
  const { getSkillById } = useSkillStore();
  const { getSlotsById } = useSlotsStore();

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
      getSkillById('good-luck'),
      getSkillById('charge-master'),
      getSkillById('load-shells'),
      getSkillById('reload-speed'),
    ]);
  });

  it('watch form to update Talisman value', async () => {
    const wrapper = mount(TalismanManagerForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const { vm } = wrapper;

    expect(vm.talisman).toStrictEqual(new Talisman({}));
    const skill1Select = wrapper.findComponent(QSelect);
    await skill1Select.setValue(getSkillById('charge-master'));
    await vm.$nextTick();
    expect(vm.talisman).toStrictEqual(new Talisman({
      skill1: getSkillById('charge-master'),
      skill1Level: 1,
    }));
  });

  it('has a function to submit Talisman', () => {
    const { vm } = shallowMount(TalismanManagerForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(typeof vm.onSubmit).toBe('function');
  });

  it('emit created on submit when a talisman is valid', async () => {
    const wrapper = mount(TalismanManagerForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const { vm } = wrapper;

    expect(vm.talisman).toStrictEqual(new Talisman({}));
    // Select Skills
    const selects = wrapper.findAllComponents(QSelect);
    await selects[0].setValue(getSkillById('charge-master'));
    await selects[1].setValue(getSkillById('good-luck'));
    // Select Skill's levels
    const sliders = wrapper.findAllComponents(QSlider);
    await sliders[0].setValue(2);
    await sliders[1].setValue(1);
    // Select Slots
    const btnToggles = wrapper.findAllComponents(QBtnToggle);
    await btnToggles[0].setValue(3);
    await vm.$nextTick();
    await btnToggles[1].setValue(2);
    await vm.$nextTick();
    await btnToggles[2].setValue(1);
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
    expect(wrapper.emitted('created')).toBeTruthy();
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('filter skills list when a needle is typed in q-select', async () => {
  //   // TODO: Test with cypress
  // });

//  TODO: errors display
});
