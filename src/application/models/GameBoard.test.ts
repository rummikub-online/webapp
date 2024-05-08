import { CardCombination } from "./CardCombination";
import { GameBoard } from "./GameBoard";

describe("GameBoard", () => {
  describe("backup", () => {
    test("can cancel modifications", () => {
      const gameBoard = new GameBoard({});

      gameBoard.backup();
      gameBoard.createCombination([{ color: "black", number: 7 }]);
      gameBoard.restoreBackup();

      expect(gameBoard.toDto()).toStrictEqual({
        combinations: [],
        isValid: true,
      });
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
