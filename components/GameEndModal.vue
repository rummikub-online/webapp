<template>
  <UModal :ui="{ background: 'bg-body-bg' }">
    <div
      class="p-8 pt-6 overflow-y-auto flex flex-col text-center gap-8 items-center"
    >
      <div class="relative group">
        <img
          src="/images/first-place.png"
          class="size-32"
          height="512"
          width="512"
        />
        <a
          class="hidden absolute text-xs group-hover:block"
          href="https://www.flaticon.com/free-stickers/prize"
          title="prize stickers"
          >Created by Stickers</a
        >
      </div>

      <div class="space-y-1">
        <h2 class="text-2xl">
          {{ t("pages.game.ended.winner", { username: winnerUsername }) }}
        </h2>

        <p class="text">
          {{ t("pages.game.ended.title") }}
        </p>
      </div>

      <Button href="/">
        {{ t("pages.game.ended.back_home") }}
      </Button>
    </div>
  </UModal>
</template>
<script setup lang="ts">
defineProps<{
  winnerUsername?: string;
}>();

const modal = useModal();

const { t } = useI18n();
</script>
