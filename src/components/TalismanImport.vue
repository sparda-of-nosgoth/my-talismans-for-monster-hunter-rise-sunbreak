<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTalismanImport } from 'src/composables/talisman-import';
import TalismanImportListError from 'components/TalismanImportListError.vue';
import { useQuasar } from 'quasar';
import _each from 'lodash/each';
import { useTalismanStore } from 'stores/talismans';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from 'src/composables/local-storage';

useLocalStorage();
const { notify } = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const talismanStore = useTalismanStore();
const talismanList = ref('');
const { errorsFromImport, talismansToImport } = useTalismanImport(talismanList);

const submitDisabled = computed(() => talismansToImport.value.length <= 0);

function submitImport() {
  try {
    _each(talismansToImport.value, (talisman) => {
      talismanStore.addTalisman(talisman);
    });
    notify({
      color: 'positive',
      position: 'bottom',
      message: t('talisman.import.success', { count: talismansToImport.value.length }),
      icon: 'check',
    });
  } catch (e) {
    const error = e as Error;
    // TODO-post-v1.0: find a better error message to display
    notify({
      color: 'negative',
      position: 'bottom',
      message: error.message,
      icon: 'report_problem',
    });
  }
}
</script>

<template>
  <div>
    <h2 class="text-h6">
      {{ $t('talisman.import.title') }}
    </h2>
    <q-form>
      <q-input
        v-model="talismanList"
        outlined
        type="textarea"
      />
      <div class="q-ma-md">
        <q-btn
          :label="$t('talisman.import.submit')"
          type="submit"
          :disable="submitDisabled"
          @click="submitImport"
        />
        <span class="q-pl-md">
          {{ $t('talisman.import.talismans_to_import', talismansToImport.length, { count: talismansToImport.length }) }}
        </span>
      </div>
    </q-form>
    <div>
      <talisman-import-list-error
        message="talisman.import.errors.skill1.not_found"
        :talismans-in-errors="errorsFromImport.skill1NotFound"
      />
      <talisman-import-list-error
        message="talisman.import.errors.skill1.is_empty"
        :talismans-in-errors="errorsFromImport.skill1IsEmpty"
      />
      <talisman-import-list-error
        message="talisman.import.errors.skill1Level.is_empty"
        :talismans-in-errors="errorsFromImport.skill1LevelIsEmpty"
      />
      <talisman-import-list-error
        message="talisman.import.errors.skill1Level.exceeds_maximum"
        :talismans-in-errors="errorsFromImport.skill1LevelExceedsMaximum"
      />
      <talisman-import-list-error
        message="talisman.import.errors.skill2.not_found"
        :talismans-in-errors="errorsFromImport.skill2NotFound"
      />
      <talisman-import-list-error
        message="talisman.import.errors.skill2.is_empty"
        :talismans-in-errors="errorsFromImport.skill2IsEmpty"
      />
      <talisman-import-list-error
        message="talisman.import.errors.skill2Level.is_empty"
        :talismans-in-errors="errorsFromImport.skill2LevelIsEmpty"
      />
      <talisman-import-list-error
        message="talisman.import.errors.skill2Level.exceeds_maximum"
        :talismans-in-errors="errorsFromImport.skill2LevelExceedsMaximum"
      />
      <talisman-import-list-error
        message="talisman.import.errors.slots.not_found"
        :talismans-in-errors="errorsFromImport.slotsNotFound"
      />
    </div>
  </div>
</template>
