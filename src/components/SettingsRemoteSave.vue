<script setup lang="ts">
import { decodeJwt } from 'jose';
import { CredentialResponse, GoogleSignInButton } from 'vue3-google-signin';
import { useSettingsStore } from 'stores/settings';
import { initRemoteStorage } from 'src/utils/remote-storage';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const { notify } = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const settings = useSettingsStore();

const handleOnError = () => {
  notify({
    message: t('settings.remote_save.login.error'),
    color: 'negative',
    icon: 'warning',
  });
};

const handleOnSuccess = async (response: CredentialResponse) => {
  try {
    const { email } = decodeJwt(String(response.credential));
    await initRemoteStorage(String(email));
  } catch (e) {
    handleOnError();
  }
};
</script>

<template>
  <q-item-label
    class="q-pa-sm items-center"
    header
  >
    {{ $t('settings.remote_save.title') }}
    <q-icon
      name="help"
      size="xs"
    >
      <q-tooltip :delay="500">
        {{ $t('settings.remote_save.tooltip') }}
      </q-tooltip>
    </q-icon>
  </q-item-label>
  <div
    v-if="!settings.remoteSave.enabled"
    class="row justify-center"
  >
    <google-sign-in-button
      size="medium"
      @success="handleOnSuccess"
      @error="handleOnError"
    />
  </div>
  <div v-else>
    <q-item-label
      class="q-pa-sm"
      caption
    >
      {{ $t('settings.remote_save.enabled', { account: settings.remoteSave.account }) }}
    </q-item-label>
    <div class="row justify-center">
      <q-btn
        :label="$t('settings.remote_save.logout.label')"
        @click="settings.disableRemoteSave"
      />
    </div>
  </div>
</template>
