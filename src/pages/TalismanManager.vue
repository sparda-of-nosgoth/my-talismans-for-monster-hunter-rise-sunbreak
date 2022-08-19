<script setup lang="ts">
import { computed, ref } from 'vue';
import TalismanListFormAdd from 'components/TalismanManagerForm.vue';
import { TalismanFilter, useTalismanFilter } from 'src/composables/talisman-filter';
import { useTalismanStore } from 'stores/talismans';
import { useI18n } from 'vue-i18n';
import TalismanManagerRowToggles from 'components/TalismanManagerRowToggles.vue';
import { Skill } from 'src/models/skill';
import { Slots } from 'src/models/slots';
import { Talisman } from 'src/models/talisman';
import TalismanSlots from 'components/TalismanSlots.vue';
import TalismanManagerHelpDialog from 'components/TalismanManagerHelpDialog.vue';

const { t } = useI18n({ useScope: 'global' });
const talismanStore = useTalismanStore();
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
    label: t('talisman.manager.table.header.skill1'),
    field: 'skill1',
    sortable: true,
    sort: (skillA:Skill, skillB:Skill) => t(skillA.id).localeCompare(t(skillB.id)),
  },
  {
    name: 'skill2',
    style: 'width: 25em',
    required: true,
    label: t('talisman.manager.table.header.skill2'),
    field: 'skill2',
    sortable: true,
    sort: (skillA:Skill, skillB:Skill) => t(skillA.id).localeCompare(t(skillB.id)),
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
]);

const talismanRows = ref(talismanStore.talismans.length);
const filter = ref<TalismanFilter>({
  search: '',
  showFavorite: false,
  showMeldingFilter: false,
  options: {
    meldingFilter: {
      skipFavorite: true,
    },
  },
});

function filterTable(talismans: Talisman[], filterOptions: TalismanFilter) {
  const filteredTalismans = filterTalismans(talismans, filterOptions);
  talismanRows.value = filteredTalismans.length;
  return filteredTalismans;
}

const talismanFormDialog = ref(false);

function showTalismanFormDialog() {
  talismanFormDialog.value = true;
}

const helpDialog = ref(false);

function showHelpDialog() {
  helpDialog.value = true;
}
</script>

<template>
  <q-page class="full-width row wrap justify-center">
    <div class="full-width q-pa-md">
      <div class="q-gutter-y-md">
        <!-- START: QTable -->
        <q-table
          :grid="$q.screen.xs || $q.screen.sm"
          :grid-header="$q.screen.xs || $q.screen.sm"
          :rows="talismanStore.talismans"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :filter-method="filterTable"
          :no-data-label="$t('talisman.manager.table.no_data')"
          :no-results-label="$t('talisman.manager.table.no_data')"
          hide-pagination
          :pagination="{rowsPerPage: 0}"
        >
          <!-- START: Template: Top left -->
          <template #top-left>
            <span class="q-table__title">
              <q-icon
                name="img:src/assets/images/item_talisman_white.svg"
                size="lg"
              />
              {{ $t('talisman.manager.table.label') }}
              <q-badge
                v-if="talismanRows > 0"
                align="top"
              >{{ talismanRows }}</q-badge>
            </span>
          </template>
          <!-- END: Template: Top left -->
          <!-- START: Template: Top right -->
          <template #top-right>
            <q-toggle
              v-model="filter.showMeldingFilter"
              icon="recycling"
              :aria-label="$t('talisman.manager.tooltip.toggle_show_to_meld')"
            >
              <q-tooltip :delay="1000">
                {{ $t('talisman.manager.tooltip.toggle_show_to_meld') }}
              </q-tooltip>
            </q-toggle>
            <q-toggle
              v-model="filter.showFavorite"
              icon="favorite"
              :aria-label="$t('talisman.manager.tooltip.toggle_show_favorite')"
            >
              <q-tooltip :delay="1000">
                {{ $t('talisman.manager.tooltip.toggle_show_favorite') }}
              </q-tooltip>
            </q-toggle>
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
            <q-btn
              flat
              round
              color="primary"
              icon="info"
              @click="showHelpDialog"
            />
          </template>
          <!-- END: Template: Top right -->
          <!-- START: Template: Row -->
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
                    @toggle-for-melding="() => talismanStore.toggleForMelding(props.row)"
                  />
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
                <q-btn
                  outline
                  color="red"
                  icon="delete"
                  :aria-label="$t('talisman.manager.tooltip.delete_talisman')"
                  @click="() => talismanStore.deleteTalisman(props.row)"
                >
                  <q-tooltip :delay="1000">
                    {{ $t('talisman.manager.tooltip.delete_talisman') }}
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
          <!-- END: Template: Row -->
          <!-- START: Template: Grid -->
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
                        {{ `${$t(item.row.skill1.id)} ${item.row.skill1Level}` }}
                      </span>
                    </q-card-section>
                    <q-card-section vertical>
                      <span v-if="item.row.skill2 != null">
                        {{ `${$t(item.row.skill2.id)} ${item.row.skill2Level}` }}
                      </span>
                    </q-card-section>
                  </q-card-section>
                  <q-separator vertical></q-separator>
                  <q-card-section
                    class="flex flex-center"
                    vertical
                  >
                    <talisman-slots :talisman="item.row" />
                  </q-card-section>
                </q-card-section>

                <q-separator></q-separator>

                <q-card-actions>
                  <talisman-manager-row-toggles
                    :talisman="item.row"
                    @toggle-favorite="() => talismanStore.toggleFavorite(item.row)"
                    @toggle-for-melding="() => talismanStore.toggleForMelding(item.row)"
                  />
                  <q-space />
                  <q-btn
                    outline
                    color="red"
                    icon="delete"
                    :aria-label="$t('talisman.manager.tooltip.delete_talisman')"
                    @click="() => talismanStore.deleteTalisman(item.row)"
                  >
                    <q-tooltip :delay="1000">
                      {{ $t('talisman.manager.tooltip.delete_talisman') }}
                    </q-tooltip>
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </template>
          <!-- END: Template: Grid -->
        </q-table>
        <!-- END: QTable -->
        <!-- START: QPageSticky: To display Dialog for Talisman Form -->
        <q-page-sticky
          position="bottom-right"
          :offset="[30, 30]"
        >
          <q-btn
            fab
            icon="add"
            class="bg-white"
            :aria-label="$t('talisman.manager.tooltip.add_talisman')"
            @click="showTalismanFormDialog"
          >
            <q-tooltip :delay="1000">
              {{ $t('talisman.manager.tooltip.add_talisman') }}
            </q-tooltip>
          </q-btn>
        </q-page-sticky>
        <!-- END: QPageSticky: To display Dialog for Talisman Form -->
        <!-- START: QDialog: Talisman Form -->
        <q-dialog
          v-model="talismanFormDialog"
          position="right"
        >
          <q-card style="width: 350px">
            <q-card-section class="row items-center no-wrap">
              <talisman-list-form-add @created="talismanStore.addTalisman" />
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- END: QDialog: Talisman Form -->
        <!-- START: QDialog: Help -->
        <talisman-manager-help-dialog v-model="helpDialog" />
        <!-- END: QDialog: Help -->
      </div>
    </div>
  </q-page>
</template>
