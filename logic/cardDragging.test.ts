import type { CardPositionOnBoard } from "@/app/GameBoard/application/GameBoard";
import { makeCardDraggingHandler } from "@/logic/cardDragging";
import { afterEach, describe, expect, test, vi } from "vitest";

const baseObj = {
  placeCardAlone(cardIndex: number) {},
  placeCardInCombination(
    cardIndex: number,
    destination: CardPositionOnBoard
  ) {},
  moveCardAlone(source: CardPositionOnBoard) {},
  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard
  ) {},
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("cardDragging", () => {
  test("call placeCardAlone when source card and no destination", () => {
    const spy = vi.spyOn(baseObj, "placeCardAlone");
    const cardDraggingHandler = makeCardDraggingHandler(baseObj);

    cardDraggingHandler.to(null, null);
    cardDraggingHandler.from(1, null);

    expect(spy).toHaveBeenCalledWith(1);
  });

  test("call placeCardInCombination when source card and destination card+combination", () => {
    const spy = vi.spyOn(baseObj, "placeCardInCombination");
    const cardDraggingHandler = makeCardDraggingHandler(baseObj);

    cardDraggingHandler.to(1, 1);
    cardDraggingHandler.from(1, null);

    expect(spy).toHaveBeenCalledWith(1, {
      cardIndex: 1,
      combinationIndex: 1,
    });
  });

  test("call moveCardAlone when source card+combination, and no destination", () => {
    const spy = vi.spyOn(baseObj, "moveCardAlone");
    const cardDraggingHandler = makeCardDraggingHandler(baseObj);

    cardDraggingHandler.to(null, null);
    cardDraggingHandler.from(1, 1);

    expect(spy).toHaveBeenCalledWith({
      cardIndex: 1,
      combinationIndex: 1,
    });
  });

  test("call moveCardToCombination when source card+combination, and destination card+combination", () => {
    const spy = vi.spyOn(baseObj, "moveCardToCombination");
    const cardDraggingHandler = makeCardDraggingHandler(baseObj);

    cardDraggingHandler.to(1, 1);
    cardDraggingHandler.from(1, 1);

    expect(spy).toHaveBeenCalledWith(
      {
        cardIndex: 1,
        combinationIndex: 1,
      },
      {
        cardIndex: 1,
        combinationIndex: 1,
      }
    );
  });
});
