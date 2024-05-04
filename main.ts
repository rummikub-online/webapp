import { CardList } from "./cards/card";
import { drawCard, makeDrawStack } from "./draw";
import {
  NUMBER_CARDS_PLAYER_STARTUP,
  Player,
  giveCard,
  makePlayer,
} from "./player";

const drawStack = makeDrawStack();
const player1: Player = makePlayer();

// console.log(drawStack);

const turn = (drawStack: CardList, player: Player) => {
  const drawn = drawCard(drawStack);

  const newDrawStack = drawn.drawStack;

  const newPlayer = giveCard(player, [drawn.card]);

  if (newPlayer.cards.length < NUMBER_CARDS_PLAYER_STARTUP) {
    turn(newDrawStack, newPlayer);
  }
};

turn(drawStack, player1);
