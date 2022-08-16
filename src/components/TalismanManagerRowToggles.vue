<script setup lang="ts">

import { Talisman } from 'src/models/talisman';

defineProps<{
  talisman: Talisman
}>();

// eslint-disable-next-line func-call-spacing, no-spaced-func
const emit = defineEmits<{
  (e: 'toggle-favorite', talisman: Talisman): void
  (e: 'toggle-for-melding', talisman: Talisman): void
}>();
</script>

<template>
  <q-btn-group outline>
    <q-btn
      flat
      :color="talisman.favorite === true ? 'pink-8' : 'grey'"
      icon="favorite"
      :aria-label="$t('talisman.manager.tooltip.add_to_favorite')"
      @click="() => emit('toggle-favorite', talisman)"
    >
      <q-tooltip delay="1000">
        {{ $t('talisman.manager.tooltip.add_to') }}
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      :color="talisman.forMelding === true ? 'green-10' : 'grey'"
      icon="recycling"
      :aria-label="$t('talisman.manager.tooltip.add_to_for_melding')"
      @click="() => emit('toggle-for-melding', talisman)"
    >
      <q-tooltip delay="1000">
        {{ $t('talisman.manager.tooltip.add_to_for_melding') }}
      </q-tooltip>
    </q-btn>
  </q-btn-group>
</template>
