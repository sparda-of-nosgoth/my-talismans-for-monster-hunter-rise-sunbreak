<script setup lang="ts" />

<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        <span class="text-h5">
          {{ $t('manager.help.title') }}
        </span>
      </q-toolbar-title>

      <q-btn
        flat
        v-close-popup
        round
        dense
        icon="close"
      ></q-btn>
    </q-toolbar>

    <q-card-section>
      <q-list>
        <!-- START: Search Section -->
        <q-expansion-item
          group="filters"
          expand-separator
          icon="search"
          :label="$t('manager.help.search.title')"
        >
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  {{ $t('manager.help.search.content') }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label
                  class="text-bold"
                  caption
                >
                  {{ $t('manager.help.search.sub_title_skill') }}
                </q-item-label>
                <q-item-label caption>
                  {{ $t('manager.help.search.sub_content_skill') }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label
                  class="text-bold"
                  caption
                >
                  {{ $t('manager.help.search.sub_title_slots') }}
                </q-item-label>
                <q-item-label caption>
                  {{ $t('manager.help.search.sub_content_slots') }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  {{ $t('manager.help.search.sub_content_combine_search') }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- END: Search Section -->
        <!-- START: Filter favorites Section -->
        <q-expansion-item
          group="filters"
          expand-separator
          icon="favorite"
          :label="$t('manager.help.filter_favorites.title')"
        >
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  {{ $t('manager.help.filter_favorites.content') }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- END: Filter favorites Section -->
        <!-- START: Filter to meld Section -->
        <q-expansion-item
          group="filters"
          expand-separator
          icon="recycling"
          :label="$t('manager.help.filter_to_meld.title')"
        >
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  {{ $t('manager.help.filter_to_meld.content') }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  {{ $t('manager.help.filter_to_meld.sub_content') }}
                  <q-list>
                    <q-item>
                      <q-item-section>
                        {{ $t('manager.help.filter_to_meld.sub_content_part_1') }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        {{ $t('manager.help.filter_to_meld.sub_content_part_2') }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        {{ $t('manager.help.filter_to_meld.sub_content_part_3') }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        {{ $t('manager.help.filter_to_meld.sub_content_part_4') }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        {{ $t('manager.help.filter_to_meld.sub_content_part_5') }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- END: Filter to meld Section -->
      </q-list>
    </q-card-section>
  </q-card>
</template>
