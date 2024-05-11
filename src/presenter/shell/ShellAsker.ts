import { prompt } from "enquirer";
import { IGame } from "../../application/entities/Game";
import { IPlayer } from "../../application/entities/Player";
import { CombinationDto } from "../../domain/dtos/combination";
import {
  EnquirerChoice,
  EnquirerResponse,
  OrderCardsBy,
  ShellPresenter,
  TurnAction,
} from "./ShellPresenter";
import { formatCard, formatCombination } from "./format";

export class ShellTurnActionAsker {
  presenter: ShellPresenter;
  constructor(presenter: ShellPresenter) {
    this.presenter = presenter;
  }

  async askTurnAction(
    player: IPlayer,
    orderCardsBy: OrderCardsBy
  ): Promise<TurnAction> {
    const choices: Array<EnquirerChoice<TurnAction>> = [];

    if (orderCardsBy === "orderCardsByColor") {
      choices.push({
        message: "Order cards by number",
        name: "orderCardsByNumber",
      });
    } else {
      choices.push({
        message: "Order cards by color",
        name: "orderCardsByColor",
      });
    }

    if (player.canDrawCard()) {
      choices.push({
        message: "Draw card and terminate the turn",
        name: "drawCard",
      });
    }

    if (player.canPlaceCardAlone()) {
      choices.push({
        message: "Place card alone",
        name: "placeCardAlone",
      });
    }

    if (player.canMoveCardToCombination()) {
      choices.push({
        message: "Place card in combination",
        name: "placeCardInCombination",
      });
    }

    if (player.canMoveCardAlone()) {
      choices.push({
        message: "Move card alone",
        name: "moveCardAlone",
      });
    }

    if (player.canMoveCardToCombination()) {
      choices.push({
        message: "Move card to combination",
        name: "moveCardToCombination",
      });
    }

    if (player.canCancelTurnModifications()) {
      choices.push({
        message: "Cancel modifications",
        name: "cancelTurnModifications",
      });
    }

    if (player.canEndTurn()) {
      choices.push({
        message: "End turn",
        name: "endTurn",
      });
    }

    const { action } = (await prompt({
      type: "select",
      name: "action",
      message: `${player.username ?? player.id}, what do you do?`,
      choices,
    })) as EnquirerResponse<TurnAction>;

    return action;
  }

  async askCardToMove(player: IPlayer): Promise<number> {
    const choices: Array<EnquirerChoice<string>> = this.presenter
      .orderedCards(player)
      .map((card) => ({
        message: formatCard(card),
        name: card.initialIndex.toString(),
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
}
