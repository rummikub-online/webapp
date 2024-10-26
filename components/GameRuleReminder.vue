<template>
  <div v-if="isVisible" class="relative bg-button-bg rounded-md p-3 flex gap-2">
    <BookOpenIcon class="size-5 " />

    <button v-if="dismissible" class="absolute z-10 top-0 right-0 p-2">
      <XMarkIcon class="size-5 text-body-text" @click="hide" />
    </button>

    <div class="flex flex-col gap-1 text-sm">
      <p class="font-bold">{{ title }}</p>

      <slot />
    </div>

    <button @click="openDetailsModal" class="absolute inset-0">
      <span class="sr-only">{{ t("rules.see_details", [title]) }}</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { BookOpenIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useGameRuleReminder } from "@/composables/useGameRuleReminder";
import type { GameRule } from "@/utils/types/gamerule";
import GameRulesModal from "@/components/GameRulesModal.vue";

const props = defineProps<{
  gameRule: GameRule;
  dismissible?: boolean;
  title?: string
}>();

const { t } = useI18n();

const title = computed(() => props.title ?? t(`rules.${props.gameRule}.title`));
const { isVisible, hide } = useGameRuleReminder(props.gameRule);

const modal = useModal();
const openDetailsModal = () => {
  modal.open(GameRulesModal, { defaultOpen: props.gameRule });
};
</script>