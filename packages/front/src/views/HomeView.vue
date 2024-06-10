<script setup lang="ts">
import router from "@/router";
import type { GameInfosDto } from "@rumi/application/entities/Game";

const createGame = async () => {
  const gameInfos = (await (
    await fetch("http://localhost:3000/games", {
      method: "post",
    })
  ).json()) as GameInfosDto;

  router.push({ name: "game", params: { id: gameInfos.id } });
};
</script>

<template>
  <main class="h-screen flex flex-col items-center justify-center">
    <label>
      <button @click="createGame">Create game</button>
    </label>
  </main>
</template>
