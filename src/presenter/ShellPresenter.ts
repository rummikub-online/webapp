import chalk from "chalk";
import { prompt } from "enquirer";
import { IGame } from "../application/entities/Game";
import { IPlayer } from "../application/entities/Player";
import { IPresenter } from "../application/rummikub";
import { CardDto } from "../domain/dtos/card";
import { CombinationDto } from "../domain/dtos/combination";

const formatCard = (card: CardDto): string => chalk[card.color](card.number);
const formatCombination = (combination: CombinationDto): string =>
  `(${combination.cards.map(formatCard).join(" ")})`;

type EnquirerChoice<T> = {
  message: string;
  name: T;
};
type EnquirerResponse<T> = { action: T };

type TurnAction =
  | "drawCard"
  | "placeCardAlone"
  | "placeCardInCombination"
  | "moveCardAlone"
  | "moveCardToCombination"
  | "cancelTurnModifications"
  | "endTurn";

export class ShellPresenter implements IPresenter {
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
      player.toDto().cards.map(formatCard).join(" "),
      "\n"
    );
  }

  async handlePlayerTurn(game: IGame, player: IPlayer): Promise<void> {
    this.displayGame(game);
    this.displayCards(player);

    const turnAction = await this.askTurnAction(game, player);

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
      const cardToMove = await this.askCardToMove(player);
      player.placeCardAlone(cardToMove);
      return await this.handlePlayerTurn(game, player);
    }

    if (turnAction === "placeCardInCombination") {
      const cardToMove = await this.askCardToMove(player);
      const combinationIndex = await this.askCombination(game);
      const cardIndex = await this.askPlaceInCombination(
        game.toDto().gameBoard.combinations[combinationIndex]
      );
      player.placeCardInCombination(cardToMove, {
        combinationIndex,
        cardIndex,
      });
      return await this.handlePlayerTurn(game, player);
    }

    if (turnAction === "moveCardAlone") {
      const combinationIndex = await this.askCombination(game);
      const cardIndex = await this.askPlaceInCombination(
        game.toDto().gameBoard.combinations[combinationIndex]
      );
      player.moveCardAlone({
        combinationIndex,
        cardIndex,
      });
      return await this.handlePlayerTurn(game, player);
    }
  }

  async askTurnAction(game: IGame, player: IPlayer): Promise<TurnAction> {
    const choices: Array<EnquirerChoice<TurnAction>> = [];

    if (!game.toDto().gameBoard.hasModifications) {
      choices.push({
        message: "Draw card and terminate the turn",
        name: "drawCard",
      });
    }

    choices.push({
      message: "Place card alone",
      name: "placeCardAlone",
    });

    if (game.toDto().gameBoard.combinations.length > 0) {
      choices.push(
        {
          message: "Place card in combination",
          name: "placeCardInCombination",
        },
        {
          message: "Move card alone",
          name: "moveCardAlone",
        },
        {
          message: "Move card to combination",
          name: "moveCardToCombination",
        }
      );
    }

    if (game.toDto().gameBoard.hasModifications) {
      choices.push({
        message: "Cancel modifications",
        name: "cancelTurnModifications",
      });

      if (game.toDto().gameBoard.isValid) {
        choices.push({
          message: "End turn",
          name: "endTurn",
        });
      }
    }

    const { action } = (await prompt({
      type: "select",
      name: "action",
      message: `Turn of user ${player.username ?? player.id}, what you do?`,
      choices,
    })) as EnquirerResponse<TurnAction>;

    return action;
  }

  async askCardToMove(player: IPlayer): Promise<number> {
    const choices: Array<EnquirerChoice<string>> = player
      .toDto()
      .cards.map((card, index) => ({
        message: formatCard(card),
        name: index.toString(),
      }));

    const { action } = (await prompt({
      type: "select",
      name: "action",
      message: `What card ?`,
      choices,
    })) as EnquirerResponse<string>;

    return parseInt(action);
  }

  async askCombination(game: IGame): Promise<number> {
    const choices: Array<EnquirerChoice<string>> = game
      .toDto()
      .gameBoard.combinations.map((combination, index) => ({
        message: formatCombination(combination),
        name: index.toString(),
      }));

    const { action } = (await prompt({
      type: "select",
      name: "action",
      message: `What combination ?`,
      choices,
    })) as EnquirerResponse<string>;

    return parseInt(action);
  }

  async askPlaceInCombination(combination: CombinationDto): Promise<number> {
    const choices: Array<EnquirerChoice<string>> = [
      ...combination.cards.map((card, index) => ({
        message: `Before ${formatCard(card)}`,
        name: index.toString(),
      })),
      {
        message: "At end",
        name: combination.cards.length.toString(),
      },
    ];

    const { action } = (await prompt({
      type: "select",
      name: "action",
      message: `Where ?`,
      choices,
    })) as EnquirerResponse<string>;

    return parseInt(action);
  }

  async handleWin(winner: IPlayer): Promise<void> {
    console.log("\n\n\n", `${winner.username ?? winner.id} has won !`);
  }
}
