<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n({ useScope: 'global' });
</script>

<template>
  <q-select
    v-model="locale"
    :options="availableLocales"
    option-value="value"
    class="text-white"
    borderless
  >
    <template #selected-item="item">
      {{ item.opt }}
    </template>
  </q-select>
</template>
