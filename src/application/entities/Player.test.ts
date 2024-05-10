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

      player.beginTurn();
      player.drawCard();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 1 },
      ]);
    });
  });

  describe("endTurn", () => {
    test("throw error if game board is not valid", () => {
      const player = new Player({
        id: "player",
        hasStarted: true,
        drawStack: new DrawStack({}),
        gameBoard: new GameBoard({}),
        cards: [
          { color: "black", number: 10 },
          { color: "black", number: 11 },
          { color: "red", number: 12 },
        ],
      });

      player.beginTurn();
      const combinationIndex = player.placeCardAlone(0);
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 1 });
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 2 });

      expect(() => player.endTurn()).toThrow("Game board is not valid");
    });

    test("throw error if started player has not played points", () => {
      const player = new Player({
        id: "player",
        hasStarted: true,
        drawStack: new DrawStack({}),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", number: 2 }],
      });

      player.beginTurn();
      expect(() => player.endTurn()).toThrow("No points played");
    });

    test("throw error if unstarted player has not played enough points to start", () => {
      const player = new Player({
        id: "player",
        hasStarted: false,
        gameBoard: new GameBoard({}),
        drawStack: new DrawStack({}),
        cards: [
          { color: "black", number: 1 },
          { color: "black", number: 2 },
          { color: "black", number: 3 },
        ],
      });

      player.beginTurn();
      const combinationIndex = player.placeCardAlone(0);
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 1 });
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 2 });
      expect(() => player.endTurn()).toThrow("Not enough points to start");
    });
  });

  describe("isPlaying", () => {
    test("return true when player turn began", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({}),
        gameBoard: new GameBoard({}),
      });

      player.beginTurn();

      expect(player.isPlaying()).toBeTruthy();
    });

    test("return true when player turn ended", () => {
      const player = new Player({
        id: "player",
        drawStack: new DrawStack({}),
        gameBoard: new GameBoard({}),
      });

      player.beginTurn();
      player.drawCard();

      expect(player.isPlaying()).toBeFalsy();
    });
  });

  describe("hasWon", () => {
    test("return true when player has drawn startup cards and has placed everything", () => {
      const player = new Player({
        id: "player",
        hasDrewStartupCards: true,
        gameBoard: new GameBoard({}),
        drawStack: new DrawStack({}),
      });

      expect(player.hasWon()).toBeTruthy();
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
        hasDrawnStartupCards: false,
        hasStarted: false,
        hasDrawnThisTurn: false,
      });
    });
  });
});
