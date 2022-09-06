<script setup lang="ts">
import { Talisman } from 'src/models/talisman';
import TalismanActionToggles from 'components/TalismanActionToggles.vue';
import TalismanSlots from 'components/TalismanSlots.vue';
import TalismanDeleteButton from 'components/TalismanDeleteButton.vue';

defineProps<{
  talisman: Talisman
}>();
</script>

<template>
  <q-card>
    <q-card-section horizontal>
      <q-card-section
        class="talisman-card-skills row col-6 items-center"
        vertical
      >
        <span class="col-12">
          {{ `${$t(talisman.skill1.id)} ${talisman.skill1Level}` }}
        </span>
        <span
          class="col-12"
          v-if="talisman.skill2 != null"
        >
          {{ `${$t(talisman.skill2.id)} ${talisman.skill2Level}` }}
        </span>
      </q-card-section>
      <q-separator vertical></q-separator>
      <q-card-section
        class="row col-6 justify-center items-center"
        vertical
      >
        <talisman-slots :talisman="talisman" />
      </q-card-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-actions>
      <talisman-action-toggles :talisman="talisman" />
      <q-space />
      <talisman-delete-button :talisman="talisman" />
    </q-card-actions>
  </q-card>
</template>
