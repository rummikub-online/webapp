import { DrawStack } from "./DrawStack";
import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

const startupCards = Object.freeze([
  Object.freeze({ color: "black", num: 0 }),
  Object.freeze({ color: "black", num: 1 }),
  Object.freeze({ color: "black", num: 2 }),
  Object.freeze({ color: "black", num: 3 }),
  Object.freeze({ color: "black", num: 4 }),
  Object.freeze({ color: "black", num: 5 }),
  Object.freeze({ color: "black", num: 6 }),
  Object.freeze({ color: "black", num: 7 }),
  Object.freeze({ color: "black", num: 8 }),
  Object.freeze({ color: "black", num: 9 }),
  Object.freeze({ color: "black", num: 10 }),
  Object.freeze({ color: "black", num: 11 }),
  Object.freeze({ color: "black", num: 12 }),
  Object.freeze({ color: "black", num: 13 }),
]);

describe("Player", () => {
  describe("drawStartupCards", () => {
    test("add startup cards to player", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({
          cards: [...startupCards],
        }),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", num: 2 }],
      });

      player.drawStartupCards();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", num: 2 },
        ...startupCards,
      ]);
    });

    test("cannot draw startup cards twice", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({
          cards: [...startupCards],
        }),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", num: 2 }],
      });

      player.drawStartupCards();

      expect(() => player.drawStartupCards()).toThrow(Error);
    });
  });

  describe("drawCard", () => {
    test("add card picked from draw stack", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({
          cards: [{ color: "black", num: 1 }],
        }),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", num: 2 }],
      });

      player.drawCard();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", num: 2 },
        { color: "black", num: 1 },
      ]);
    });
  });

  describe("endTurn", () => {
    test("throw error ", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({
          cards: [{ color: "black", num: 1 }],
        }),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", num: 2 }],
      });

      player.drawCard();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", num: 2 },
        { color: "black", num: 1 },
      ]);
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({}),
        gameBoard: new GameBoard({}),
        cards: [
          { color: "black", num: 2 },
          { color: "black", num: 1 },
        ],
      });

      expect(player.toDto()).toStrictEqual({
        id: "player",
        cards: [
          { color: "black", num: 2 },
          { color: "black", num: 1 },
        ],
        hasDrewStartupCards: false,
        hasStarted: false,
      });
    });
  });
});
