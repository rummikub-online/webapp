<script setup lang="ts">
const props = defineProps<{
  usernames: Record<string, boolean>;
}>();
</script>
<template>
  <ul class="flex items-end gap-2 text-sm">
    <li
      v-for="(isConnected, username) in usernames"
      :key="username"
      class="relative flex gap-2 items-center bg-card-bg rounded-full px-3 py-1"
    >
      <span
        class="rounded-full size-2.5"
        :class="
          isConnected ? 'bg-button-text-success' : 'bg-button-text-danger'
        "
      ></span>

      <span>{{ username }}</span>
    </li>
  </ul>
</template>
