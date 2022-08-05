<script setup lang="ts">
import { ref, Slots } from 'vue';
import TalismanListFormAdd from 'components/TalismanManagerForm.vue';
import { Talisman, TalismanFilter, useTalisman } from 'src/composables/talisman';
import { Skill } from 'src/composables/skill';
import { useTalismanStore } from 'stores/talismans';
import { useI18n } from 'vue-i18n';
import TalismanManagerRowToggles from 'components/TalismanManagerRowToggles.vue';

const { t } = useI18n({ useScope: 'global' });
const talismanStore = useTalismanStore();
const { filterTalismans } = useTalisman();

const columns = [
  {
    name: 'actions_prefix',
    style: 'width: 150px',
    sortable: false,
  },
  {
    name: 'skill1',
    style: 'width: 25em',
    required: true,
    label: t('talisman.manager.table.header.skill1'),
    // align: 'center',
    field: (row: Talisman) => row.skill1,
    sortable: true,
    sort: (skillA:Skill, skillB:Skill) => `${t(skillA.name)}`?.localeCompare(t(skillB.name)),
  },
  {
    name: 'skill2',
    style: 'width: 25em',
    required: true,
    label: t('talisman.manager.table.header.skill2'),
    // align: 'center',
    field: (row: Talisman) => (row.skill2 ?? null),
    sortable: true,
    sort: (skillA:Skill, skillB:Skill) => t(skillA.name)?.localeCompare(t(skillB.name)),
  },
  {
    name: 'slots',
    style: 'width: 20em',
    label: t('talisman.manager.table.header.slots'),
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
];
const filter = ref<TalismanFilter>({
  filterFavorite: false,
  filterForMelting: false,
  search: '',
});
const dialog = ref(false);

function openDialog() {
  dialog.value = true;
}
</script>

<template>
  <q-page class="full-width row wrap justify-center">
    <div class="full-width q-pa-md">
      <div class="q-gutter-y-md">
        <q-table
          :grid="$q.screen.xs || $q.screen.sm"
          :grid-header="$q.screen.xs || $q.screen.sm"
          :title="$t('talisman.manager.table.label')"
          :rows="talismanStore.talismans"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :filter-method="filterTalismans"
          hide-pagination
          :pagination="{rowsPerPage: 0}"
        >
          <template #top-right>
            <q-toggle
              v-model="filter.filterFavorite"
              icon="favorite"
            />
            <q-toggle
              v-model="filter.filterForMelting"
              icon="recycling"
            />
            <q-input
              v-model="filter.search"
              dense
              debounce="300"
              :placeholder="$t('talisman.manager.table.search')"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <!-- Row mode template-->
          <template #body="props">
            <q-tr :props="props">
              <q-td
                key="actions_prefix"
                :props="props"
              >
                <div class="row">
                  <talisman-manager-row-toggles
                    :talisman="props.row"
                    @toggle-favorite="() => talismanStore.toggleFavorite(props.row)"
                    @toggle-for-melting="() => talismanStore.toggleForMelting(props.row)"
                  />
                </div>
              </q-td>
              <q-td
                key="skill1"
                :props="props"
              >
                <span>
                  {{ `${$t(props.row.skill1.name)} ${props.row.skill1Level}` }}
                </span>
              </q-td>
              <q-td
                key="skill2"
                :props="props"
              >
                <span v-if="props.row.skill2 != null">
                  {{ `${$t(props.row.skill2.name)} ${props.row.skill2Level}` }}
                </span>
              </q-td>
              <q-td
                key="slots"
                :props="props"
              >
                <div>
                  {{ `${props.row.slots.slot1}-${props.row.slots.slot2}-${props.row.slots.slot3}` }}
                </div>
              </q-td>
              <q-td
                key="actions_suffix"
                :props="props"
              >
                <q-btn
                  outline
                  color="red"
                  icon="delete"
                  @click="() => talismanStore.deleteTalisman(props.row)"
                />
              </q-td>
            </q-tr>
          </template>
          <!-- Grid mode template-->
          <template #item="item">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <q-card>
                <q-card-section horizontal>
                  <!--            TODO : MOVE STYLE ELSEWHERE-->
                  <q-card-section
                    vertical
                    style="min-height: 138px;"
                  >
                    <q-card-section vertical>
                      <span>
                        {{ `${$t(item.row.skill1.name)} ${item.row.skill1Level}` }}
                      </span>
                    </q-card-section>
                    <q-card-section vertical>
                      <span v-if="item.row.skill2 != null">
                        {{ `${$t(item.row.skill2.name)} ${item.row.skill2Level}` }}
                      </span>
                    </q-card-section>
                  </q-card-section>
                  <q-separator vertical></q-separator>
                  <q-card-section
                    class="flex flex-center"
                    vertical
                  >
                    <div>{{ `${item.row.slots.slot1}-${item.row.slots.slot2}-${item.row.slots.slot3}` }}</div>
                  </q-card-section>
                </q-card-section>

                <q-separator></q-separator>

                <q-card-actions>
                  <talisman-manager-row-toggles
                    :talisman="item.row"
                    @toggle-favorite="() => talismanStore.toggleFavorite(item.row)"
                    @toggle-for-melting="() => talismanStore.toggleForMelting(item.row)"
                  />
                  <q-space />
                  <q-btn
                    outline
                    color="red"
                    icon="delete"
                    @click="() => talismanStore.deleteTalisman(item.row)"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </template>
        </q-table>
        <!-- Btn: To display Dialog for Talisman Form -->
        <q-page-sticky
          position="bottom-right"
          :offset="[30, 30]"
        >
          <q-btn
            fab
            icon="add"
            class="bg-white"
            @click="openDialog"
          />
        </q-page-sticky>
        <!-- Dialog: Talisman Form -->
        <q-dialog
          v-model="dialog"
          position="right"
        >
          <q-card style="width: 350px">
            <q-card-section class="row items-center no-wrap">
              <talisman-list-form-add @created="talismanStore.addTalisman" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>
