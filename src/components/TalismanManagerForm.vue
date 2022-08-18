<script setup lang="ts">
import { ref, watch } from 'vue';
import _cloneDeep from 'lodash/cloneDeep';
import { useSkillFilter } from 'src/composables/skill-filter';
import { useTalismanValidator } from 'src/composables/talisman-validator';
import TalismanManagerFormErrorCaption from 'components/TalismanManagerFormErrorCaption.vue';
import { useSkillStore } from 'stores/skills';
import { Talisman } from 'src/models/talisman';
import { useSlotsStore } from 'stores/slots';

const emit = defineEmits<{(e: 'created', talisman: Talisman): void}>();

const { sortedSkillsFoundOnTalismanOnly } = useSkillStore();
const { getSlotsById } = useSlotsStore();
const talisman = ref<Talisman>(new Talisman({
  slots: getSlotsById('0-0-0'),
}));
const { filteredSkills, filterSkillByName } = useSkillFilter(sortedSkillsFoundOnTalismanOnly);
const { errors, isValid } = useTalismanValidator(talisman);

function filterSkills(needle: string, update: (callback: () => void) => void): void {
  update(() => {
    filterSkillByName(needle);
  });
}

watch(
  [() => talisman.value.slots.slot1, () => talisman.value.slots.slot2, () => talisman.value.slots.slot3],
  ([slot1, slot2, slot3]) => {
    talisman.value.slots.id = `${slot1}-${slot2}-${slot3}`;
  },
  { deep: true },
);

function onSubmit() {
  // If there is no errors
  if (isValid.value) {
    emit('created', _cloneDeep(talisman.value));
  }
}
</script>

<template>
  <div class="q-pa-md">
    <span class="text-h5">
      {{ $t('talisman.manager.form_add.label') }}
    </span>
    <q-form
      @submit="onSubmit"
    >
      <div>
        <q-select
          v-model="talisman.skill1"
          :options="filteredSkills"
          :option-label="(skill) => $t(skill.id)"
          :label="$t('talisman.manager.form_add.skill1.label')"
          class="q-pa-sm"
          lazy-rules
          :rules="[
            () => !errors.skill1.isEmpty || $t('talisman.validation.skill1.is_empty'),
            () => !errors.skill1.notFound || $t('talisman.validation.skill1.not_found'),
            () => !errors.skill1Level.isEmpty || $t('talisman.validation.skill1Level.is_empty'),
            () => !errors.skill1Level.exceedsMaximum || $t('talisman.validation.skill1Level.exceeds_maximum', { level: talisman.skill1Level, level_maximum: talisman.skill1?.levelMaximum }),
          ]"
          input-debounce="0"
          use-input
          @filter="filterSkills"
        />
        <q-slider
          v-model="talisman.skill1Level"
          :min="1"
          :max="4"
          class="q-pa-sm"
          marker-labels
        />
        <q-select
          v-model="talisman.skill2"
          :options="filteredSkills"
          :option-label="(skill) => $t(skill.id)"
          :label="$t('talisman.manager.form_add.skill2.label')"
          class="q-pa-sm"
          lazy-rules
          :rules="[
            () => !errors.skill2.notFound || $t('talisman.validation.skill2.not_found'),
            () => !errors.skill2.isEmpty || $t('talisman.validation.skill2.is_empty'),
            () => !errors.skill2Level.isEmpty || $t('talisman.validation.skill2Level.is_empty'),
            () => !errors.skill2Level.exceedsMaximum || $t('talisman.validation.skill2Level.exceeds_maximum', { level: talisman.skill2Level, level_maximum: talisman.skill2?.levelMaximum }),
          ]"
          input-debounce="0"
          use-input
          @filter="filterSkills"
        />
        <q-slider
          v-model="talisman.skill2Level"
          :min="0"
          :max="4"
          class="q-pa-sm"
          marker-labels
        />
      </div>
      <div class="row q-gutter-md q-pa-sm items-center">
        <talisman-manager-form-error-caption
          v-if="errors.slots.notFound"
          message="talisman.validation.slots.not_found"
        />
        <q-btn-toggle
          v-model="talisman.slots.slot1"
          :options="[
            {label: '0', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
          ]"
        />
        <q-btn-toggle
          v-model="talisman.slots.slot2"
          :options="[
            {label: '0', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2},
          ]"
        />
        <q-btn-toggle
          v-model="talisman.slots.slot3"
          :options="[
            {label: '0', value: 0},
            {label: '1', value: 1},
          ]"
        />
      </div>
      <div class="row items-center no-wrap">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('talisman.manager.form_add.button.submit.label')"
        />
        <q-space />
        <q-btn
          v-close-popup
          :label="$t('talisman.manager.form_add.button.cancel.label')"
        />
      </div>
    </q-form>
  </div>
</template>
