<script setup lang="ts">
import { TemporaryTalisman } from 'src/composables/talisman-import';

defineProps<{
  message: string
  talismansInErrors: TemporaryTalisman[]
}>();
</script>

<template>
  <q-list v-if="talismansInErrors.length > 0">
    <q-item>
      <q-item-section>
        <q-item-label header>
          {{ $t(message, talismansInErrors.length) }}
        </q-item-label>
        <q-list
          bordered
          padding
        >
          <q-item
            v-for="talisman in talismansInErrors"
            :key="talisman.skill1"
          >
            <q-item-section>
              <q-item-label>
                {{ `${talisman.skill1},${talisman.skill1Level},${talisman.skill2},${talisman.skill2Level},${talisman.slot1},${talisman.slot2},${talisman.slot3}` }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-item-section>
    </q-item>
  </q-list>
</template>
