<script setup lang="ts">
import AppMenu from 'components/AppMenu.vue';
import AppHeader from 'components/AppHeader.vue';
import AppHeaderForMobile from 'components/AppHeaderForMobile.vue';
import ManagerHelp from 'components/ManagerHelp.vue';
import ManagerTalismanForm from 'components/ManagerTalismanForm.vue';
import ManagerImportExport from 'components/ManagerImportExport.vue';
import { useManagerStore } from 'stores/manager';

const { dialogs, drawers } = useManagerStore();
</script>

<template>
  <q-layout view="hHh lpR lFr">
    <app-header v-if="!$q.screen.xs" />
    <app-header-for-mobile v-else />

    <q-drawer
      v-model="drawers.showSettings"
      side="left"
      overlay
      bordered
    >
      <app-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
      <!-- QDialog: Help -->
      <q-dialog v-model="dialogs.showHelp">
        <manager-help class="manager-dialog-help" />
      </q-dialog>
      <!-- QDialog: Talisman Form -->
      <q-dialog
        v-model="dialogs.showTalismanForm"
        position="right"
      >
        <manager-talisman-form class="manager-dialog-talisman-form" />
      </q-dialog>
      <!-- QDialog: Import / Export -->
      <q-dialog
        v-model="dialogs.showImportExport"
        full-width
        full-height
      >
        <manager-import-export />
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>
