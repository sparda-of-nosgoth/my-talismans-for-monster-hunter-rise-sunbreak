<script setup lang="ts">
import AppMenuLink from 'components/AppMenuLink.vue';
import SettingsClearData from 'components/SettingsClearData.vue';
import SettingsLocaleSelector from 'components/SettingsLocaleSelector.vue';
import AppVersion from 'components/AppVersion.vue';

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

  <div class="q-pa-md fixed-bottom">
    <q-list>
      <q-item-label header>
        {{ $t('menu.settings') }}
      </q-item-label>
      <q-item>
        <q-item-section>
          <settings-locale-selector />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <settings-clear-data />
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
    <div class="row items-center no-wrap">
      <span class="text-caption">
        &copy; 2022 <a href="https://gitlab.com/sparda-of-nosgoth">Sparda of Nosgoth</a>
      </span>
      <q-space />
      <app-version />
    </div>
  </div>
</template>
