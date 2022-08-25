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
    <!-- START: QToolbar -->
    <q-toolbar>
      <app-header-menu-button />
      <q-separator
        dark
        vertical
        inset
      />
      <app-header-title />
    </q-toolbar>
    <!-- END: QToolbar -->
    <!-- START: Inset QToolbar Actions -->
    <q-toolbar
      class="bg-white wrap"
      inset
    >
      <app-header-manager-actions />
    </q-toolbar>
    <!-- END: Inset QToolbar Actions -->
  </q-header>
</template>
