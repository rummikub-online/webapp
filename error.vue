<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();
</script>

<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center bg-body-bg text-body-text"
  >
    <h1 class="text-xl mb-2">{{ error.statusCode }}</h1>
    <NuxtLink to="/">
      <Button>
        {{ t("error.back_home") }}
      </Button>
    </NuxtLink>
  </div>
</template>
