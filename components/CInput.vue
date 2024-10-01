<template>
  <UInput
    v-model="model"
    variant="none"
    class="bg-button-bg rounded-md border"
  />
</template>
<script setup lang="ts" generic="T extends string | number | undefined">
defineProps<{
  type?: "text";
}>();

const model = defineModel<T>();
</script>
