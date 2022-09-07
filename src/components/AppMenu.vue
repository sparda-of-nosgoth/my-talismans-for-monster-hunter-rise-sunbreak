<script setup lang="ts">
import AppMenuLink from 'components/AppMenuLink.vue';
import SettingsMenu from 'components/SettingsMenu.vue';

const menuLinks = [
  {
    title: 'menu.talisman_manager.label',
    icon: 'img:icons/talisman_white.svg',
    link: '/',
  },
  {
    title: 'menu.skills_translation.label',
    icon: 'img:icons/skill.svg',
    link: '/skills/translation',
    separator: true,
  },
];
</script>

<template>
  <q-list>
    <q-item-label header>
      {{ $t('menu.header') }}
    </q-item-label>

    <app-menu-link
      v-for="link in menuLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>

  <settings-menu />
</template>
