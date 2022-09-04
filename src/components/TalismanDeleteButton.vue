<script setup lang="ts">
import { Talisman } from 'src/models/talisman';
import { useTalismanStore } from 'stores/talismans';

defineProps<{
  talisman: Talisman
}>();

const { deleteTalisman } = useTalismanStore();
</script>

<template>
  <q-btn
    outline
    color="red"
    icon="delete"
    :aria-label="$t('manager.tooltip.delete_talisman')"
    @click="() => deleteTalisman(talisman)"
  >
    <q-tooltip :delay="1000">
      {{ $t('manager.tooltip.delete_talisman') }}
    </q-tooltip>
  </q-btn>
</template>
