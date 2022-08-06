<script setup lang="ts">
import { ref } from 'vue';
import TalismanImport from 'components/TalismanImport.vue';
import TalismanExport from 'components/TalismanExport.vue';

const currentTab = ref('import');
</script>

<template>
  <q-page class="full-width row wrap justify-center">
    <div class="full-width q-pa-md">
      <div
        class="q-gutter-y-md"
      >
        <q-tabs
          v-model="currentTab"
          class="text-grey"
          align="justify"
          dense
          narrow-indicator
        >
          <q-tab
            name="import"
            :label="$t('talisman.import.label')"
          />
          <q-tab
            name="export"
            :label="$t('talisman.export.label')"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="currentTab"
          animated
        >
          <q-tab-panel name="import">
            <talisman-import />
          </q-tab-panel>
          <q-tab-panel name="export">
            <talisman-export />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>
