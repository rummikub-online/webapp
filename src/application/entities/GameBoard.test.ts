import { CardCombination } from "./CardCombination";
import { GameBoard } from "./GameBoard";

describe("GameBoard", () => {
  describe("turn", () => {
    test("can cancel modifications", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.createCombination([{ color: "black", number: 7 }]);
      gameBoard.cancelTurnModications();

      expect(gameBoard.toDto()).toStrictEqual({
        combinations: [],
        isValid: true,
      });
    });

    test("can compute turn points", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.createCombination([
        { color: "yellow", number: 10 },
        { color: "black", number: 8 },
      ]);

      expect(gameBoard.turnPoints()).toBe(18);
    });

    test("cannot end turn if game board is not valid", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.createCombination([
        { color: "yellow", number: 10 },
        { color: "black", number: 8 },
      ]);

      expect(() => gameBoard.endTurn()).toThrow(Error);
    });

    test("can end turn if game board is valid", () => {
      const gameBoard = new GameBoard({});

      gameBoard.beginTurn();
      gameBoard.endTurn();
    });
  });

  describe("createCombination", () => {
    test("create combination", () => {
      const gameBoard = new GameBoard({});

      gameBoard.createCombination([{ color: "black", number: 7 }]);

      expect(gameBoard.toDto()).toStrictEqual({
        combinations: [
          {
            type: "invalid",
            cards: [{ color: "black", number: 7 }],
          },
        ],
        isValid: false,
      });
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const gameBoard = new GameBoard({
        combinations: [
          new CardCombination({
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
