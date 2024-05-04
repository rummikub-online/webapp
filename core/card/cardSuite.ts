import { CardList, isJoker } from "./cards";

const SUITE_MIN_START_NUM = 1;
const SUITE_MAX_END_NUM = 13;
const SUITE_MIN_CARDS_COUNT = 3;
const SUITE_MAX_CARDS_COUNT = 13;

const hasValidLength = (cardSuite: CardList): boolean =>
  SUITE_MIN_CARDS_COUNT <= cardSuite.length &&
  cardSuite.length <= SUITE_MAX_CARDS_COUNT;

const firstIndexOfNonJokerCard = (cardSuite: CardList): number => {
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

const lastIndexOfNonJokerCard = (cardSuite: CardList): number => {
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

const areColorsSame = (cardSuite: CardList): boolean => {
  const firstCard = cardSuite[firstIndexOfNonJokerCard(cardSuite)];

  return cardSuite
    .filter((card) => !isJoker(card))
    .every((card) => card.color === firstCard.color);
};

const findFirstNum = (cardSuite: CardList): number => {
  const firstNonJokerIndex = firstIndexOfNonJokerCard(cardSuite);

  return cardSuite[firstNonJokerIndex].num - firstNonJokerIndex;
};

const findLastNum = (cardSuite: CardList): number => {
  const lastNonJokerIndex = lastIndexOfNonJokerCard(cardSuite);

  return (
    cardSuite[lastNonJokerIndex].num +
    (cardSuite.length - 1 - lastNonJokerIndex)
  );
};

const areNumbersFollowing = (cardSuite: CardList): boolean => {
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

    if (currentCard.num === firstNum + currentIndex) {
      return isFollowing(currentIndex + 1);
    }

    return false;
  };

  return isFollowing(firstIndex);
};

const hasValidBounds = (cardSuite: CardList): boolean =>
  SUITE_MIN_START_NUM <= findFirstNum(cardSuite) &&
  findLastNum(cardSuite) <= SUITE_MAX_END_NUM;

export const isValidCardSuite = (cardSuite: CardList): boolean =>
  hasValidLength(cardSuite) &&
  areColorsSame(cardSuite) &&
  areNumbersFollowing(cardSuite) &&
  hasValidBounds(cardSuite);
