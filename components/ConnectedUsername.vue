<script setup lang="ts">
const props = defineProps<{
  username: string;
  isConnected: boolean;
}>();
</script>
<template>
  <span
    class="relative flex gap-2 items-center bg-card-bg rounded-full px-3 py-1"
  >
    <span
      class="rounded-full size-2.5"
      :class="isConnected ? 'bg-button-text-success' : 'bg-button-text-danger'"
    ></span>

    <span>{{ username }}</span>
  </span>
</template>
