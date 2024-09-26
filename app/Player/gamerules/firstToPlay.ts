import type { CardListDto } from "@/app/Card/dtos/cardList";
import { isJoker } from "@/app/Card/gamerules/isJoker";

export const indexOfFirstPlayerByDrawedCard = (
  cardsDrawedByPlayers: CardListDto
) => {
  const findBestCardIndex = (
    bestCardIndex: number = 0,
    cardIndex: number = 0
  ): number => {
    const card = cardsDrawedByPlayers[cardIndex];

    if (card === undefined) {
      return bestCardIndex;
    }

    if (isJoker(card)) {
      return cardIndex;
    }

    const bestCard = cardsDrawedByPlayers[bestCardIndex];
    const newBestCardIndex =
      card.number > bestCard.number ? cardIndex : bestCardIndex;

    return findBestCardIndex(newBestCardIndex, cardIndex + 1);
  };

  return findBestCardIndex();
};
