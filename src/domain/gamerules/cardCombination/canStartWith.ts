import { MIN_POINTS_TO_START } from "../../constants/player";
import { CardCombinationDto } from "../../dtos/cardCombination";
import { cardCombinationsPoints } from "./points";

export const canStartWithCardCombinations = (
  combinations: Array<CardCombinationDto>
) => cardCombinationsPoints(combinations) > MIN_POINTS_TO_START;
