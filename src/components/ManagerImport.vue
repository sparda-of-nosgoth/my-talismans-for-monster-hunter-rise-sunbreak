<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTalismanImport } from 'src/composables/talisman-import';
import ManagerImportListError from 'components/ManagerImportListError.vue';
import { useQuasar } from 'quasar';
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
    talismanStore.addTalismans(talismansToImport.value);
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
          message="manager.import.errors.primary_skill.not_found"
          :talismans-in-errors="errorsFromImport.primarySkillNotFound"
        />
        <manager-import-list-error
          message="manager.import.errors.primary_skill.is_empty"
          :talismans-in-errors="errorsFromImport.primarySkillIsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.primarySkillLevel.is_empty"
          :talismans-in-errors="errorsFromImport.primarySkillLevelIsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.primarySkillLevel.exceeds_maximum"
          :talismans-in-errors="errorsFromImport.primarySkillLevelExceedsMaximum"
        />
        <manager-import-list-error
          message="manager.import.errors.secondary_skill.not_found"
          :talismans-in-errors="errorsFromImport.secondarySkillNotFound"
        />
        <manager-import-list-error
          message="manager.import.errors.secondary_skill.is_empty"
          :talismans-in-errors="errorsFromImport.secondarySkillIsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.secondarySkillLevel.is_empty"
          :talismans-in-errors="errorsFromImport.secondarySkillLevelIsEmpty"
        />
        <manager-import-list-error
          message="manager.import.errors.secondarySkillLevel.exceeds_maximum"
          :talismans-in-errors="errorsFromImport.secondarySkillLevelExceedsMaximum"
        />
        <manager-import-list-error
          message="manager.import.errors.slots.not_found"
          :talismans-in-errors="errorsFromImport.slotsNotFound"
        />
      </div>
    </div>
  </div>
</template>
