<script setup lang="ts">
import { useTalismanExport } from 'src/composables/talisman-export';
import { useTalisman } from 'src/composables/talisman';
import { exportFile, useQuasar } from 'quasar';
import _now from 'lodash/now';
import { useI18n } from 'vue-i18n';

const { notify } = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const { talismans } = useTalisman();
const { exportedTalismans } = useTalismanExport(talismans);

function exportTable() {
  const status = exportFile(
    `mhrs_talismansvue--${_now()}.csv`,
    exportedTalismans.value,
    'text/csv',
  );

  if (status !== true) {
    notify({
      message: t('talisman.export.to_file.error'),
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
          {{ $t('talisman.export.title') }}
        </h2>
      </div>
      <div class="col-6 text-right">
        <q-btn
          square
          color="primary"
          icon="file_download"
          :label="$t('talisman.export.to_file.label')"
          :aria-label="$t('talisman.export.to_file.label')"
          @click="exportTable"
        />
      </div>
    </div>
    <q-input
      v-model="exportedTalismans"
      type="textarea"
      outlined
      readonly
    />
  </div>
</template>
