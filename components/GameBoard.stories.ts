import GameBoard from "./GameBoard.vue";

export default {
  component: GameBoard,
  title: "GameBoard",
  tags: ["autodocs"],
  argTypes: {
    gameBoard: {},
  },
};

export const Valid = {
  args: {
    gameBoard: {
      combinations: [
        {
          type: "suite",
          cards: [
            {
              color: "red",
              number: 11,
            },
            {
              color: "red",
              number: 12,
            },
            {
              color: "red",
              number: 13,
            },
          ],
        },
        {
          type: "serie",
          cards: [
            {
              color: "red",
              number: 11,
            },
            {
              color: "blue",
              number: 11,
            },
            {
              color: "yellow",
              number: 11,
            },
          ],
        },
      ],
    },
  },
};
