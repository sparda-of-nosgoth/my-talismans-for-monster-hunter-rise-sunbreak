<script setup lang="ts">
import { useManagerStore } from 'stores/manager';

const { toggleSettingsDialog } = useManagerStore();
</script>

<template>
  <q-btn
    id="menu"
    flat
    round
    icon="menu"
    color="white"
    :aria-label="$t('menu.header')"
    @click="toggleSettingsDialog"
  />
</template>
