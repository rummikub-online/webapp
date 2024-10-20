import type { GameId, GameProps, IGame } from "@/app/Game/application/Game";

export interface IGameRepository {
  exists: (id: GameId) => boolean;
  findById: (id: GameId) => IGame;
  create: (props?: GameProps) => IGame;
  findOrCreate: (id: GameId) => IGame;
  destroy: (id: GameId) => void;
  freeGameId: () => GameId;
}
