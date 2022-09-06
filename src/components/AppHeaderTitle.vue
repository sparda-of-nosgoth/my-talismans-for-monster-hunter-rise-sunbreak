<script setup lang="ts">
import { useManagerStore } from 'stores/manager';
import { storeToRefs } from 'pinia';

const { filteredTalismans } = storeToRefs(useManagerStore());
</script>

<template>
  <q-toolbar-title class="text-h6">
    <q-icon
      name="img:icons/talisman_white.svg"
      size="lg"
    />
    {{ $t('manager.title') }}
    <q-badge
      v-if="filteredTalismans > 0"
      color="secondary"
      align="top"
    >
      {{ filteredTalismans }}
    </q-badge>
  </q-toolbar-title>
</template>
