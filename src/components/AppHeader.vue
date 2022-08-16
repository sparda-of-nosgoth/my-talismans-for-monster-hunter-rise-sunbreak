<script setup lang="ts">
import AppHeaderTitle from 'components/AppHeaderTitle.vue';
import AppHeaderManagerActions from 'components/AppHeaderManagerActions.vue';
import AppHeaderMenuButton from 'components/AppHeaderMenuButton.vue';
</script>

<template>
  <q-header
    class="bg-white"
    reveal
    elevated
  >
    <q-toolbar>
      <app-header-menu-button class="text-primary" />
      <q-separator
        dark
        vertical
        inset
      />
      <app-header-title />
      <q-space />
      <app-header-manager-actions />
    </q-toolbar>
  </q-header>
</template>
