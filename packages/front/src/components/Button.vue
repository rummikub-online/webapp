<script setup lang="ts">
defineProps<{
  type: "primary" | "secondary" | "danger" | "success";
  text?: string;
}>();
</script>
<template>
  <button
    @click="$emit('click')"
    type="button"
    class="h-8 px-4 rounded-md justify-center items-center gap-2 inline-flex"
    :class="{
      'text-button-danger': type === 'danger',
      'text-button-success': type === 'success',
      'text-body': type === 'primary' || type === 'secondary',
      'bg-white': type === 'primary' || type === 'danger' || type === 'success',
    }"
  >
    <slot name="prefix"></slot>
    <div class="text-sm font-bold font-sans">
      <template v-if="text">{{ text }}</template>
      <slot v-else></slot>
    </div>
    <slot name="suffix"></slot>
  </button>
</template>
