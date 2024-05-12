import { MAX_PLAYERS, MIN_PLAYERS } from "../../constants/player";

export const isPlayerCountValid = (count: number) =>
  MIN_PLAYERS <= count && count <= MAX_PLAYERS;
