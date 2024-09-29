<template>
  <main class="h-screen flex flex-col items-center justify-center">
    <NuxtLink :href="newRoomUrl" class="mt-auto"> Create game </NuxtLink>
    <label class="flex flex-col mt-auto mb-8">
      <span>Username</span>
      <input v-model="username" class="border p-1" />
    </label>
  </main>
</template>
<script setup lang="ts">
import { generate } from "random-words";

const { username } = useUsername();

const newRoomId = (generate(2) as [string, string]).join("-");
const newRoomUrl = `/game/${newRoomId}`;
</script>
