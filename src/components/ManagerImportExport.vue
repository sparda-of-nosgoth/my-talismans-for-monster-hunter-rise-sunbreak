<script setup lang="ts">
import { ref } from 'vue';
import ManagerImport from 'components/ManagerImport.vue';
import ManagerExport from 'components/ManagerExport.vue';

const currentTab = ref('import');
</script>

<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        <q-tabs
          v-model="currentTab"
          align="justify"
          dense
          narrow-indicator
        >
          <q-tab
            name="import"
            :label="$t('manager.import.label')"
          />
          <q-tab
            name="export"
            :label="$t('manager.export.label')"
          />
        </q-tabs>
      </q-toolbar-title>
      <q-btn
        flat
        v-close-popup
        round
        dense
        icon="close"
      ></q-btn>
    </q-toolbar>
    <q-card-section class="row items-center no-wrap">
      <div class="full-width q-pa-md">
        <div
          class="q-gutter-y-md"
        >
          <q-tab-panels
            v-model="currentTab"
            animated
          >
            <q-tab-panel name="import">
              <manager-import />
            </q-tab-panel>
            <q-tab-panel name="export">
              <manager-export />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
