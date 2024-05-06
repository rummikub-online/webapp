import { CardList } from "./entities/card";
import { Turn } from "./entities/turn";
import { nextTurn } from "./turn";

const fakeDrawStackOf30Cards: CardList = Object.freeze(
  [...Array(30)].map((_) => Object.freeze({ color: "blue", num: 1 }))
);

describe("turn", () => {
  test("give startup cards if payer don't have received them", () => {
    const turn1: Turn = {
      drawStack: fakeDrawStackOf30Cards,
      players: [
        {
          id: "user1",
          cards: [],
          hasDrewStartupCards: false,
        },
      ],
      gameBoard: [],
      currentPlayerIndex: 0,
    };

    const turn2 = nextTurn(turn1);

    expect(turn2.players[0].cards).toHaveLength(14);
    expect(turn2.players[0].hasDrewStartupCards).toBeTruthy();
  });

  test("pass the turn to the next player in the circle", () => {
    const turn1: Turn = {
      drawStack: fakeDrawStackOf30Cards,
      players: [
        {
          id: "user1",
          cards: [],
          hasDrewStartupCards: false,
        },
        {
          id: "user2",
          cards: [],
          hasDrewStartupCards: false,
        },
      ],
      gameBoard: [],
      currentPlayerIndex: 0,
    };

    const turn2 = nextTurn(turn1);

    expect(turn2.currentPlayerIndex).toBe(1);
  });

  test("pass the turn to the first player if previous player was the last of the circle", () => {
    const turn1: Turn = {
      drawStack: fakeDrawStackOf30Cards,
      players: [
        {
          id: "user1",
          cards: [],
          hasDrewStartupCards: false,
        },
        {
          id: "user2",
          cards: [],
          hasDrewStartupCards: false,
        },
      ],
      gameBoard: [],
      currentPlayerIndex: 1,
    };

    const turn2 = nextTurn(turn1);

    expect(turn2.currentPlayerIndex).toBe(0);
  });
});
