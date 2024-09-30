<template>
  <div class="pointer-events-none p-2 flex flex-col-reverse gap-0.5 text-xs">
    <span
      v-for="(action, index) in actions.toReversed()"
      :style="`opacity: ${1 / (index + 2)}`"
    >
      {{ action }}
    </span>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  actions: Array<string>;
}>();
</script>
