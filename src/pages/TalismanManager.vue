<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { TalismanFilter, useTalismanFilter } from 'src/composables/talisman-filter';
import { useTalismanStore } from 'stores/talismans';
import { useI18n } from 'vue-i18n';
import TalismanActionToggles from 'components/TalismanActionToggles.vue';
import TalismanDeleteButton from 'components/TalismanDeleteButton.vue';
import { Skill } from 'src/models/skill';
import { Slots } from 'src/models/slots';
import { Talisman } from 'src/models/talisman';
import TalismanSlots from 'components/TalismanSlots.vue';
import TalismanCard from 'components/TalismanCard.vue';
import { useManagerStore } from 'stores/manager';
import { storeToRefs } from 'pinia';

const { t } = useI18n({ useScope: 'global' });
const { talismans } = useTalismanStore();
const { filteredTalismans, filters } = storeToRefs(useManagerStore());
const { filterTalismans } = useTalismanFilter();

const columns = computed(() => [
  {
    name: 'actions_prefix',
    style: 'width: 150px',
    sortable: false,
  },
  {
    name: 'skill1',
    style: 'width: 25em',
    required: true,
    label: t('manager.talisman.list.header.skill1'),
    field: 'skill1',
    sortable: true,
    sort: (skillA:Skill, skillB:Skill) => t(skillA.id).localeCompare(t(skillB.id)),
  },
  {
    name: 'skill2',
    style: 'width: 25em',
    required: true,
    label: t('manager.talisman.list.header.skill2'),
    field: 'skill2',
    sortable: true,
    sort: (skillA:Skill, skillB:Skill) => t(skillA.id).localeCompare(t(skillB.id)),
  },
  {
    name: 'slots',
    style: 'width: 20em',
    label: t('manager.talisman.list.header.slots'),
    align: 'center',
    field: 'slots',
    sortable: true,
    sort: (a:Slots, b:Slots) => Number(`${a.slot1}${a.slot2}${a.slot3}`) - Number(`${b.slot1}${b.slot2}${b.slot3}`),
  },
  {
    name: 'actions_suffix',
    style: 'width: 100px',
    sortable: false,
  },
]);

function filterTable(rows: Talisman[], filterOptions: TalismanFilter) {
  const filteredRows = filterTalismans(rows, filterOptions);
  filteredTalismans.value = filteredRows.length;
  return filteredRows;
}

onMounted(() => {
  filteredTalismans.value = talismans.length;
});
</script>

<template>
  <q-page class="full-width q-pa-md">
    <!-- START: QTable -->
    <q-table
      :grid="$q.screen.xs || $q.screen.sm"
      :rows="talismans"
      :row-key="row => `${row.skill1?.id}-${row.skill1Level}-${row.skill2?.id}-${row.skill2Level}-${row.slots?.id}`"
      :columns="columns"
      :filter="filters"
      :filter-method="filterTable"
      :no-data-label="$t('manager.talisman.list.no_data')"
      :no-results-label="$t('manager.talisman.list.no_data')"
      hide-pagination
      :pagination="{rowsPerPage: 0}"
    >
      <!-- START: Template: Row -->
      <template #body="props">
        <q-tr :props="props">
          <q-td
            key="actions_prefix"
            :props="props"
          >
            <div class="row">
              <talisman-action-toggles :talisman="props.row" />
            </div>
          </q-td>
          <q-td
            key="skill1"
            :props="props"
          >
            <span>
              {{ `${$t(props.row.skill1.id)} ${props.row.skill1Level}` }}
            </span>
          </q-td>
          <q-td
            key="skill2"
            :props="props"
          >
            <span v-if="props.row.skill2 != null">
              {{ `${$t(props.row.skill2.id)} ${props.row.skill2Level}` }}
            </span>
          </q-td>
          <q-td
            key="slots"
            :props="props"
          >
            <talisman-slots :talisman="props.row" />
          </q-td>
          <q-td
            key="actions_suffix"
            :props="props"
          >
            <talisman-delete-button :talisman="props.row" />
          </q-td>
        </q-tr>
      </template>
      <!-- END: Template: Row -->
      <!-- START: Template: Grid -->
      <template #item="item">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <talisman-card :talisman="item.row" />
        </div>
      </template>
      <!-- END: Template: Grid -->
    </q-table>
    <!-- END: QTable -->
  </q-page>
</template>
