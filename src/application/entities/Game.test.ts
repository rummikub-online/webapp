import { Game } from "./Game";

describe("Game", () => {
  describe("addPlayer", () => {
    test("create new player", () => {
      const game = new Game({ id: "game", generateUserId: () => "player" });

      game.addPlayer();

      expect(game.toDto().players).toHaveLength(1);
    });

    test("can't add more than 4 players", () => {
      const game = new Game({ id: "game" });

      game.addPlayer();
      game.addPlayer();
      game.addPlayer();
      game.addPlayer();

      expect(() => game.addPlayer()).toThrow("Max players limit reached");
    });

    test("can't add player if game started", () => {
      const game = new Game({ id: "game", state: "started" });

      expect(() => game.addPlayer()).toThrow("Game has started");
    });

    test("can't add player if game ended", () => {
      const game = new Game({ id: "game", state: "ended" });

      expect(() => game.addPlayer()).toThrow("Game has started");
    });
  });

  describe("removePlayer", () => {
    test("throw error if unknown player id", () => {
      const game = new Game({ id: "game", generateUserId: () => "player" });

      expect(() => game.removePlayer("e")).toThrow("Unknown player id");
    });
    test("remove player", () => {
      const game = new Game({ id: "game", generateUserId: () => "player" });
      const player = game.addPlayer();

      game.removePlayer(player.id);

      expect(game.toDto().players).toHaveLength(0);
    });

    test("remove player end the game if started", () => {
      const game = new Game({ id: "game", state: "created" });
      const player = game.addPlayer();
      game.addPlayer();
      game.start();

      game.removePlayer(player.id);
      expect(() => game.isEnded()).toBeTruthy();
    });
  });

  describe("isFull", () => {
    test("return false when lest than 4 players", () => {
      const game = new Game({ id: "game" });

      game.addPlayer();
      game.addPlayer();
      game.addPlayer();

      expect(game.isFull()).toBeFalsy();
    });

    test("return true when 4 players", () => {
      const game = new Game({ id: "game" });

      game.addPlayer();
      game.addPlayer();
      game.addPlayer();
      game.addPlayer();

      expect(game.isFull()).toBeTruthy();
    });
  });

  describe("nextPlayerAfter", () => {
    test("return next player", () => {
      const game = new Game({ id: "game" });
      const firstPlayer = game.addPlayer();
      const secondPlayer = game.addPlayer();

      expect(game.nextPlayerAfter(firstPlayer)).toBe(secondPlayer);
    });

    test("return first player if current player is the last of the list", () => {
      const game = new Game({ id: "game" });
      const firstPlayer = game.addPlayer();
      const secondPlayer = game.addPlayer();

      expect(game.nextPlayerAfter(secondPlayer)).toBe(firstPlayer);
    });
  });

  describe("currentPlayer", () => {
    test("return the player that is playing", () => {
      const game = new Game({ id: "game" });
      const playerA = game.addPlayer();
      const playerB = game.addPlayer();
      game.start();

      const playingPlayer = playerA.isPlaying() ? playerA : playerB;

      expect(game.currentPlayer()).toBe(playingPlayer);
    });
  });

  describe("end", () => {
    test("should have been start to be ended", () => {
      const game = new Game({ id: "game" });

      expect(() => game.end()).toThrow("Game has not started");
    });

    test("change state to ended", () => {
      const game = new Game({ id: "game", state: "started" });

      game.end();

      expect(game.toDto().state).toBe("ended");
    });
  });

  describe("isStarted", () => {
    test("return true if state is started", () => {
      const game = new Game({ id: "game", state: "started" });

      expect(() => game.isStarted()).toBeTruthy();
    });
  });

  describe("isEnded", () => {
    test("return true if state is ended", () => {
      const game = new Game({ id: "game", state: "ended" });

      expect(() => game.isEnded()).toBeTruthy();
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const game = new Game({ id: "game" });

      expect(game.toDto()).toStrictEqual({
        players: [],
        drawStack: {
          isEmpty: false,
        },
        gameBoard: {
          isValid: true,
          combinations: [],
          hasModifications: false,
        },
        state: "created",
        isFull: false,
      });
    });
  });
});
