<script setup lang="ts">
import { useManagerStore } from 'stores/manager';

const {
  filters, toggleHelp, toggleImportExportDialog, toggleTalismanFormDialog,
} = useManagerStore();
</script>

<template>
  <!-- START: Actions -->
  <q-btn
    flat
    round
    icon="add"
    color="grey"
    :aria-label="$t('manager.tooltip.add_talisman')"
    @click="toggleTalismanFormDialog"
  >
    <q-tooltip
      :delay="1000"
    >
      {{ $t('manager.tooltip.add_talisman') }}
    </q-tooltip>
  </q-btn>
  <q-btn
    flat
    round
    icon="drive_folder_upload"
    color="grey"
    :aria-label="$t('manager.tooltip.import_export_talismans')"
    @click="toggleImportExportDialog"
  >
    <q-tooltip
      :delay="1000"
    >
      {{ $t('manager.tooltip.import_export_talismans') }}
    </q-tooltip>
  </q-btn>
  <!-- END: Actions -->
  <q-separator
    vertical
    inset
  />
  <!-- START: QToolbar Filters -->
  <q-toggle
    v-model="filters.showMeldingFilter"
    icon="recycling"
    :aria-label="$t('manager.tooltip.toggle_show_to_meld')"
  >
    <q-tooltip :delay="1000">
      {{ $t('manager.tooltip.toggle_show_to_meld') }}
    </q-tooltip>
  </q-toggle>
  <q-toggle
    v-model="filters.showFavorite"
    icon="favorite"
    :aria-label="$t('manager.tooltip.toggle_show_favorite')"
  >
    <q-tooltip :delay="1000">
      {{ $t('manager.tooltip.toggle_show_favorite') }}
    </q-tooltip>
  </q-toggle>
  <q-input
    v-model="filters.search"
    dense
    debounce="300"
    :placeholder="$t('manager.talisman.list.search')"
  >
    <template #append>
      <q-icon name="search" />
    </template>
  </q-input>
  <q-btn
    flat
    round
    color="primary"
    icon="info"
    @click="toggleHelp"
  />
  <!-- END: Filters -->
</template>
