<script setup lang="ts" />

<template>
  <div class="fullscreen bg-primary text-primary text-center q-pa-md flex flex-center row">
    <q-card>
      <q-card-section>
        <div class="app-error-code">
          {{ $t('error.not_found.code') }}
        </div>

        <div class="text-h2 app-error-caption">
          {{ $t('error.not_found.caption') }}
        </div>

        <q-btn
          class="q-mt-xl"
          color="primary"
          text-color="white"
          unelevated
          to="/"
          :label="$t('error.button.return_to_homepage.label')"
          no-caps
        />
      </q-card-section>
    </q-card>
  </div>
</template>
