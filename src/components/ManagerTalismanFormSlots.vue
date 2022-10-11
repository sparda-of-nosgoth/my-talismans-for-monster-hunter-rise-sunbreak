<script setup lang="ts">
import { ref, watch } from 'vue';
import ManagerTalismanFormSlot from 'components/ManagerTalismanFormSlot.vue';
import { getSlotsBySlot, Slots } from 'src/models/slots';

const props = defineProps<{
  modelValue: Slots
}>();

const emit = defineEmits<{(e: 'update:modelValue', slots: Slots): void}>();

const slot1 = ref(props.modelValue.slot1);
const slot2 = ref(props.modelValue.slot2);
const slot3 = ref(props.modelValue.slot3);

watch(
  [() => slot1.value, () => slot2.value, () => slot3.value],
  ([newSlot1, newSlot2, newSlot3]) => {
    const slots = getSlotsBySlot(newSlot1, newSlot2, newSlot3);
    if (slots) {
      emit('update:modelValue', slots);
    }
  },
);
</script>

<template>
  <q-btn-group>
    <manager-talisman-form-slot v-model="slot1" />
    <manager-talisman-form-slot
      v-model="slot2"
      :options="[
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
      ]"
    />
    <manager-talisman-form-slot
      v-model="slot3"
      :options="[
        { label: '0', value: 0 },
        { label: '1', value: 1 },
      ]"
    />
  </q-btn-group>
</template>
