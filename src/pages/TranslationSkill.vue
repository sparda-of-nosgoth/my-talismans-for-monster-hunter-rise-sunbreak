<script setup lang="ts">
import { useSkillStore } from 'stores/skills';

const { skillTypes, filterByType } = useSkillStore();
</script>

<template>
  <q-page class="full-width row wrap justify-center">
    <q-card
      v-for="skillType in skillTypes"
      :key="skillType.id"
      :name="skillType.id"
      class="q-ma-md col-11 col-md-5 col-lg-3"
    >
      <q-card-section>
        <div class="text-h6 text-center">
          <span>{{ $t(skillType.id) }}</span>
        </div>
      </q-card-section>

      <q-card-section>
        <q-list separator>
          <q-item
            v-for="skill in filterByType(skillType)"
            :key="skill.id"
          >
            <q-item-section>
              <q-item-label>
                {{ $t(skill.id) }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t(skill.id, skill.id, { locale: 'en' }) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>
