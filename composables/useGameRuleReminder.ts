import type { GameRule } from "@/utils/types/gamerule";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import { localStorageKey } from "@/app/LocalStorage/infrastructure/constants";

export const useGameRuleReminder = (gameRule: GameRule) => {
  const isVisible = useSessionStorage(
    localStorageKey(`gameRule-reminder-${gameRule}`),
    true
  );

  return {
    isVisible,
    show: () => isVisible.value = true,
    hide: () => isVisible.value = false
  };
};