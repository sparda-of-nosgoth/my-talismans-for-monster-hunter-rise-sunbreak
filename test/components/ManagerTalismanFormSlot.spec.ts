import {
  describe, expect, it,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import ManagerTalismanFormSlot from '../../src/components/ManagerTalismanFormSlot.vue';

installQuasarPlugin();

describe('components/ManagerTalismanFormSlot', () => {
  it('sets the correct default data', () => {
    const { vm } = shallowMount(ManagerTalismanFormSlot, { props: { modelValue: 0 } });

    expect(vm.options).toStrictEqual([
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
    ]);
  });
});
