<script setup lang="ts">
import AppHeaderTitle from 'components/AppHeaderTitle.vue';
import AppHeaderManagerActions from 'components/AppHeaderManagerActions.vue';
import AppHeaderMenuButton from 'components/AppHeaderMenuButton.vue';
</script>

<template>
  <q-header
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
      <div class="toolbar-action row bg-white q-pa-xs">
        <app-header-manager-actions />
      </div>
    </q-toolbar>
  </q-header>
</template>
