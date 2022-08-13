<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { Quasar } from 'quasar';
import { quasarLangList } from 'src/utils/quasar-lang';

const { locale, availableLocales } = useI18n({ useScope: 'global' });

watch(locale, () => {
  // Load Quasar Language Pack
  if (locale.value === 'en') {
    quasarLangList['../../node_modules/quasar/lang/en-US.mjs']().then((lang) => {
      Quasar.lang.set(lang.default);
    });
  } else {
    quasarLangList[`../../node_modules/quasar/lang/${locale.value}.mjs`]().then((lang) => {
      Quasar.lang.set(lang.default);
    });
  }
}, { immediate: true });
</script>

<template>
  <q-select
    v-model="locale"
    :label="$t('options.language.label')"
    :options="availableLocales"
    :option-label="(item) => {
      return $t(`options.language.${item}.label`);
    }"
    option-value="value"
    class="text-white"
    borderless
  />
</template>
