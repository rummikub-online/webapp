import { IGame } from "../../application/entities/Game";
import { IPlayer } from "../../application/entities/Player";
import { IPresenter } from "../../application/rummikub";
import {
  OrderedCardDto,
  byColor,
  byNumber,
} from "../../domain/utils/card/grouping";
import { ShellTurnActionAsker } from "./ShellAsker";
import { formatCard, formatCombination } from "./format";

export type EnquirerChoice<T> = {
  message: string;
  name: T;
};
export type EnquirerResponse<T> = { action: T };

export type OrderCardsBy = "orderCardsByColor" | "orderCardsByNumber";

export type TurnAction =
  | OrderCardsBy
  | "drawCard"
  | "placeCardAlone"
  | "placeCardInCombination"
  | "moveCardAlone"
  | "moveCardToCombination"
  | "cancelTurnModifications"
  | "endTurn";

export class ShellPresenter implements IPresenter {
  private orderCardsBy: OrderCardsBy = "orderCardsByColor";

  private asker: ShellTurnActionAsker = new ShellTurnActionAsker(this);

  orderedCards(player: IPlayer): Array<OrderedCardDto> {
    return this.orderCardsBy === "orderCardsByColor"
      ? byColor(player.toDto().cards)
      : byNumber(player.toDto().cards);
  }

  private displayGame(game: IGame) {
    const gameDto = game.toDto();

    console.log(
      "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame board :\n",
      gameDto.gameBoard.combinations.map(formatCombination).join("   "),
      "\n"
    );
  }

  private displayCards(player: IPlayer) {
    console.log(
      "Your cards :\n",
      this.orderedCards(player).map(formatCard).join(" "),
      "\n"
    );
  }

  async handlePlayerTurn(game: IGame, player: IPlayer): Promise<void> {
    this.displayGame(game);
    this.displayCards(player);

    const turnAction = await this.asker.askTurnAction(
      player,
      this.orderCardsBy
    );

    if (turnAction === "orderCardsByColor") {
      this.orderCardsBy = "orderCardsByColor";
      return this.handlePlayerTurn(game, player);
    }

    if (turnAction === "orderCardsByNumber") {
      this.orderCardsBy = "orderCardsByNumber";
      return this.handlePlayerTurn(game, player);
    }

    if (turnAction === "drawCard") {
      player.drawCard();
      return;
    }

    if (turnAction === "endTurn") {
      player.endTurn();
      return;
    }

    if (turnAction === "cancelTurnModifications") {
      player.cancelTurnModifications();
      return await this.handlePlayerTurn(game, player);
    }

    if (turnAction === "placeCardAlone") {
      const cardToMove = await this.asker.askCardToMove(player);
      player.placeCardAlone(cardToMove);
      return await this.handlePlayerTurn(game, player);
    }

    if (turnAction === "placeCardInCombination") {
      const cardToMove = await this.asker.askCardToMove(player);
      const combinationIndex = await this.asker.askCombination(game);
      const cardIndex = await this.asker.askPlaceInCombination(
        game.toDto().gameBoard.combinations[combinationIndex]
      );
      player.placeCardInCombination(cardToMove, {
        combinationIndex,
        cardIndex,
      });
      return await this.handlePlayerTurn(game, player);
    }

    if (turnAction === "moveCardAlone") {
      const combinationIndex = await this.asker.askCombination(game);
      const cardIndex = await this.asker.askPlaceInCombination(
        game.toDto().gameBoard.combinations[combinationIndex]
      );
      player.moveCardAlone({
        combinationIndex,
        cardIndex,
      });
      return await this.handlePlayerTurn(game, player);
    }
  }

  async handleWin(winner: IPlayer): Promise<void> {
    console.log("\n\n\n", `${winner.username ?? winner.id} has won !`);
  }
}
