import type { IGameManager } from "@/app/Game/application/GameManager";
import type { IGameRepository } from "@/app/Game/application/GameRepository/IGameRepository";
import { randomGameBoard } from "@/app/GameBoard/application/utils/random";

export const loadMocks = ({
  gameRepository,
  gameManager,
}: {
  gameRepository: IGameRepository;
  gameManager: IGameManager;
}) => {
  {
    const { game: overflowGame } = gameManager.connect({
      gameId: "overflow",
      username: "VeryLongAndAnnoyingUsername",
    });
    gameManager.connect({
      gameId: "overflow",
      username: "AnotherPlayer",
    });
    gameManager.connect({
      gameId: "overflow",
      username: "Bob",
    });
    overflowGame.start();
    gameManager.disconnect({ gameId: "overflow", username: "Bob" });
  }

  {
    const game = gameRepository.create({
      id: "ending",
      gameBoard: randomGameBoard(),
    });
    const bob = game.addPlayer({ username: "Bob" });
    bob.drawStartupCards = function () {
      // @ts-expect-error
      this.hasDrawnStartupCards = true;

      // @ts-expect-error
      this.hasStarted = true;

      // @ts-expect-error
      this.cards = [
        { number: 10, color: "blue", duplicata: 1 },
        { number: 11, color: "blue", duplicata: 1 },
        { number: 12, color: "blue", duplicata: 1 },
      ];
    };

    const alice = game.addPlayer({ username: "Alice" });
    gameManager.connect({ gameId: "ending", username: "Alice" });

    game.start();
  }
};
