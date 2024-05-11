import { randomUUID } from "crypto";
import { Game, IGame } from "./entities/Game";
import { IPlayer } from "./entities/Player";

export type RummikubProps = {
  presenter: IPresenter;
};

export interface IPresenter {
  handlePlayerTurn(game: IGame, player: IPlayer): Promise<void>;
  handleWin(game: IGame, winner: IPlayer): Promise<void>;
}

export class Rummikub {
  private readonly presenter: IPresenter;
  private game: Game | undefined;

  constructor(props: RummikubProps) {
    this.presenter = props.presenter;
  }

  async newGame() {
    this.game = new Game({ id: randomUUID() });

    this.game.addPlayer({ username: "Alice" });
    this.game.addPlayer({ username: "Bob" });

    this.game.start();

    while (!this.game.isEnded()) {
      await this.presenter.handlePlayerTurn(
        this.game,
        this.game.currentPlayer()
      );
    }

    const winner = this.game.winner();

    this.presenter.handleWin(winner);
  }
}
