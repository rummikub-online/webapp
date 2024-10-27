<script setup lang="ts">
import type { CardColor, CardNumber } from "@/app/Card/domain/dtos/card";
import { isJokerNumber } from "@/app/Card/domain/gamerules/isJoker";
import BlackJokerSymbol from "@/assets/card/joker/black.svg?component";
import RedJokerSymbol from "@/assets/card/joker/red.svg?component";
import BlackCardSymbol from "@/assets/card/symbol/black.svg?component";
import BlueCardSymbol from "@/assets/card/symbol/blue.svg?component";
import RedCardSymbol from "@/assets/card/symbol/red.svg?component";
import YellowCardSymbol from "@/assets/card/symbol/yellow.svg?component";
import { LockClosedIcon } from "@heroicons/vue/16/solid";

defineProps<{
  movable?: boolean;
  locked?: boolean;
  highlighted?: boolean;
  number: CardNumber;
  color: CardColor;
}>();

const { t } = useI18n();

const dragHintOpen = ref(false);
</script>
<template>
  <div
    @click="dragHintOpen=true"
    @mousedown="dragHintOpen = false"
    class="border border-card-border relative overflow-hidden select-none w-9 h-11 md:w-12 md:h-16 bg-card-bg rounded flex-col justify-center items-center gap-1 inline-flex"
    :class="[movable && 'hover:shadow-lg cursor-move', highlighted && 'ring-4']"
  >
    <template v-if="isJokerNumber(number)">
      <BlackJokerSymbol
        v-if="color === 'black'"
        class="size-4 md:size-6 mb-1"
      />
      <RedJokerSymbol v-if="color === 'red'" class="size-4 md:size-6 mb-1" />
    </template>
    <span
      v-else
      class="text-sm md:text-xl font-black font-sans"
      :class="{
        'text-card-text-red': color === 'red',
        'text-card-text-blue': color === 'blue',
        'text-card-text-yellow': color === 'yellow',
        'text-card-text-black': color === 'black',
      }"
    >
      {{ number }}
    </span>

    <RedCardSymbol class="size-2 md:size-3" v-if="color === 'red'" />
    <BlueCardSymbol class="size-2 md:size-3" v-if="color === 'blue'" />
    <YellowCardSymbol class="size-2 md:size-3" v-if="color === 'yellow'" />
    <BlackCardSymbol class="size-2 md:size-3" v-if="color === 'black'" />

    <div
      v-if="locked"
      class="absolute inset-0 bg-card-bg-overlay-locked/70 text-card-text-overlay-locked flex items-center justify-center"
    >
      <LockClosedIcon class="size-4 md:size-6" />
    </div>

    <UPopover class="absolute inset-0" v-model:open="dragHintOpen" :ui="{ring: 'ring-0'}">
      <div class="-z-10 absolute inset-0"></div>
      <template #panel>
        <div class="p-2 text-xs">
          {{ t("components.card.drag_hint") }}
        </div>
      </template>
    </UPopover>
  </div>
</template>
