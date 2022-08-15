<script setup lang="ts">
import { ref } from 'vue';
import { useTalismanStore } from 'stores/talismans';

const talismanStore = useTalismanStore();

const confirmDialog = ref(false);
function showConfirmDialog() {
  confirmDialog.value = true;
}

function clearAllData() {
  talismanStore.clear();
  confirmDialog.value = false;
}
</script>

<template>
  <q-btn
    color="red"
    :label="$t('settings.clear_data.label')"
    @click="showConfirmDialog"
  />

  <q-dialog
    v-model="confirmDialog"
    persistent
  >
    <q-card>
      <q-toolbar>
        <q-icon
          name="dangerous"
          color="red"
          size="xl"
        />
        <q-toolbar-title>{{ $t('settings.clear_data.dialog.warning_title') }}</q-toolbar-title>
      </q-toolbar>

      <q-card-section class="row items-center">
        <span class="q-ml-sm">{{ $t('settings.clear_data.dialog.warning_message') }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('dialog.button.cancel')"
          v-close-popup
        />
        <q-space />
        <q-btn
          :label="$t('dialog.button.confirm')"
          color="red"
          @click="clearAllData"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
