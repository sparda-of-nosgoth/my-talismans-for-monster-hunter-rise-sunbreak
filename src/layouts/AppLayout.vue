<script setup lang="ts">
import { ref } from 'vue';
import AppMenu from 'components/AppMenu.vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh lpR lfr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          id="main-menu"
          flat
          dense
          round
          icon="menu"
          :aria-label="$t('menu.header')"
          @click="toggleLeftDrawer"
        />
        <q-separator
          dark
          vertical
          inset
        />
        <q-toolbar-title>
          <h1 class="text-h6">
            {{ $t('app_title') }}
          </h1>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      bordered
    >
      <app-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
