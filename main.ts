import { CardList } from "./core/card/cards";
import { drawCard, makeDrawStack } from "./core/draw";
import {
  PLAYER_STARTUP_CARD_COUNT,
  Player,
  giveCard,
  makePlayer,
} from "./core/player";

const drawStack = makeDrawStack();
const player1: Player = makePlayer();

// console.log(drawStack);

const turn = (drawStack: CardList, player: Player) => {
  const drawn = drawCard(drawStack);

  const newDrawStack = drawn.drawStack;

  const newPlayer = giveCard(player, [drawn.card]);

  if (newPlayer.cards.length < PLAYER_STARTUP_CARD_COUNT) {
    turn(newDrawStack, newPlayer);
  }
};

turn(drawStack, player1);
