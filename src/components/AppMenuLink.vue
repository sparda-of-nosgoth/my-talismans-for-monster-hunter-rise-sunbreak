<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  link?: string
  icon?: string
  separator?: boolean
}>(), {
  link: '#',
  icon: '',
  separator: false,
});
</script>

<template>
  <q-item
    clickable
    tag="a"
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon
        :name="icon"
        size="md"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ $t(title) }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator v-if="separator" />
</template>
