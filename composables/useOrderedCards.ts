import type { CardDto } from "@/app/Card/domain/dtos/card";
import { byColor, byNumber } from "@/app/Card/domain/gamerules/grouping";

export type CardsCorder = "color" | "number";

export const useOrderedCards = () => {
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
};
