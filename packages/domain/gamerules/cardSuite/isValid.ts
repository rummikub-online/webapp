import {
  SUITE_MAX_CARDS_COUNT,
  SUITE_MAX_END_NUM,
  SUITE_MIN_CARDS_COUNT,
  SUITE_MIN_START_NUM,
} from "../../constants/cardSuite";
import { CardListDto } from "../../dtos/cardList";
import { isJoker } from "../../utils/card/isJoker";

const hasValidLength = (cardSuite: CardListDto): boolean =>
  SUITE_MIN_CARDS_COUNT <= cardSuite.length &&
  cardSuite.length <= SUITE_MAX_CARDS_COUNT;

const firstIndexOfNonJokerCard = (cardSuite: CardListDto): number => {
  const nextIndexIfJokerAt = (currentIndex: number): number => {
    const currentCard = cardSuite[currentIndex];

    if (isJoker(currentCard)) {
      return nextIndexIfJokerAt(currentIndex + 1);
    }

    return currentIndex;
  };
  const firstIndex = 0;

  return nextIndexIfJokerAt(firstIndex);
};

const lastIndexOfNonJokerCard = (cardSuite: CardListDto): number => {
  const previousIndexIfJokerAt = (currentIndex: number): number => {
    const currentCard = cardSuite[currentIndex];

    if (isJoker(currentCard)) {
      return previousIndexIfJokerAt(currentIndex - 1);
    }
    return currentIndex;
  };
  const lastIndex = cardSuite.length - 1;

  return previousIndexIfJokerAt(lastIndex);
};

const areColorsSame = (cardSuite: CardListDto): boolean => {
  const firstCard = cardSuite[firstIndexOfNonJokerCard(cardSuite)];

  return cardSuite
    .filter((card) => !isJoker(card))
    .every((card) => card.color === firstCard.color);
};

const findFirstNum = (cardSuite: CardListDto): number => {
  const firstNonJokerIndex = firstIndexOfNonJokerCard(cardSuite);

  return cardSuite[firstNonJokerIndex].number - firstNonJokerIndex;
};

const findLastNum = (cardSuite: CardListDto): number => {
  const lastNonJokerIndex = lastIndexOfNonJokerCard(cardSuite);

  return (
    cardSuite[lastNonJokerIndex].number +
    (cardSuite.length - 1 - lastNonJokerIndex)
  );
};

const areNumbersFollowing = (cardSuite: CardListDto): boolean => {
  const firstNum = findFirstNum(cardSuite);
  const firstIndex = 0;

  const isFollowing = (currentIndex: number): boolean => {
    const currentCard = cardSuite[currentIndex];

    if (currentCard === undefined) {
      return true;
    }

    if (isJoker(currentCard)) {
      return isFollowing(currentIndex + 1);
    }

    if (currentCard.number === firstNum + currentIndex) {
      return isFollowing(currentIndex + 1);
    }

    return false;
  };

  return isFollowing(firstIndex);
};

const hasValidBounds = (cardSuite: CardListDto): boolean =>
  SUITE_MIN_START_NUM <= findFirstNum(cardSuite) &&
  findLastNum(cardSuite) <= SUITE_MAX_END_NUM;

export const isValidCardSuite = (cardSuite: CardListDto): boolean =>
  hasValidLength(cardSuite) &&
  areColorsSame(cardSuite) &&
  areNumbersFollowing(cardSuite) &&
  hasValidBounds(cardSuite);
