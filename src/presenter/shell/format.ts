import chalk from "chalk";
import { CARD_JOKER_NUMBER } from "../../domain/constants/card";
import { CardDto } from "../../domain/dtos/card";
import { CombinationDto } from "../../domain/dtos/combination";

export const formatCard = (card: CardDto): string =>
  chalk[card.color](card.number === CARD_JOKER_NUMBER ? "J" : card.number);

export const formatCombination = (combination: CombinationDto): string =>
  `(${combination.cards.map(formatCard).join(" ")})`;
