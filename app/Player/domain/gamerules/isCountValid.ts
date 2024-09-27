import { MAX_PLAYERS, MIN_PLAYERS } from "@/app/Player/domain/constants/player";

export const isPlayerCountValid = (count: number) =>
  MIN_PLAYERS <= count && count <= MAX_PLAYERS;
