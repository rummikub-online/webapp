import type { Express } from "express";
import { IGameRepository } from "./entities/GameRepository";

export const registerRoutes = (
  app: Express,
  gameRepository: IGameRepository,
) => {
  app.post("/games", (req, res) => {
    const game = gameRepository.create();

    res.json(game.toInfosDto());
  });
};
