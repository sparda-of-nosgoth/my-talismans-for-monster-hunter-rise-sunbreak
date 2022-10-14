<script setup lang="ts">
import { ref } from 'vue';
import _cloneDeep from 'lodash/cloneDeep';
import { useSkillFilter } from 'src/composables/skill-filter';
import { useTalismanValidator } from 'src/composables/talisman-validator';
import { Talisman } from 'src/models/talisman';
import ManagerTalismanFormSlots from 'components/ManagerTalismanFormSlots.vue';
import { QSelect } from 'quasar';
import { useTalismanStore } from 'stores/talismans';
import { sortedSkillsFoundOnTalismanOnly } from 'src/models/skill';

const { addTalisman } = useTalismanStore();
const talisman = ref<Talisman>(new Talisman({
  slotsId: '0-0-0',
}));
const { filteredSkills, filterSkillByName } = useSkillFilter(sortedSkillsFoundOnTalismanOnly);
const { errors, isValid } = useTalismanValidator(talisman);

function filterSkills(needle: string, update: (callback: () => void) => void): void {
  update(() => {
    filterSkillByName(needle);
  });
}

function onSubmit() {
  // If there is no errors, we add talisman to list
  if (isValid.value) {
    addTalisman(_cloneDeep(talisman.value));
  }
}
</script>

<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        <span class="text-h5">
          {{ $t('manager.talisman.form.label') }}
        </span>
      </q-toolbar-title>
    </q-toolbar>
    <q-card-section class="row items-center no-wrap">
      <div class="q-pa-md full-width">
        <q-form
          @submit="onSubmit"
          greedy
        >
          <div>
            <q-select
              v-model="talisman.primarySkill"
              :options="filteredSkills"
              :option-label="(skill) => $t(skill.id)"
              :label="$t('manager.talisman.form.primary_skill.label')"
              lazy-rules
              :rules="[
                () => !errors.primarySkill.isEmpty || $t('manager.talisman.validation.primary_skill.is_empty'),
                () => !errors.primarySkill.notFound || $t('manager.talisman.validation.primary_skill.not_found'),
                () => !errors.primarySkillLevel.isEmpty || $t('manager.talisman.validation.primarySkillLevel.is_empty'),
                () => !errors.primarySkillLevel.exceedsMaximum || $t('manager.talisman.validation.primarySkillLevel.exceeds_maximum', { level: talisman.primarySkillLevel, level_maximum: talisman.primarySkill?.levelMaximum }),
              ]"
              input-debounce="0"
              use-input
              @filter="filterSkills"
            />
            <q-slider
              v-model="talisman.primarySkillLevel"
              :min="1"
              :max="4"
              class="q-pa-sm"
              marker-labels
            />
            <q-select
              v-model="talisman.secondarySkill"
              :options="filteredSkills"
              :option-label="(skill) => $t(skill.id)"
              :label="$t('manager.talisman.form.secondary_skill.label')"
              lazy-rules
              :rules="[
                () => !errors.secondarySkill.notFound || $t('manager.talisman.validation.secondary_skill.not_found'),
                () => !errors.secondarySkill.isEmpty || $t('manager.talisman.validation.secondary_skill.is_empty'),
                () => !errors.secondarySkillLevel.isEmpty || $t('manager.talisman.validation.secondarySkillLevel.is_empty'),
                () => !errors.secondarySkillLevel.exceedsMaximum || $t('manager.talisman.validation.secondarySkillLevel.exceeds_maximum', { level: talisman.secondarySkillLevel, level_maximum: talisman.secondarySkill?.levelMaximum }),
              ]"
              input-debounce="0"
              use-input
              @filter="filterSkills"
            />
            <q-slider
              v-model="talisman.secondarySkillLevel"
              :min="0"
              :max="4"
              class="q-pa-sm"
              marker-labels
            />
          </div>
          <div class="row q-pa-sm">
            <span class="text-bold">{{ $t('manager.talisman.form.slots.label') }}</span>
            <div class="row q-pa-sm full-width justify-center">
              <manager-talisman-form-slots v-model="talisman.slots" />
            </div>
            <div v-if="errors.slots.notFound">
              <q-icon
                name="error"
                color="red"
                size="sm"
              />
              <span class="text-caption text-red">{{ $t('manager.talisman.validation.slots.not_found') }}</span>
            </div>
          </div>
          <div class="row items-center no-wrap">
            <q-btn
              type="submit"
              color="primary"
              :label="$t('manager.talisman.form.button.submit.label')"
            />
            <q-space />
            <q-btn
              v-close-popup
              :label="$t('manager.talisman.form.button.cancel.label')"
            />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>
