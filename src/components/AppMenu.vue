<script setup lang="ts">
import AppEssentialLink from 'components/AppEssentialLink.vue';
import AppLocaleSelector from 'components/AppLocaleSelector.vue';
import AppVersion from 'components/AppVersion.vue';

const essentialLinks = [
  {
    title: 'menu.talisman_manager.label',
    icon: 'manage_search',
    link: '/talismans/manager',
  },
  {
    title: 'menu.talisman_import_export.label',
    icon: 'drive_folder_upload',
    link: '/talismans/import_export',
    separator: true,
  },
  {
    title: 'menu.skill_type_translation.label',
    icon: 'translate',
    link: '/translations/skill',
    separator: true,
  },
];
</script>

<template>
  <q-list>
    <q-item-label header>
      {{ $t('menu.header') }}
    </q-item-label>

    <app-essential-link
      v-for="link in essentialLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>

  <div class="q-pa-md fixed-bottom">
    <div class="row items-center no-wrap">
      <app-locale-selector />
      <q-space />
      <app-version />
    </div>
  </div>
</template>
