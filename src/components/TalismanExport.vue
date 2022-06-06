<script setup lang="ts">
import { useTalismanExport } from 'src/composables/talisman-export';
import { useTalisman } from 'src/composables/talisman';

const { talismans } = useTalisman();
const { exportedTalismans } = useTalismanExport(talismans);
</script>

<template>
  <div>
    <q-input
      v-model="exportedTalismans"
      type="textarea"
      outlined
      readonly
    />
  </div>
</template>
