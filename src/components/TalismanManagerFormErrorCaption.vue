<script setup lang="ts">
defineProps<{
  message: string
}>();
</script>

<template>
  <div>
    <q-icon
      name="error"
      color="red"
      size="sm"
    />
    <span class="text-caption text-red">{{ $t(message) }}</span>
  </div>
</template>
