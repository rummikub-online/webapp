<template>
  <main class="h-screen bg-body-bg flex flex-col items-center justify-center">
    <NuxtLink href="/game/create" target="_parent" no-prefetch class="mt-auto">
      <Button type="primary">{{ t("pages.home.create_game") }}</Button>
    </NuxtLink>
    <label class="flex flex-col mt-auto mb-8">
      <span>{{ t("pages.home.username") }}</span>
      <input v-model="username" class="border p-1" />
    </label>
  </main>
</template>
<script setup lang="ts">
const { username } = useUsername();
const { t } = useI18n();
</script>
