import { Game } from "./Game";

describe("Game", () => {
  describe("addPlayer", () => {
    test("create new player", () => {
      const game = new Game({ generateUserId: () => "player" });

      game.addPlayer();

      expect(game.toDto().players).toStrictEqual([
        {
          cards: [],
          hasDrewStartupCards: false,
          hasStarted: false,
          id: "player",
        },
      ]);
    });

    test("can't add more than 4 players", () => {
      const game = new Game({});

      game.addPlayer();
      game.addPlayer();
      game.addPlayer();
      game.addPlayer();

      expect(() => game.addPlayer()).toThrow("Max players limit reached");
    });

    test("can't add player if game started", () => {
      const game = new Game({ state: "started" });

      expect(() => game.addPlayer()).toThrow("Game has started");
    });

    test("can't add player if game ended", () => {
      const game = new Game({ state: "ended" });

      expect(() => game.addPlayer()).toThrow("Game has started");
    });
  });

  describe("isFull", () => {
    test("return false when lest than 4 players", () => {
      const game = new Game({});

      game.addPlayer();
      game.addPlayer();
      game.addPlayer();

      expect(game.isFull()).toBeFalsy();
    });

    test("return true when 4 players", () => {
      const game = new Game({});

      game.addPlayer();
      game.addPlayer();
      game.addPlayer();
      game.addPlayer();

      expect(game.isFull()).toBeTruthy();
    });
  });

  describe("nextPlayerAfter", () => {
    test("return next player", () => {
      const game = new Game({});
      const firstPlayer = game.addPlayer();
      const secondPlayer = game.addPlayer();

      expect(game.nextPlayerAfter(firstPlayer)).toBe(secondPlayer);
    });

    test("return first player if current player is the last of the list", () => {
      const game = new Game({});
      const firstPlayer = game.addPlayer();
      const secondPlayer = game.addPlayer();

      expect(game.nextPlayerAfter(secondPlayer)).toBe(firstPlayer);
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const game = new Game({});

      expect(game.toDto()).toStrictEqual({
        players: [],
        drawStack: {
          isEmpty: false,
        },
        gameBoard: {
          isValid: true,
          combinations: [],
        },
        state: "created",
        isFull: false,
      });
    });
  });
});
