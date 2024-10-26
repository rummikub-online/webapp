<template>
  <Button @click="isOpen = true">
    <div class="flex gap-2">
      <BookOpenIcon class="size-4 text-body-text" />
    </div>
  </Button>
  <UModal v-model="isOpen" :ui="{ background: 'bg-body-bg' }">
    <div class="p-4">
      <h2 class="px-1 mb-6 flex justify-between">
        {{ t("rules.title") }}
        <button class="p-2 -my-2">
          <XMarkIcon class="size-4 text-body-text" @click="isOpen = false" />
        </button>
      </h2>

      <GameRules />
    </div>
  </UModal>
</template>
<script setup lang="ts">
import { BookOpenIcon, XMarkIcon } from "@heroicons/vue/20/solid";

const isOpen = defineModel<boolean>({
  required: false,
  default: false
});

const { t } = useI18n();
</script>