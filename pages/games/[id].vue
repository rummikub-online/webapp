<template>
  <div
    class="bg-body-bg h-dvh w-full flex flex-col items-center justify-center px-4"
    v-if="isUsernameBlank"
  >
    <div>
      <label class="flex flex-col mb-8">
        <span class="mb-1">Choisissez un pseudo</span>
        <CInput v-model="tempUsername" />
      </label>

      <Button
        type="primary"
        class="w-full"
        :disabled="isTempUsername"
        @click="saveUsername()"
      >
        Rejoindre la partie
      </Button>
    </div>
  </div>
  <Game v-else />
</template>
<script setup lang="ts">
import { useLightMode } from "@/composables/useLightMode";

const tempUsername = ref("");
const isTempUsername = computed(() => isBlank(toValue(tempUsername)));

useLightMode()

const saveUsername = () => {
  username.value = tempUsername.value;
};
const { username, isUsernameBlank } = useUsername();
</script>
