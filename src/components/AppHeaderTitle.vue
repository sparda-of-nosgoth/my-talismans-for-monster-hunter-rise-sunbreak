<script setup lang="ts">
import { useManagerStore } from 'stores/manager';
import { storeToRefs } from 'pinia';

const { filteredTalismans } = storeToRefs(useManagerStore());
</script>

<template>
  <q-toolbar-title class="bg-primary">
    <h1 class="text-h6">
      <q-icon
        name="img:images/icon_talisman_white.svg"
        size="lg"
      />
      {{ $t('manager.talisman.table.label') }}
      <q-badge
        v-if="filteredTalismans > 0"
        color="blue-4"
        align="top"
      >
        {{ filteredTalismans }}
      </q-badge>
    </h1>
  </q-toolbar-title>
</template>
