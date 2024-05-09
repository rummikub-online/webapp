import { DrawStack } from "./DrawStack";
import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

const startupCards = Object.freeze([
  Object.freeze({ color: "black", number: 0 }),
  Object.freeze({ color: "black", number: 1 }),
  Object.freeze({ color: "black", number: 2 }),
  Object.freeze({ color: "black", number: 3 }),
  Object.freeze({ color: "black", number: 4 }),
  Object.freeze({ color: "black", number: 5 }),
  Object.freeze({ color: "black", number: 6 }),
  Object.freeze({ color: "black", number: 7 }),
  Object.freeze({ color: "black", number: 8 }),
  Object.freeze({ color: "black", number: 9 }),
  Object.freeze({ color: "black", number: 10 }),
  Object.freeze({ color: "black", number: 11 }),
  Object.freeze({ color: "black", number: 12 }),
  Object.freeze({ color: "black", number: 13 }),
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
        cards: [{ color: "black", number: 2 }],
      });

      player.drawStartupCards();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", number: 2 },
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
        cards: [{ color: "black", number: 2 }],
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
          cards: [{ color: "black", number: 1 }],
        }),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", number: 2 }],
      });

      player.drawCard();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 1 },
      ]);
    });
  });

  describe("endTurn", () => {
    test("throw error ", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({
          cards: [{ color: "black", number: 1 }],
        }),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", number: 2 }],
      });

      player.drawCard();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 1 },
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
          { color: "black", number: 2 },
          { color: "black", number: 1 },
        ],
      });

      expect(player.toDto()).toStrictEqual({
        id: "player",
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 1 },
        ],
        hasDrewStartupCards: false,
        hasStarted: false,
      });
    });
  });
});
