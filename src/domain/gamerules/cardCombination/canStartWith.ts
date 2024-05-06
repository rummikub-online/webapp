import { MIN_POINTS_TO_START } from "../../constants/player";
import { CardCombination } from "../../entities/cardCombination";
import { cardCombinationsPoints } from "./points";

export const canStartWithCardCombinations = (
  combinations: Array<CardCombination>
) => cardCombinationsPoints(combinations) > MIN_POINTS_TO_START;
