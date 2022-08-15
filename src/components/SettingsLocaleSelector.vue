<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n({ useScope: 'global' });
</script>

<template>
  <q-select
    v-model="locale"
    :label="$t('settings.language.label')"
    :options="availableLocales"
    :option-label="(item) => {
      return $t(`settings.language.${item}.label`);
    }"
    option-value="value"
    class="text-white"
    borderless
  />
</template>
