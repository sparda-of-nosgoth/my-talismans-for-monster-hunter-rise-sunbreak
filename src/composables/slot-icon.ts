import {
  isRef, Ref, ref, unref, watchEffect,
} from 'vue';

export function useSlotIcon(slot: Ref<number> | number) {
  const slotIcon = ref<string>();

  function getIconName() {
    const value = unref(slot);
    switch (value) {
      case 4:
        slotIcon.value = 'img:images/icon_slot_4.svg';
        break;
      case 3:
        slotIcon.value = 'img:images/icon_slot_3.svg';
        break;
      case 2:
        slotIcon.value = 'img:images/icon_slot_2.svg';
        break;
      case 1:
        slotIcon.value = 'img:images/icon_slot_1.svg';
        break;
      case 0:
      default:
        slotIcon.value = 'remove';
        break;
    }
  }

  if (isRef(slot)) {
    watchEffect(getIconName);
  } else {
    getIconName();
  }

  return { slotIcon };
}
