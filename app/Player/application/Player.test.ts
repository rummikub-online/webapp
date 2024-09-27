import { Combination } from "@/app/Combination/application/Combination";
import { DrawStack } from "@/app/DrawStack/application/DrawStack";
import { GameBoard } from "@/app/GameBoard/application/GameBoard";
import { Player } from "@/app/Player/application/Player";
import { describe, expect, test } from "vitest";

const startupCards = Object.freeze([
  Object.freeze({ color: "black", number: 0, duplicata: 1 }),
  Object.freeze({ color: "black", number: 1, duplicata: 1 }),
  Object.freeze({ color: "black", number: 2, duplicata: 1 }),
  Object.freeze({ color: "black", number: 3, duplicata: 1 }),
  Object.freeze({ color: "black", number: 4, duplicata: 1 }),
  Object.freeze({ color: "black", number: 5, duplicata: 1 }),
  Object.freeze({ color: "black", number: 6, duplicata: 1 }),
  Object.freeze({ color: "black", number: 7, duplicata: 1 }),
  Object.freeze({ color: "black", number: 8, duplicata: 1 }),
  Object.freeze({ color: "black", number: 9, duplicata: 1 }),
  Object.freeze({ color: "black", number: 10, duplicata: 1 }),
  Object.freeze({ color: "black", number: 11, duplicata: 1 }),
  Object.freeze({ color: "black", number: 12, duplicata: 1 }),
  Object.freeze({ color: "black", number: 13, duplicata: 1 }),
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
        cards: [{ color: "black", number: 2, duplicata: 1 }],
      });

      player.drawStartupCards();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", number: 2, duplicata: 1 },
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
        cards: [{ color: "black", number: 2, duplicata: 1 }],
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
          cards: [{ color: "black", number: 1, duplicata: 1 }],
        }),
        gameBoard: new GameBoard({}),
        cards: [{ color: "black", number: 2, duplicata: 1 }],
      });

      player.beginTurn();
      player.drawCard();

      expect(player.toDto().cards).toStrictEqual([
        { color: "black", number: 2, duplicata: 1 },
        { color: "black", number: 1, duplicata: 1 },
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
          { color: "black", number: 10, duplicata: 1 },
          { color: "black", number: 11, duplicata: 1 },
          { color: "red", number: 12, duplicata: 1 },
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
        cards: [{ color: "black", number: 2, duplicata: 1 }],
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
          { color: "black", number: 1, duplicata: 1 },
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
        ],
      });

      player.beginTurn();
      const combinationIndex = player.placeCardAlone(0);
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 1 });
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 2 });
      expect(() => player.endTurn()).toThrow("Not enough points to start");
    });

    test("mark user as started if it's his first turn", () => {
      const player = new Player({
        id: "player",
        hasStarted: false,
        gameBoard: new GameBoard({}),
        drawStack: new DrawStack({}),
        cards: [
          { color: "black", number: 10, duplicata: 1 },
          { color: "black", number: 11, duplicata: 1 },
          { color: "black", number: 12, duplicata: 1 },
        ],
      });

      player.beginTurn();
      const combinationIndex = player.placeCardAlone(0);
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 1 });
      player.placeCardInCombination(0, { combinationIndex, cardIndex: 2 });

      player.endTurn();
      expect(player.toDto().hasStarted).toBeTruthy();
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

  describe("cancelTurnModifications", () => {
    test("remove cards from gameBoard", () => {
      const gameBoard = new GameBoard({});
      const player = new Player({
        id: "player",
        hasDrewStartupCards: true,
        gameBoard,
        drawStack: new DrawStack({}),
        cards: [{ color: "black", number: 7, duplicata: 1 }],
      });
      player.beginTurn();
      player.placeCardAlone(0);

      player.cancelTurnModifications();

      expect(gameBoard.toDto().combinations).toHaveLength(0);
    });
    test("put back placed cards", () => {
      const gameBoard = new GameBoard({});
      const player = new Player({
        id: "player",
        hasDrewStartupCards: true,
        gameBoard,
        drawStack: new DrawStack({}),
        cards: [{ color: "black", number: 7, duplicata: 1 }],
      });
      player.beginTurn();
      player.placeCardAlone(0);

      player.cancelTurnModifications();

      expect(player.toDto().cards).toHaveLength(1);
    });
  });

  describe("canInteractWithCombination", () => {
    const makeBoard = () =>
      new GameBoard({
        combinations: [
          new Combination({
            cards: [
              { color: "black", number: 7, duplicata: 1 },
              { color: "black", number: 8, duplicata: 1 },
              { color: "black", number: 9, duplicata: 1 },
            ],
          }),
        ],
      });

    test("need player started its turn", () => {
      const gameBoard = makeBoard();
      const player = new Player({
        id: "player",
        hasDrewStartupCards: true,
        gameBoard,
        hasStarted: true,
        drawStack: new DrawStack({}),
        cards: [{ color: "black", number: 7, duplicata: 1 }],
      });

      expect(player.canInteractWithCombination(0)).toBeFalsy();
    });

    test("need player hasn't draw card this turn", () => {
      const gameBoard = makeBoard();
      const player = new Player({
        id: "player",
        hasDrewStartupCards: true,
        gameBoard,
        hasStarted: true,
        drawStack: new DrawStack({}),
        cards: [{ color: "black", number: 7, duplicata: 1 }],
      });

      player.beginTurn();
      player.drawCard();

      expect(player.canInteractWithCombination(0)).toBeFalsy();
    });

    test("need cards on gameboard", () => {
      const gameBoard = new GameBoard({});
      const player = new Player({
        id: "player",
        hasDrewStartupCards: true,
        gameBoard,
        hasStarted: true,
        drawStack: new DrawStack({}),
        cards: [{ color: "black", number: 7, duplicata: 1 }],
      });

      player.beginTurn();

      expect(player.canInteractWithCombination(0)).toBeFalsy();
    });

    describe("for a combination placed before this turn", () => {
      test("need to have started", () => {
        const gameBoard = makeBoard();
        const player = new Player({
          id: "player",
          hasDrewStartupCards: true,
          gameBoard,
          hasStarted: false,
          drawStack: new DrawStack({}),
          cards: [{ color: "black", number: 7, duplicata: 1 }],
        });

        player.beginTurn();

        expect(player.canInteractWithCombination(0)).toBeFalsy();
      });

      test("its possible if have started", () => {
        const gameBoard = makeBoard();
        const player = new Player({
          id: "player",
          hasDrewStartupCards: true,
          gameBoard,
          hasStarted: true,
          drawStack: new DrawStack({}),
          cards: [{ color: "black", number: 7, duplicata: 1 }],
        });

        player.beginTurn();

        expect(player.canInteractWithCombination(0)).toBeTruthy();
      });
    });

    describe("for a combination placed during the turn", () => {
      test("it's possible", () => {
        const gameBoard = new GameBoard({});
        const player = new Player({
          id: "player",
          hasDrewStartupCards: true,
          gameBoard,
          hasStarted: false,
          drawStack: new DrawStack({}),
          cards: [{ color: "black", number: 7, duplicata: 1 }],
        });

        player.beginTurn();
        player.placeCardAlone(0);

        expect(player.canInteractWithCombination(0)).toBeTruthy();
      });
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const player = new Player({
        id: "player",
        username: "bob",
        drawStack: new DrawStack({}),
        gameBoard: new GameBoard({}),
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 1, duplicata: 1 },
        ],
      });

      expect(player.toDto()).toStrictEqual({
        id: "player",
        username: "bob",
        admin: false,
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 1, duplicata: 1 },
        ],
        isPlaying: false,
        hasDrawnStartupCards: false,
        hasStarted: false,
        hasDrawnThisTurn: false,
        hasWon: false,
        canStartGame: false,
        canDrawCard: false,
        canPlaceCardAlone: false,
        canPlaceCardInCombination: false,
        canMoveCardAlone: false,
        canMoveCardToCombination: false,
        canCancelTurnModifications: false,
        canEndTurn: false,
        canInteractWithCombination: [],
      });
    });
  });
});
