import type { CardDto } from "@rumi/domain/dtos/card";
import { byColor, byNumber } from "@rumi/domain/utils/card/grouping";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type CardsCorder = "color" | "number";

export const useOrderedCardsStore = defineStore("orderedCards", () => {
  const order = ref<CardsCorder>("color");

  const toOrdered = (cards: Array<CardDto>) =>
    order.value === "color" ? byColor(cards) : byNumber(cards);

  const orderByColor = () => (order.value = "color");
  const orderByNumber = () => (order.value = "number");
  const isOrderedByColor = computed(() => order.value === "color");
  const isOrderedByNumber = computed(() => order.value === "number");

  return {
    toOrdered,
    orderByColor,
    orderByNumber,
    isOrderedByColor,
    isOrderedByNumber,
  };
});
