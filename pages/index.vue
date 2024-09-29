<template>
  <main class="h-screen bg-body-bg flex flex-col items-center justify-center">
    <NuxtLink :href="newRoomUrl" class="mt-auto">
      <Button type="primary">{{ t("pages.home.create_game") }}</Button>
    </NuxtLink>
    <label class="flex flex-col mt-auto mb-8">
      <span>{{ t("pages.home.username") }}</span>
      <input v-model="username" class="border p-1" />
    </label>
  </main>
</template>
<script setup lang="ts">
import { generate } from "random-words";

const { username } = useUsername();
const { t } = useI18n();

const newRoomId = (generate(2) as [string, string]).join("-");
const newRoomUrl = `/game/${newRoomId}`;
</script>
