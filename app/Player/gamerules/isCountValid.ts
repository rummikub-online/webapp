import { MAX_PLAYERS, MIN_PLAYERS } from "@/app/Player/constants/player";

export const isPlayerCountValid = (count: number) =>
  MIN_PLAYERS <= count && count <= MAX_PLAYERS;
