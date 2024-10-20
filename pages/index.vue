<template>
  <main class="h-dvh bg-body-bg flex flex-col items-center justify-center">
    <div class="mt-auto flex flex-col gap-4 items-center mb-16">
      <div class="relative flex items-end">
        <Card class="-rotate-12 -mr-1" color="red" :number="7" />
        <Card class="mb-1" color="black" :number="0" />
        <Card class="rotate-12 -ml-1" color="blue" :number="7" />
      </div>
      <h1 class="text-4xl">Rummikub</h1>
    </div>

    <div class="flex flex-col items-center justify-center gap-4">
      <Button
        class="w-full"
        href="/games/create"
        target="_parent"
        no-prefetch
        type="primary"
        >{{ t("pages.home.create_game") }}</Button
      >

      <div class="flex gap-2 items-center w-full">
        <div class="h-px bg-separator grow" />
        <p class="text-body-text-disabled">{{ t("pages.home.or") }}</p>
        <div class="h-px bg-separator grow" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="flex flex-col mt-auto">
          <span class="text-sm mb-1">{{ t("pages.home.code_join_game") }}</span>
          <CInput
            :placeholder="123"
            v-model="joinRoomId"
            @keydown.enter="joinRoom"
            maxlength="3"
          />
        </label>

        <Button
          :href="getJoinRoomUrl"
          :disabled="isBlank(joinRoomId)"
          type="primary"
          >{{ t("pages.home.join_game") }}</Button
        >
      </div>
    </div>

    <label class="flex flex-col mt-auto mb-4">
      <span class="text-sm mb-1">{{ t("pages.home.username") }}</span>

      <CInput v-model="username" />
    </label>
  </main>
</template>
<script setup lang="ts">
const { username } = useUsername();
const { t } = useI18n();

const joinRoomId = ref("");
const getJoinRoomUrl = computed(() => `/games/${joinRoomId.value}`);
const joinRoom = () => navigateTo(getJoinRoomUrl.value);
</script>
