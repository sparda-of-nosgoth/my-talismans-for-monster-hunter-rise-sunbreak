<script setup lang="ts">
import AppMenuEssentialLink from 'components/AppMenuEssentialLink.vue';
import SettingsClearData from 'components/SettingsClearData.vue';
import SettingsLocaleSelector from 'components/SettingsLocaleSelector.vue';
import AppVersion from 'components/AppVersion.vue';

const essentialLinks = [
  {
    title: 'menu.talisman_manager.label',
    icon: 'img:images/icon_talisman_white.svg',
    link: '/',
  },
  {
    title: 'menu.skills_translation.label',
    icon: 'img:images/icon_skill.svg',
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

    <app-menu-essential-link
      v-for="link in essentialLinks"
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
      <q-space />
      <app-version />
    </div>
  </div>
</template>
