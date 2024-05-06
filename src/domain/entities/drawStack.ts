import { CARDS } from "../constants/card";
import { toShuffled } from "../utils/array";
import { Card } from "./card";

export type DrawStack = Array<Card>;

export const makeDrawStack = (): DrawStack =>
  toShuffled(toShuffled(toShuffled(CARDS)));
