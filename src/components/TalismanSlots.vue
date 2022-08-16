<script setup lang="ts">

import { Talisman } from 'src/models/talisman';

defineProps<{
  talisman: Talisman
}>();

function getIconName(slot: number) {
  switch (slot) {
    case 4:
      return 'img:src/assets/images/icon_slot_4.svg';
    case 3:
      return 'img:src/assets/images/icon_slot_3.svg';
    case 2:
      return 'img:src/assets/images/icon_slot_2.svg';
    case 1:
      return 'img:src/assets/images/icon_slot_1.svg';
    case 0:
    default:
      return 'remove';
  }
}
</script>

<template>
  <div>
    <q-icon
      :name="getIconName(talisman.slots.slot1)"
      size="md"
      :aria-label="talisman.slots.slot1"
    />
    <q-icon
      :name="getIconName(talisman.slots.slot2)"
      size="md"
      :aria-label="talisman.slots.slot2"
    />
    <q-icon
      :name="getIconName(talisman.slots.slot3)"
      size="md"
      :aria-label="talisman.slots.slot3"
    />
  </div>
</template>
