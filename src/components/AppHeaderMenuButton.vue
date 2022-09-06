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
    color="white"
    :aria-label="$t('menu.header')"
    @click="toggleSettings"
  />
</template>
