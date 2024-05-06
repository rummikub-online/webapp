import { CardCombination } from "./cardCombination";
import { Player } from "./player";

export type Game = {
  drawStack: CardCombination;
  gameBoard: Array<CardCombination>;
  players: Array<Player>;
  currentPlayerIndex: number;
};
