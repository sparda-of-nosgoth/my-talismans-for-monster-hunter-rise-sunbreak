<script setup lang="ts">
import { Talisman } from 'src/models/talisman';
import { useSlotIcon } from 'src/composables/slot-icon';

defineProps<{
  talisman: Talisman
}>();
</script>

<template>
  <div>
    <q-icon
      :name="useSlotIcon(talisman.slots.slot1).slotIcon.value"
      size="md"
      :aria-label="talisman.slots.slot1"
    />
    <q-icon
      :name="useSlotIcon(talisman.slots.slot2).slotIcon.value"
      size="md"
      :aria-label="talisman.slots.slot2"
    />
    <q-icon
      :name="useSlotIcon(talisman.slots.slot3).slotIcon.value"
      size="md"
      :aria-label="talisman.slots.slot3"
    />
  </div>
</template>
