<script setup lang="ts">
import { Talisman } from 'src/models/talisman';
import { useTalismanStore } from 'stores/talismans';

withDefaults(defineProps<{
  talisman: Talisman
  readonly?: boolean
}>(), {
  readonly: false,
});

const { toggleFavorite, toggleForMelding } = useTalismanStore();
</script>

<template>
  <q-btn-group outline>
    <q-btn
      flat
      :color="talisman.favorite === true ? 'pink-8' : 'grey'"
      icon="favorite"
      :aria-label="$t('manager.tooltip.add_to_favorite')"
      :disable="readonly"
      @click="() => toggleFavorite(talisman)"
    >
      <q-tooltip :delay="1000">
        {{ $t('manager.tooltip.add_to_favorite') }}
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      :color="talisman.forMelding === true ? 'green-10' : 'grey'"
      icon="recycling"
      :aria-label="$t('manager.tooltip.add_to_for_melding')"
      :disable="readonly"
      @click="() => toggleForMelding(talisman)"
    >
      <q-tooltip :delay="1000">
        {{ $t('manager.tooltip.add_to_for_melding') }}
      </q-tooltip>
    </q-btn>
  </q-btn-group>
</template>
