<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from 'stores/settings';
import { watch } from 'vue';

const settings = useSettingsStore();
const { locale, availableLocales } = useI18n({ useScope: 'global' });

watch(locale, (newLocale: string) => {
  settings.updateLocale(newLocale);
});
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
