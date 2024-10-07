<template>
  <main class="h-screen bg-body-bg flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-8">
      <NuxtLink
        href="/games/create"
        target="_parent"
        no-prefetch
        class="mt-auto"
      >
        <Button type="primary">{{ t("pages.home.create_game") }}</Button>
      </NuxtLink>

      <div class="flex gap-2">
        <label class="flex flex-col mt-auto">
          <span>{{ t("pages.home.code_join_game") }}</span>

          <input
            v-model="joinRoomId"
            @keydown.enter="joinRoom"
            class="border p-1"
          />
        </label>

        <NuxtLink :href="getJoinRoomUrl" class="mt-auto">
          <Button type="primary">{{ t("pages.home.join_game") }}</Button>
        </NuxtLink>
      </div>

      <label class="flex flex-col mt-auto">
        <span>{{ t("pages.home.username") }}</span>

        <input v-model="username" class="border p-1" />
      </label>
    </div>
  </main>
</template>
<script setup lang="ts">
const { username } = useUsername();
const { t } = useI18n();

const joinRoomId = ref("");
const getJoinRoomUrl = computed(() => `/games/${joinRoomId.value}`);
const joinRoom = () => navigateTo(getJoinRoomUrl.value);
</script>
