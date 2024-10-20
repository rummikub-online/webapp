import { CARDS } from "@/app/Card/domain/constants/card";
import { Game } from "@/app/Game/application/Game";
import { GameRepository } from "@/app/Game/application/GameRepository";
import { describe, expect, test } from "vitest";

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

    test("create game with test id won't shuffle cards", () => {
      const gameRepository = new GameRepository();
      const game = gameRepository.create({ id: "test" });

      const firstPlayer = game.addPlayer();
      game.addPlayer();
      game.start();

      const firstPlayerCards = firstPlayer.toDto().cards;
      const unshuffledStartupCards = CARDS.slice(0, firstPlayerCards.length);

      expect(firstPlayerCards).toStrictEqual(unshuffledStartupCards);
    });

    test("create game without test id will shuffle cards", () => {
      const gameRepository = new GameRepository();
      const game = gameRepository.create();

      const firstPlayer = game.addPlayer();
      game.addPlayer();
      game.start();

      const firstPlayerCards = firstPlayer.toDto().cards;
      const unshuffledStartupCards = CARDS.slice(0, firstPlayerCards.length);

      expect(firstPlayerCards).not.toStrictEqual(unshuffledStartupCards);
    });
  });

  describe("findOrCreate", () => {
    test("return existent game", () => {
      const game = new Game({ id: "1", state: "started" });
      const gameRepository = new GameRepository({
        games: [game],
      });

      const foundGame = gameRepository.findOrCreate("1");

      expect(foundGame).toBe(game);
    });

    test("create new game if inexistent game", () => {
      const gameRepository = new GameRepository({
        games: [],
      });

      const createdGame = gameRepository.findOrCreate("1");

      expect(createdGame).toBeInstanceOf(Game);
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

  describe("freeGameId", () => {
    test("return free id composed of digits with length of 3", () => {
      const gameRepository = new GameRepository();

      const REPEATS = 100;
      const ids: Array<string> = [];

      const isNumeric = (value: any) => /^-?\d+$/.test(value);

      for (let i = 0; i < REPEATS; i++) {
        const id = gameRepository.freeGameId();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(3);
        expect(isNumeric(id)).toBeTruthy();
        expect(ids).not.toContain(id);
        ids.push(id);
        gameRepository.create({ id });
      }
    });
  });
});
