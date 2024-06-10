import { Game } from "./Game";
import { GameRepository } from "./GameRepository";
import { Player } from "./Player";

describe("GameRepository", () => {
  describe("exists", () => {
    test("return true if game exists", () => {
      const game = new Game({ id: "1", state: "started" });
      const gameRepository = new GameRepository({
        games: [game],
      });

      expect(gameRepository.exists("1")).toBe(true);
    });

    test("return false if game do not exists", () => {
      const gameRepository = new GameRepository({
        games: [],
      });

      expect(gameRepository.exists("1")).toBe(false);
    });
  });

  describe("findById", () => {
    test("return existent game", () => {
      const game = new Game({ id: "1", state: "started" });
      const gameRepository = new GameRepository({
        games: [game],
      });

      const foundGame = gameRepository.findById("1");

      expect(foundGame).toBe(game);
    });

    test("throw error if inexistent game", () => {
      const gameRepository = new GameRepository({
        games: [],
      });

      expect(() => gameRepository.findById("1")).toThrow();
    });
  });

  describe("create", () => {
    test("create game and return it", () => {
      const gameRepository = new GameRepository();

      const game = gameRepository.create();

      expect(game).toBeInstanceOf(Game);
      expect(gameRepository.findById(game.id)).toBe(game);
    });
  });

  describe("createWithPlayer", () => {
    test("create game and player and return them", () => {
      const gameRepository = new GameRepository();

      const { game, player } = gameRepository.createWithPlayer();

      expect(game).toBeInstanceOf(Game);
      expect(player).toBeInstanceOf(Player);
      expect(gameRepository.findById(game.id)).toBe(game);
    });
  });

  describe("join", () => {
    test("join game and return it", () => {
      const gameRepository = new GameRepository({
        games: [new Game({ id: "1" })],
      });

      const { game, player } = gameRepository.join("1");

      expect(game).toBeInstanceOf(Game);
      expect(player).toBeInstanceOf(Player);
    });

    test("throw an error if game not found", () => {
      const gameRepository = new GameRepository();

      expect(() => gameRepository.join("1")).toThrow();
    });

    test("throw an error if game not joinable", () => {
      const gameRepository = new GameRepository({
        games: [new Game({ id: "1", state: "started" })],
      });

      expect(() => gameRepository.join("1")).toThrow();
    });
  });

  describe("destroy", () => {
    test("delete game", () => {
      const gameRepository = new GameRepository({
        games: [new Game({ id: "1", state: "started" })],
      });

      gameRepository.destroy("1");

      expect(() => gameRepository.findById("1")).toThrow();
    });
  });
});
