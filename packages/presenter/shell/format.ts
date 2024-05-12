import { CARD_JOKER_NUMBER } from "@rummikub-ma/domain/constants/card";
import { CardDto } from "@rummikub-ma/domain/dtos/card";
import { CombinationDto } from "@rummikub-ma/domain/dtos/combination";
import chalk from "chalk";

export const formatCard = (card: CardDto): string =>
  chalk[card.color](card.number === CARD_JOKER_NUMBER ? "J" : card.number);

export const formatCombination = (combination: CombinationDto): string =>
  `(${combination.cards.map(formatCard).join(" ")})`;
