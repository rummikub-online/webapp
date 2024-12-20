import {
  DrawStack,
  type IDrawStack
} from "@/app/DrawStack/application/DrawStack";
import type { DrawStackDto } from "@/app/DrawStack/domain/dtos/drawStack";
import {
  GameBoard,
  type IGameBoard
} from "@/app/GameBoard/application/GameBoard";
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";
import {
  type IPlayer,
  type IPlayerFactory,
  Player
} from "@/app/Player/application/Player";
import { MAX_PLAYERS } from "@/app/Player/domain/constants/player";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import { indexOfFirstPlayerByDrawedCard } from "@/app/Player/domain/gamerules/firstToPlay";
import { isPlayerCountValid } from "@/app/Player/domain/gamerules/isCountValid";
import { v4 as uuidv4 } from "uuid";

type GenerateUserIdFn = () => string;

export type GameDto = {
  id: GameId;
  drawStack: DrawStackDto;
  gameBoard: GameBoardDto;
  state: GameState;
  players: Array<PlayerDto>;
  isFull: boolean;
};

export type GameInfosDto = {
  id: GameId;
  state: GameState;
  isFull: boolean;
  playersCount: number;
  currentPlayerUsername?: string;
  winnerUsername?: string;
};

type AddPlayerProps = {
  username?: string;
};

export interface IGame {
  id: GameId;

  addPlayer(props?: AddPlayerProps, PlayerClass?: IPlayerFactory): IPlayer;

  findPlayerByUsername(username: string): IPlayer;

  findOrAddPlayer(props?: AddPlayerProps): IPlayer;

  removePlayer(id: string): void;

  get playerCount(): number;

  start(): void;

  end(): void;

  nextPlayerAfter(currentPlayer: IPlayer): IPlayer;

  beginTurnOfNextPlayer(): void;

  isFull(): boolean;

  currentPlayer(): IPlayer;

  winner(): IPlayer;

  canStart(): boolean;

  canAddPlayer(): boolean;

  isStarted(): boolean;

  isEnded(): boolean;

  toDto(): GameDto;

  toInfosDto(): GameInfosDto;
}

export type GameState = "created" | "started" | "ended";
export type GameId = string;

export type GameProps = {
  id: GameId;
  drawStack?: IDrawStack;
  gameBoard?: IGameBoard;
  state?: GameState;
  generateUserId?: GenerateUserIdFn;
};

export class Game implements IGame {
  public readonly id: GameId;

  private readonly usernames = ["Alice", "Bob", "Carol", "Dave"];
  private drawStack: IDrawStack;
  private gameBoard: IGameBoard;
  private players: Array<IPlayer> = [];
  private state: GameState;
  private generateUserId: GenerateUserIdFn;

  constructor(props: GameProps) {
    this.id = props.id;
    this.drawStack = props.drawStack ?? new DrawStack({});
    this.gameBoard = props.gameBoard ?? new GameBoard({});
    this.state = props.state ?? "created";
    this.generateUserId = props.generateUserId ?? (() => uuidv4());
  }

  isFull(): boolean {
    return this.players.length >= MAX_PLAYERS;
  }

  private firstUnusedUsername(): string | undefined {
    const usedUsernames = this.players.map((player) => player.username);

    return this.usernames.find((username) => !usedUsernames.includes(username));
  }

  addPlayer(props?: AddPlayerProps, PlayerClass?: IPlayerFactory): IPlayer {
    if (this.state !== "created") {
      throw new Error("Game has started");
    }

    if (this.isFull()) {
      throw new Error("Max players limit reached");
    }

    const admin = this.players.length === 0;
    const player = new (PlayerClass ?? Player)({
      game: this,
      drawStack: this.drawStack,
      gameBoard: this.gameBoard,
      id: this.generateUserId(),
      admin,
      username: props?.username ?? this.firstUnusedUsername()
    });

    this.players.push(player);

    return player;
  }

  removePlayer(id: string): void {
    const playerIndex = this.players.findIndex((player) => player.id === id);

    if (playerIndex === -1) {
      throw new Error("Unknown player id");
    }

    const newPlayers = [...this.players];
    const [removedPlayer] = newPlayers.splice(playerIndex, 1);
    this.players = newPlayers;

    if (removedPlayer.admin && this.players[0]) {
      this.players[0].admin = true;
    }

    if (this.state === "started") {
      this.end();
    }
  }

  get playerCount(): number {
    return this.players.length;
  }

  findPlayerByUsername(username?: string): IPlayer {
    if (!username) {
      throw new Error("No username given");
    }

    const playerIndex = this.players.findIndex(
      (player) => player.username === username
    );

    if (playerIndex === -1) {
      throw new Error("Unknown player username");
    }

    return this.players[playerIndex];
  }

  findOrAddPlayer(props?: AddPlayerProps): IPlayer {
    try {
      return this.findPlayerByUsername(props?.username);
    } catch (e) {
      return this.addPlayer(props);
    }
  }

  start() {
    if (this.state !== "created") {
      throw new Error("Game already started");
    }

    if (!isPlayerCountValid(this.players.length)) {
      throw new Error("Invalid number of players");
    }

    this.state = "started";

    this.drawStack.shuffle();

    this.players.forEach((player) => player.drawStartupCards());

    this.determineFirstPlayer().beginTurn();
  }

  private determineFirstPlayer(): IPlayer {
    const cards = this.players.map(() => this.drawStack.drawCard());

    const firstPlayerIndex = indexOfFirstPlayerByDrawedCard(cards);

    cards.forEach((card) => this.drawStack.putBack(card));

    this.drawStack.shuffle();

    return this.players[firstPlayerIndex];
  }

  nextPlayerAfter(currentPlayer: IPlayer): IPlayer {
    const playerIndex = this.players.findIndex(
      (player) => player.id === currentPlayer.id
    );

    if (playerIndex >= this.players.length - 1) {
      return this.players[0];
    }

    if (playerIndex < 0) {
      throw new Error("Index out of range");
    }

    return this.players[playerIndex + 1];
  }

  beginTurnOfNextPlayer() {
    this.nextPlayerAfter(this.currentPlayer()).beginTurn();
  }

  currentPlayer(): IPlayer {
    if (this.state !== "started") {
      throw new Error("Game has not started");
    }

    console.log(this.players);

    const player = this.players.find((player) => player.isPlaying());

    if (!player) {
      throw new Error("No current player");
    }

    return player;
  }

  winner(): IPlayer {
    if (this.state !== "ended") {
      throw new Error("Game has not ended");
    }

    const player = this.players.find((player) => player.hasWon());

    if (!player) {
      throw new Error("No winner");
    }

    return player;
  }

  end(): void {
    if (this.state !== "started") {
      throw new Error("Game has not started");
    }

    this.state = "ended";
  }

  canStart(): boolean {
    return this.state === "created" && isPlayerCountValid(this.players.length);
  }

  canAddPlayer(): boolean {
    return this.state === "created" && !this.isFull();
  }

  isStarted(): boolean {
    return this.state === "started";
  }

  isEnded(): boolean {
    return this.state === "ended";
  }

  toDto(): GameDto {
    return {
      id: this.id,
      drawStack: this.drawStack.toDto(),
      gameBoard: this.gameBoard.toDto(),
      players: this.players.map((player) => player.toDto()),
      state: this.state,
      isFull: this.isFull()
    };
  }

  toInfosDto(): GameInfosDto {
    return {
      id: this.id,
      state: this.state,
      isFull: this.isFull(),
      playersCount: this.players.length,
      currentPlayerUsername:
        this.state === "started" ? this.currentPlayer().username : undefined,
      winnerUsername:
        this.state === "ended" ? this.winner().username : undefined
    };
  }
}
