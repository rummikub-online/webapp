<template>
  <UModal :ui="{ background: 'bg-body-bg' }">
    <div class="p-4 overflow-y-auto">
      <h2 class="px-1 mb-6 flex justify-between">
        {{ t("rules.title") }}

        <button class="p-2 -my-2">
          <XMarkIcon class="size-4 text-body-text" @click="modal.close" />
        </button>
      </h2>

      <GameRules :default-open="defaultOpen" />
    </div>
  </UModal>
</template>
<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/20/solid";
import type { GameRule } from "@/utils/types/gamerule";

defineProps<{
  defaultOpen?: GameRule;
}>();

const modal = useModal();

const { t } = useI18n();
</script>