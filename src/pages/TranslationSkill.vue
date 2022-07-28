<script setup lang="ts">
import { useSkill } from 'src/composables/skill';
import { useSkillType } from 'src/composables/skillType';

const { skillTypes } = useSkillType();
const { filterSkillsByType } = useSkill();

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
          <span>{{ $t(skillType.name) }}</span>
        </div>
      </q-card-section>

      <q-card-section>
        <q-list separator>
          <q-item
            v-for="skill in filterSkillsByType(skillType)"
            :key="skill.id"
          >
            <q-item-section>
              <q-item-label>
                {{ $t(skill.name) }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t(skill.name, skill.name, { locale: 'en-US' }) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>
