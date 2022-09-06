<script setup lang="ts">
import { useTalismanExport } from 'src/composables/talisman-export';
import { exportFile, useQuasar } from 'quasar';
import _now from 'lodash/now';
import { useI18n } from 'vue-i18n';
import { useTalismanStore } from 'stores/talismans';

const { notify } = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const { talismans } = useTalismanStore();
const { exportedTalismans } = useTalismanExport(talismans);

function exportTable() {
  const status = exportFile(
    `mhrs_talismansvue--${_now()}.csv`,
    exportedTalismans.value,
    'text/csv',
  );

  if (status !== true) {
    notify({
      message: t('manager.export.to_file.error'),
      color: 'negative',
      icon: 'warning',
    });
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-6">
        <h2 class="text-h6">
          {{ $t('manager.export.title') }}
        </h2>
      </div>
      <div class="col-6 text-right">
        <q-btn
          square
          color="primary"
          icon="file_download"
          :label="$t('manager.export.to_file.label')"
          :aria-label="$t('manager.export.to_file.label')"
          @click="exportTable"
        />
      </div>
    </div>
    <q-input
      v-model="exportedTalismans"
      class="manager-export-textarea"
      type="textarea"
      autogrow
      outlined
      readonly
    />
  </div>
</template>
