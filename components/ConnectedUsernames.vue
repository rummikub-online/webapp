<script setup lang="ts">
import ConnectedUsername from "@/components/ConnectedUsername.vue";
import { UserGroupIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  usernames: Record<string, boolean>;
}>();

const { t } = useI18n();
const connectedCount = computed(
  () => Object.values(props.usernames).filter((v) => v).length,
);

const isOpen = ref(false);
</script>
<template>
  <Button @click="isOpen = true">
    <div class="flex gap-2">
      <UserGroupIcon class="size-4 text-body-text" />
      <span>{{ connectedCount }}</span>
    </div>
  </Button>
  <UModal v-model="isOpen" :ui="{ background: 'bg-body-bg' }">
    <div class="p-4">
      <h2 class="mb-4">
        {{ t("pages.game.connected_usernames", connectedCount) }}
      </h2>
      <ul class="flex flex-col items-start gap-2 text-sm">
        <li v-for="(isConnected, username) in usernames" :key="username">
          <ConnectedUsername :username="username" :is-connected="isConnected" />
        </li>
      </ul>
    </div>
  </UModal>
</template>
