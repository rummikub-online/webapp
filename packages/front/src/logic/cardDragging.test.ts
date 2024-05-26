import type { CardPositionOnBoard } from "@rumi/application/entities/GameBoard";
import { makeCardDraggingHandler } from "./cardDragging";

const baseObj = {
  placeCardAlone(cardIndex: number) {},
  placeCardInCombination(
    cardIndex: number,
    destination: CardPositionOnBoard,
  ) {},
  moveCardAlone(source: CardPositionOnBoard) {},
  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard,
  ) {},
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("cardDragging", () => {
  test("call placeCardAlone when source card and no destination", () => {
    const spy = jest.spyOn(baseObj, "placeCardAlone");
    const cardDraggingHandler = makeCardDraggingHandler(baseObj);

    cardDraggingHandler.to(null, null);
    cardDraggingHandler.from(1, null);

    expect(spy).toHaveBeenCalledWith(1);
  });

  test("call placeCardInCombination when source card and destination card+combination", () => {
    const spy = jest.spyOn(baseObj, "placeCardInCombination");
    const cardDraggingHandler = makeCardDraggingHandler(baseObj);

    cardDraggingHandler.to(1, 1);
    cardDraggingHandler.from(1, null);

    expect(spy).toHaveBeenCalledWith(1, {
      cardIndex: 1,
      combinationIndex: 1,
    });
  });

  test("call moveCardAlone when source card+combination, and no destination", () => {
    const spy = jest.spyOn(baseObj, "moveCardAlone");
    const cardDraggingHandler = makeCardDraggingHandler(baseObj);

    cardDraggingHandler.to(null, null);
    cardDraggingHandler.from(1, 1);

    expect(spy).toHaveBeenCalledWith({
      cardIndex: 1,
      combinationIndex: 1,
    });
  });

  test("call moveCardToCombination when source card+combination, and destination card+combination", () => {
    const spy = jest.spyOn(baseObj, "moveCardToCombination");
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
      },
    );
  });
});
