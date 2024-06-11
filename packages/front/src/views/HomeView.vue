<script setup lang="ts">
import type { GameInfosDto } from "@rumi/application/entities/Game";
import router from "../router";

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
