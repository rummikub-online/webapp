<script setup lang="ts">
import BlackCardSymbol from "@/assets/card/symbol/black.svg?component";
import BlueCardSymbol from "@/assets/card/symbol/blue.svg?component";
import RedCardSymbol from "@/assets/card/symbol/red.svg?component";
import YellowCardSymbol from "@/assets/card/symbol/yellow.svg?component";
import type { CardColor, CardNumber } from "@rumi/domain/dtos/card";

defineProps<{
  number: CardNumber;
  color: CardColor;
}>();
</script>
<template>
  <div
    class="w-8 h-11 lg:w-10 lg:h-14 bg-white rounded flex-col justify-center items-center gap-1 inline-flex"
  >
    <span
      class="text-sm lg:text-base font-black font-sans"
      :class="{
        'text-card-red': color === 'red',
        'text-card-blue': color === 'blue',
        'text-card-yellow': color === 'yellow',
        'text-card-black': color === 'black',
      }"
    >
      {{ number }}
    </span>
    <RedCardSymbol class="size-2 lg:size-3" v-if="color === 'red'" />
    <BlueCardSymbol class="size-2 lg:size-3" v-if="color === 'blue'" />
    <YellowCardSymbol class="size-2 lg:size-3" v-if="color === 'yellow'" />
    <BlackCardSymbol class="size-2 lg:size-3" v-if="color === 'black'" />
  </div>
</template>
