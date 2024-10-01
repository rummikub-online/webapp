<script setup lang="ts">
withDefaults(
  defineProps<{
    type: "primary" | "secondary" | "danger" | "success";
    text?: string;
    disabled?: boolean;
  }>(),
  { type: "primary" },
);
</script>
<template>
  <button
    @click="$emit('click')"
    type="button"
    :disabled="disabled"
    class="h-8 px-4 rounded-md justify-center items-center gap-2 inline-flex bg-button-bg"
    :class="{
      'text-button-text-danger': type === 'danger',
      'text-button-text-success': type === 'success',
      'text-body-text': type === 'primary' || type === 'secondary',
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
