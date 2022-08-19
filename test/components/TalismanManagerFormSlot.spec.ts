import {
  describe, expect, it,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import TalismanManagerFormSlot from 'components/TalismanManagerFormSlot.vue';

installQuasarPlugin();

describe('components/TalismanManagerFormSlot', () => {
  it('sets the correct default data', () => {
    const { vm } = shallowMount(TalismanManagerFormSlot, { props: { modelValue: 0 } });

    expect(vm.options).toStrictEqual([
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
    ]);
  });
});
