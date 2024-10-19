import type { IGameManager } from "@/app/Game/application/GameManager";
import type { IGameRepository } from "@/app/Game/application/GameRepository";
import { randomGameBoard } from "@/app/GameBoard/application/utils/random";

export const loadMocks = ({
  gameRepository,
  gameManager,
}: {
  gameRepository: IGameRepository;
  gameManager: IGameManager;
}) => {
  // {
  //   const { game: overflowGame } = gameManager.connect({
  //     gameId: "overflow",
  //     username: "VeryLongAndAnnoyingUsername",
  //   });
  //   gameManager.connect({
  //     gameId: "overflow",
  //     username: "AnotherPlayer",
  //   });
  //   gameManager.connect({
  //     gameId: "overflow",
  //     username: "Bob",
  //   });
  //   overflowGame.start();
  //   gameManager.disconnect({ gameId: "ending", username: "Bob" });
  // }

  {
    gameRepository.create("ending", {
      gameBoard: randomGameBoard(),
    });
    const { game: endingGame, player: alice } = gameManager.connect({
      gameId: "ending",
      username: "Alice",
    });
    const { player: bob } = gameManager.connect({
      gameId: "ending",
      username: "Bob",
    });
    endingGame.start();
    gameManager.disconnect({ gameId: "ending", username: "Bob" });
  }
};
