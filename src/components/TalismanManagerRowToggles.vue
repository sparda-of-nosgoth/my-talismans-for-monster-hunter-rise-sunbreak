<script setup lang="ts">

import { Talisman } from 'src/models/talisman';

defineProps<{
  talisman: Talisman
}>();

// eslint-disable-next-line func-call-spacing, no-spaced-func
const emit = defineEmits<{
  (e: 'toggle-favorite', talisman: Talisman): void
  (e: 'toggle-for-melting', talisman: Talisman): void
}>();
</script>

<template>
  <q-btn-group outline>
    <q-btn
      flat
      :color="talisman.favorite === true ? 'pink-8' : 'grey'"
      icon="favorite"
      @click="() => emit('toggle-favorite', talisman)"
    />
    <q-btn
      flat
      :color="talisman.forMelting === true ? 'green-10' : 'grey'"
      icon="recycling"
      @click="() => emit('toggle-for-melting', talisman)"
    />
  </q-btn-group>
</template>
