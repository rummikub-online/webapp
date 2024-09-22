import { Combination } from "./Combination";
import { GameBoard } from "./GameBoard";

describe("GameBoard", () => {
  describe("turn", () => {
    test("can cancel modifications", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.placeCardAlone({ color: "black", number: 7, duplicata: 1 });
      gameBoard.cancelTurnModications();

      expect(gameBoard.toDto()).toStrictEqual({
        combinations: [],
        isValid: true,
        hasModifications: false,
      });
    });

    test("can compute turn points", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.placeCardAlone({ color: "yellow", number: 10, duplicata: 1 });

      expect(gameBoard.turnPoints()).toBe(10);
    });

    test("cannot end turn if game board is not valid", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.placeCardAlone({ color: "yellow", number: 10, duplicata: 1 });

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

      gameBoard.placeCardAlone({ color: "black", number: 7, duplicata: 1 });

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "black", number: 7, duplicata: 1 }],
        },
      ]);
    });
  });

  describe("placeCardInCombination", () => {
    test("add card at specified position of combination", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [{ color: "black", number: 6, duplicata: 1 }],
          }),
        ],
      });

      gameBoard.placeCardInCombination(
        { color: "black", number: 7, duplicata: 1 },
        { combinationIndex: 0, cardIndex: 1 },
      );

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [
            { color: "black", number: 6, duplicata: 1 },
            { color: "black", number: 7, duplicata: 1 },
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
              { color: "black", number: 5, duplicata: 1 },
              { color: "blue", number: 5, duplicata: 1 },
            ],
          }),
          new Combination({
            cards: [{ color: "black", number: 6, duplicata: 1 }],
          }),
        ],
      });

      gameBoard.moveCardToCombination(
        { combinationIndex: 0, cardIndex: 0 },
        { combinationIndex: 1, cardIndex: 0 },
      );

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "blue", number: 5, duplicata: 1 }],
        },
        {
          type: "invalid",
          cards: [
            { color: "black", number: 5, duplicata: 1 },
            { color: "black", number: 6, duplicata: 1 },
          ],
        },
      ]);
    });

    test("delete combination if empty", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [{ color: "black", number: 5, duplicata: 1 }],
          }),
          new Combination({
            cards: [{ color: "black", number: 6, duplicata: 1 }],
          }),
        ],
      });

      gameBoard.moveCardToCombination(
        { combinationIndex: 0, cardIndex: 0 },
        { combinationIndex: 1, cardIndex: 0 },
      );

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [
            { color: "black", number: 5, duplicata: 1 },
            { color: "black", number: 6, duplicata: 1 },
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
              { color: "black", number: 6, duplicata: 1 },
              { color: "black", number: 7, duplicata: 1 },
            ],
          }),
        ],
      });

      gameBoard.moveCardAlone({ combinationIndex: 0, cardIndex: 0 });

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "black", number: 7, duplicata: 1 }],
        },
        {
          type: "invalid",
          cards: [{ color: "black", number: 6, duplicata: 1 }],
        },
      ]);
    });

    test("delete source combination if empty", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [{ color: "black", number: 6, duplicata: 1 }],
          }),
        ],
      });

      gameBoard.moveCardAlone({ combinationIndex: 0, cardIndex: 0 });

      expect(gameBoard.toDto().combinations).toStrictEqual([
        {
          type: "invalid",
          cards: [{ color: "black", number: 6, duplicata: 1 }],
        },
      ]);
    });
  });

  describe("wasCombinationPlacedThisTurn", () => {
    test("return true if combination wasn't on board on previous turn", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [{ color: "black", number: 6, duplicata: 1 }],
          }),
        ],
      });

      gameBoard.beginTurn();

      const position = gameBoard.placeCardAlone({
        color: "black",
        number: 6,
        duplicata: 2,
      });

      expect(gameBoard.wasCombinationPlacedThisTurn(position)).toBeTruthy();
    });

    test("return false if combination was on board on previous turn", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [{ color: "black", number: 6, duplicata: 1 }],
          }),
        ],
      });

      gameBoard.beginTurn();

      expect(gameBoard.wasCombinationPlacedThisTurn(0)).toBeFalsy();
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

  describe("hasModifications", () => {
    test("should return true when combination has changed", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [
              { color: "black", number: 4, duplicata: 1 },
              { color: "black", number: 4, duplicata: 1 },
            ],
          }),
        ],
      });

      gameBoard.beginTurn();
      gameBoard.moveCardAlone({
        combinationIndex: 0,
        cardIndex: 0,
      });

      expect(gameBoard.hasModifications()).toBe(true);
    });

    test("should return false when no changes", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [
              { color: "black", number: 4, duplicata: 1 },
              { color: "black", number: 4, duplicata: 1 },
            ],
          }),
        ],
      });

      gameBoard.beginTurn();

      expect(gameBoard.hasModifications()).toBe(false);
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new Combination({
            cards: [
              { color: "blue", number: 7, duplicata: 1 },
              { color: "blue", number: 8, duplicata: 1 },
            ],
          }),
        ],
      });

      expect(gameBoard.toDto()).toStrictEqual({
        combinations: [
          {
            type: "invalid",
            cards: [
              { color: "blue", number: 7, duplicata: 1 },
              { color: "blue", number: 8, duplicata: 1 },
            ],
          },
        ],
        isValid: false,
        hasModifications: false,
      });
    });
  });
});
