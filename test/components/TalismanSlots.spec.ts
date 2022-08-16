import {
  describe, expect, it,
} from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import TalismanSlots from 'components/TalismanSlots.vue';

installQuasarPlugin();

describe('components/TalismanSlots', () => {
  it('has a function to get correct icon name from slot', () => {
    const { vm } = shallowMount(TalismanSlots, {
      props: {
        talisman: {
          slots: { slot1: 0, slot2: 0, slot3: 0 },
        },
      },
    });

    expect(typeof vm.getIconName).toBe('function');
    expect(vm.getIconName(0)).toStrictEqual('remove');
    expect(vm.getIconName(1)).toStrictEqual('img:src/assets/images/icon_slot_1.svg');
    expect(vm.getIconName(2)).toStrictEqual('img:src/assets/images/icon_slot_2.svg');
    expect(vm.getIconName(3)).toStrictEqual('img:src/assets/images/icon_slot_3.svg');
    expect(vm.getIconName(4)).toStrictEqual('img:src/assets/images/icon_slot_4.svg');
  });
});
