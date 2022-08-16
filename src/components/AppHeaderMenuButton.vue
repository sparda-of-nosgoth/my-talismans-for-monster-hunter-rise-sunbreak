<script setup lang="ts">
import { useManagerStore } from 'stores/manager';

const { toggleSettings } = useManagerStore();
</script>

<template>
  <q-btn
    id="menu"
    flat
    round
    icon="menu"
    :aria-label="$t('menu.header')"
    @click="toggleSettings"
  />
</template>
