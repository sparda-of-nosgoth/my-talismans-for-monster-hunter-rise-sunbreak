<script setup lang="ts">
import { ref } from 'vue';
import { useSlotIcon } from 'src/composables/slot-icon';

interface Options {
  label: string
  value: number
}

withDefaults(defineProps<{
  modelValue: number
  options?: Options[]
}>(), {
  options: () => [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ],
});

defineEmits<{(e: 'update:modelValue', slot: number): void}>();

const value = ref(0);
const { slotIcon } = useSlotIcon(value);
</script>

<template>
  <div>
    <q-btn
      :icon="slotIcon"
      text-color="black"
      size="lg"
    >
      <q-menu
        fit
        anchor="bottom left"
        self="top left"
      >
        <q-item
          v-for="option in options"
          :key="option.value"
          clickable
          v-close-popup
          @click="() => {
            value = option.value;
            $emit('update:modelValue', option.value);
          }"
        >
          <q-item-section>
            <q-icon
              :name="useSlotIcon(option.value).slotIcon.value"
              size="md"
            />
          </q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </div>
</template>
