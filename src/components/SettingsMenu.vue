<script setup lang="ts">
import SettingsClearData from 'components/SettingsClearData.vue';
import SettingsLocaleSelector from 'components/SettingsLocaleSelector.vue';
import AppVersion from 'components/AppVersion.vue';
import SettingsRemoteSave from 'components/SettingsRemoteSave.vue';

</script>

<template>
  <div class="q-pa-md fixed-bottom">
    <q-list separator>
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
          <settings-remote-save />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <settings-clear-data />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <div class="row items-center no-wrap">
      <span class="text-caption">
        &copy; 2022 <a href="https://gitlab.com/sparda-of-nosgoth">Sparda of Nosgoth</a>
      </span>
      <q-space />
      <app-version />
    </div>
  </div>
</template>
