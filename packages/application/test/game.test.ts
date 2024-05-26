import { DrawStack } from "../entities/DrawStack";
import { Game } from "../entities/Game";
import { GameBoard } from "../entities/GameBoard";

const drawStackMockedToGiveWinningStartupCards = jest
  .spyOn(DrawStack.prototype, "drawStartupCards")
  .mockImplementation(() => [
    { color: "blue", number: 11, duplicata: 1 },
    { color: "blue", number: 12, duplicata: 1 },
    { color: "blue", number: 13, duplicata: 1 },
  ]);

test("A game can be played", () => {
  const gameBoard = new GameBoard({});
  const drawStack = new DrawStack({});
  const game = new Game({
    id: "game",
    gameBoard,
    drawStack,
  });
  expect(game.toDto().state).toBe("created");

  const playerA = game.addPlayer();
  const playerB = game.addPlayer();

  game.start();
  expect(game.toDto().state).toBe("started");

  expect(playerA.isPlaying() || playerB.isPlaying()).toBeTruthy();

  const firstPlayer = playerA.isPlaying() ? playerA : playerB;

  const combinationIndex = firstPlayer.placeCardAlone(0);
  firstPlayer.placeCardInCombination(0, { combinationIndex, cardIndex: 1 });
  firstPlayer.placeCardInCombination(0, { combinationIndex, cardIndex: 2 });

  firstPlayer.endTurn();

  expect(firstPlayer.hasWon()).toBe(true);
  expect(game.winner().id).toBe(firstPlayer.id);
  expect(game.isEnded()).toBeTruthy();
});
