import type { IGameManager } from "@/app/Game/application/GameManager";
import type { IGameRepository } from "@/app/Game/application/GameRepository";

export const loadMocks = ({
  gameRepository,
  gameManager,
}: {
  gameRepository: IGameRepository;
  gameManager: IGameManager;
}) => {
  const startedGame = gameRepository.create("started");
  startedGame.addPlayer();
  startedGame.addPlayer();
  startedGame.start();
};
