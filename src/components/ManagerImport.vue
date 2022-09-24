<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTalismanImport } from 'src/composables/talisman-import';
import ManagerImportListError from 'components/ManagerImportListError.vue';
import { useQuasar } from 'quasar';
import _each from 'lodash/each';
import { useTalismanStore } from 'stores/talismans';
import { useI18n } from 'vue-i18n';

const { notify } = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const talismanStore = useTalismanStore();
const talismanList = ref('');
const { errorsFromImport, talismansToImport } = useTalismanImport(talismanList);

const submitDisabled = computed(() => talismansToImport.value.length <= 0);

function submitImport() {
  if (talismansToImport.value) {
    _each(talismansToImport.value, (talisman) => {
      talismanStore.addTalisman(talisman);
    });
    notify({
      color: 'positive',
      position: 'bottom',
      message: t('manager.import.success', { count: talismansToImport.value.length }),
      icon: 'check',
    });
  }
}
</script>

<template>
  <div>
    <h2 class="text-h6">
      {{ $t('manager.import.title') }}
    </h2>
    <div class="row">
      <div class="q-pa-md col-sm-12 col-md-6">
        <q-form @submit.prevent>
          <q-input
            v-model="talismanList"
            outlined
            type="textarea"
          />
          <div class="q-ma-md">
            <q-btn
              :label="$t('manager.import.submit')"
              type="submit"
              :disable="submitDisabled"
              @click="submitImport"
            />
            <span class="q-pl-md">
              {{ $t('manager.import.talismans_to_import', talismansToImport.length, { count: talismansToImport.length }) }}
            </span>
          </div>
        </q-form>
      </div>
      <div class="q-pa-md col-sm-12 col-md-6">
        <manager-import-list-error
          message="manager.import.errors.skill1.not_found"
          :talismans-in-errors="errorsFromImport.skill1NotFound"
        />
        <manager-import-list-error
          message="manager.import.errors.skill1.is_empty"
          :talismans-in-errors="errorsFromImport.skill1IsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.skill1Level.is_empty"
          :talismans-in-errors="errorsFromImport.skill1LevelIsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.skill1Level.exceeds_maximum"
          :talismans-in-errors="errorsFromImport.skill1LevelExceedsMaximum"
        />
        <manager-import-list-error
          message="manager.import.errors.skill2.not_found"
          :talismans-in-errors="errorsFromImport.skill2NotFound"
        />
        <manager-import-list-error
          message="manager.import.errors.skill2.is_empty"
          :talismans-in-errors="errorsFromImport.skill2IsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.skill2Level.is_empty"
          :talismans-in-errors="errorsFromImport.skill2LevelIsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.skill2Level.exceeds_maximum"
          :talismans-in-errors="errorsFromImport.skill2LevelExceedsMaximum"
        />
        <manager-import-list-error
          message="manager.import.errors.slots.not_found"
          :talismans-in-errors="errorsFromImport.slotsNotFound"
        />
      </div>
    </div>
  </div>
</template>
