import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
import { useSlotIcon } from 'src/composables/slot-icon';
import { ref } from 'vue';

jest.mock('boot/i18n');

describe('composables/slot-icon', () => {
  describe('with a ref', () => {
    const slot = ref();
    const { slotIcon } = useSlotIcon(slot);

    async function updateSlot(newValue: number) {
      slot.value = newValue;
    }

    beforeEach(() => {
      slot.value = undefined;
    });

    it('has a default value to return', () => {
      expect(slotIcon.value).toStrictEqual('remove');
    });

    it('has a value to return if slot equals 0', async () => {
      await updateSlot(0);
      expect(slotIcon.value).toStrictEqual('remove');
    });

    it('has a value to return if slot equals 1', async () => {
      await updateSlot(1);
      expect(slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_1.svg');
    });

    it('has a value to return if slot equals 2', async () => {
      await updateSlot(2);
      expect(slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_2.svg');
    });

    it('has a value to return if slot equals 3', async () => {
      await updateSlot(3);
      expect(slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_3.svg');
    });

    it('has a value to return if slot equals 4', async () => {
      await updateSlot(4);
      expect(slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_4.svg');
    });
  });

  describe('with a string', () => {
    it('has a default value to return', () => {
      expect(useSlotIcon(9).slotIcon.value).toStrictEqual('remove');
    });

    it('has a value to return if slot equals 0', () => {
      expect(useSlotIcon(0).slotIcon.value).toStrictEqual('remove');
    });

    it('has a value to return if slot equals 1', () => {
      expect(useSlotIcon(1).slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_1.svg');
    });

    it('has a value to return if slot equals 2', () => {
      expect(useSlotIcon(2).slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_2.svg');
    });

    it('has a value to return if slot equals 3', () => {
      expect(useSlotIcon(3).slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_3.svg');
    });

    it('has a value to return if slot equals 4', () => {
      expect(useSlotIcon(4).slotIcon.value).toStrictEqual('img:src/assets/images/icon_slot_4.svg');
    });
  });
});
