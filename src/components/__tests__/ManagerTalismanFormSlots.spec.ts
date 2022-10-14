import ManagerTalismanFormSlots from '../ManagerTalismanFormSlots.vue';
import {
  describe, expect, it,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, shallowMount } from '@vue/test-utils';
import { getSlotsById } from 'src/models/slots';

installQuasarPlugin();

describe('components/ManagerTalismanFormSlots', () => {
  it('sets the correct default data', () => {
    const { vm } = shallowMount(ManagerTalismanFormSlots, { props: { modelValue: getSlotsById('2-2-1') } });

    expect(vm.slot1).toBe(2);
    expect(vm.slot2).toBe(2);
    expect(vm.slot3).toBe(1);
  });

  it('emit slots when values change', async () => {
    const wrapper = mount(ManagerTalismanFormSlots, { props: { modelValue: getSlotsById('2-2-1') } });
    const { vm } = wrapper;
    vm.slot1 = 3;
    await vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });
});
