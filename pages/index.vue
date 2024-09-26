<template>
  <main class="h-screen flex flex-col items-center justify-center">
    <label>
      <NuxtLink :href="newRoomUrl"> Create game </NuxtLink>
    </label>
  </main>
</template>
<script setup lang="ts">
import { generate } from "random-words";

const newRoomId = (generate(2) as [string, string]).join("-");
const newRoomUrl = `/room/${newRoomId}`;
</script>
