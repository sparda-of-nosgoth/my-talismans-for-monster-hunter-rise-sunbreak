<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { computed } from 'vue';
import _isEqual from 'lodash/isEqual';
import _differenceWith from 'lodash/differenceWith';
import TalismanActionToggles from 'components/TalismanActionToggles.vue';
import TalismanSlots from 'components/TalismanSlots.vue';
import TalismanCard from 'components/TalismanCard.vue';
import { TalismansStorage } from 'src/models/storage';

const props = defineProps<{
  remoteStorage: TalismansStorage
  localStorage: TalismansStorage
}>();

const remoteTalismans = _differenceWith(props.remoteStorage.talismans, props.localStorage.talismans, _isEqual);
const localTalismans = _differenceWith(props.localStorage.talismans, props.remoteStorage.talismans, _isEqual);

defineEmits([
  ...useDialogPluginComponent.emits,
]);

const columns = computed(() => [
  {
    name: 'actions_prefix',
  },
  {
    name: 'skill1',
    required: true,
    field: 'skill1',
  },
  {
    name: 'skill2',
    field: 'skill2',
  },
  {
    name: 'slots',
    align: 'center',
    field: 'slots',
  },
]);

const {
  dialogRef, onDialogHide, onDialogOK,
} = useDialogPluginComponent();
</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    full-width
  >
    <q-card class="q-dialog-plugin">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          <span class="text-h5">
            {{ $t('settings.remote_save.conflict_dialog.title') }}
          </span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          {{ $t('settings.remote_save.conflict_dialog.content') }}
        </span>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <div class="col-12-sm col-5-md q-ma-sm">
            <span class="q-ml-sm">
              {{ $t('settings.remote_save.conflict_dialog.remote_save_title') }}
            </span>
            <q-table
              :grid="$q.screen.xs || $q.screen.sm"
              :rows="remoteTalismans"
              :columns="columns"
              :no-data-label="$t('manager.talisman.list.no_data')"
              :no-results-label="$t('manager.talisman.list.no_data')"
              hide-header
              hide-pagination
              :pagination="{rowsPerPage: 0}"
            >
              <!-- START: Template: Row -->
              <template #body="rowProps">
                <q-tr :props="rowProps">
                  <q-td
                    key="actions_prefix"
                    :props="rowProps"
                  >
                    <div class="row">
                      <talisman-action-toggles
                        :talisman="rowProps.row"
                        :readonly="true"
                      />
                    </div>
                  </q-td>
                  <q-td
                    key="skill1"
                    :props="rowProps"
                  >
                    <span>
                      {{ `${$t(rowProps.row.skill1.id)} ${rowProps.row.skill1Level}` }}
                    </span>
                  </q-td>
                  <q-td
                    key="skill2"
                    :props="rowProps"
                  >
                    <span v-if="rowProps.row.skill2 != null">
                      {{ `${$t(rowProps.row.skill2.id)} ${rowProps.row.skill2Level}` }}
                    </span>
                  </q-td>
                  <q-td
                    key="slots"
                    :props="rowProps"
                  >
                    <talisman-slots :talisman="rowProps.row" />
                  </q-td>
                </q-tr>
              </template>
              <!-- END: Template: Row -->
              <!-- START: Template: Grid -->
              <template #item="item">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                  <talisman-card
                    :talisman="item.row"
                    :readonly="true"
                  />
                </div>
              </template>
              <!-- END: Template: Grid -->
            </q-table>
          </div>
          <div class="col-12-sm col-5-md q-ma-sm">
            <span class="q-ml-sm">
              {{ $t('settings.remote_save.conflict_dialog.local_save_title') }}
            </span>
            <q-table
              :grid="$q.screen.xs || $q.screen.sm"
              :rows="localTalismans"
              :columns="columns"
              :no-data-label="$t('manager.talisman.list.no_data')"
              :no-results-label="$t('manager.talisman.list.no_data')"
              hide-header
              hide-pagination
              :pagination="{rowsPerPage: 0}"
            >
              <!-- START: Template: Row -->
              <template #body="rowProps">
                <q-tr :props="rowProps">
                  <q-td
                    key="actions_prefix"
                    :props="rowProps"
                  >
                    <div class="row">
                      <talisman-action-toggles
                        :talisman="rowProps.row"
                        :readonly="true"
                      />
                    </div>
                  </q-td>
                  <q-td
                    key="skill1"
                    :props="rowProps"
                  >
                    <span>
                      {{ `${$t(rowProps.row.skill1.id)} ${rowProps.row.skill1Level}` }}
                    </span>
                  </q-td>
                  <q-td
                    key="skill2"
                    :props="rowProps"
                  >
                    <span v-if="rowProps.row.skill2 != null">
                      {{ `${$t(rowProps.row.skill2.id)} ${rowProps.row.skill2Level}` }}
                    </span>
                  </q-td>
                  <q-td
                    key="slots"
                    :props="rowProps"
                  >
                    <talisman-slots :talisman="rowProps.row" />
                  </q-td>
                </q-tr>
              </template>
              <!-- END: Template: Row -->
              <!-- START: Template: Grid -->
              <template #item="item">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                  <talisman-card
                    :talisman="item.row"
                    :readonly="true"
                  />
                </div>
              </template>
              <!-- END: Template: Grid -->
            </q-table>
          </div>
        </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions class="q-ma-sm q-gutter-sm">
        <q-btn
          color="primary"
          :label="$t('settings.remote_save.conflict_dialog.button.keep_remote')"
          @click="onDialogOK(remoteStorage)"
        />
        <q-space />
        <q-btn
          color="primary"
          :label="$t('settings.remote_save.conflict_dialog.button.keep_local')"
          @click="onDialogOK(localStorage)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
