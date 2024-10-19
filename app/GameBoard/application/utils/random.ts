import type { ICombination } from "@/app/Combination/application/Combination";
import { randomCombination } from "@/app/Combination/application/utils/random";
import { GameBoard } from "@/app/GameBoard/application/GameBoard";

export const randomGameBoard = () => {
  const NB_COMBI = 20;

  const combinations: Array<ICombination> = [];
  for (let i = 0; i < NB_COMBI; i++) {
    combinations.push(randomCombination());
  }

  return new GameBoard({
    combinations,
  });
};
