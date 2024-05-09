import { Combination } from "./Combination";
import { GameBoard } from "./GameBoard";

describe("GameBoard", () => {
  describe("turn", () => {
    test("can cancel modifications", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.placeCardAlone({ color: "black", number: 7 });
      gameBoard.cancelTurnModications();

      expect(gameBoard.toDto()).toStrictEqual({
        combinations: [],
        isValid: true,
      });
    });

    test("can compute turn points", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.placeCardAlone({ color: "yellow", number: 10 });

      expect(gameBoard.turnPoints()).toBe(10);
    });

    test("cannot end turn if game board is not valid", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.placeCardAlone({ color: "yellow", number: 10 });

      expect(() => gameBoard.endTurn()).toThrow(Error);
    });

    test("can end turn if game board is valid", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.endTurn();
    });
  });

  describe("placeCardAlone", () => {
    test("create combination of one card", () => {
      const gameBoard = new GameBoard({});

      gameBoard.placeCardAlone({ color: "black", number: 7 });

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "black", number: 7 }],
        },
      ]);
    });
  });

  describe("placeCardInCombination", () => {
    test("add card at specified position of combination", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({ cards: [{ color: "black", number: 6 }] }),
        ],
      });

      gameBoard.placeCardInCombination(
        { color: "black", number: 7 },
        { combinationIndex: 0, cardIndex: 1 }
      );

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [
            { color: "black", number: 6 },
            { color: "black", number: 7 },
          ],
        },
      ]);
    });
  });

  describe("moveCardToCombination", () => {
    test("move card of specified position of combination to specified position of combination", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [
              { color: "black", number: 5 },
              { color: "blue", number: 5 },
            ],
          }),
          new Combination({ cards: [{ color: "black", number: 6 }] }),
        ],
      });

      gameBoard.moveCardToCombination(
        { combinationIndex: 0, cardIndex: 0 },
        { combinationIndex: 1, cardIndex: 0 }
      );

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "blue", number: 5 }],
        },
        {
          type: "invalid",
          cards: [
            { color: "black", number: 5 },
            { color: "black", number: 6 },
          ],
        },
      ]);
    });

    test("delete combination if empty", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [{ color: "black", number: 5 }],
          }),
          new Combination({ cards: [{ color: "black", number: 6 }] }),
        ],
      });

      gameBoard.moveCardToCombination(
        { combinationIndex: 0, cardIndex: 0 },
        { combinationIndex: 1, cardIndex: 0 }
      );

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [
            { color: "black", number: 5 },
            { color: "black", number: 6 },
          ],
        },
      ]);
    });
  });

  describe("moveCardAlone", () => {
    test("move card from combination to a new one", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [
              { color: "black", number: 6 },
              { color: "black", number: 7 },
            ],
          }),
        ],
      });

      gameBoard.moveCardAlone({ combinationIndex: 0, cardIndex: 0 });

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "black", number: 7 }],
        },
        {
          type: "invalid",
          cards: [{ color: "black", number: 6 }],
        },
      ]);
    });

    test("delete source combination if empty", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [{ color: "black", number: 6 }],
          }),
        ],
      });

      gameBoard.moveCardAlone({ combinationIndex: 0, cardIndex: 0 });

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "black", number: 6 }],
        },
      ]);
    });
  });

  describe("deleteEmptyCombinations", () => {
    test("remove all combination with no cards", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [],
          }),
        ],
      });

      gameBoard.deleteEmptyCombinations();

      expect(gameBoard.toDto().combinations).toStrictEqual([]);
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [
              { color: "blue", number: 7 },
              { color: "blue", number: 8 },
            ],
          }),
        ],
      });

      expect(gameBoard.toDto()).toStrictEqual({
        combinations: [
          {
            type: "invalid",
            cards: [
              { color: "blue", number: 7 },
              { color: "blue", number: 8 },
            ],
          },
        ],
        isValid: false,
      });
    });
  });
});
