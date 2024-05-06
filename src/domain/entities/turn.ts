import { CardList } from "./card";
import { Player } from "./player";

export type Turn = {
  drawStack: CardList;
  gameBoard: Array<CardList>;
  players: Array<Player>;
  currentPlayerIndex: number;
};
