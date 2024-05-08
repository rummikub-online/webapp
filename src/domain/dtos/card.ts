export type CardColor = "red" | "blue" | "black" | "yellow";

export type CardJokerNumber = 0;

export type CardNumber =
  | CardJokerNumber
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13;

export type CardDto = Readonly<{
  color: CardColor;
  number: CardNumber;
}>;
