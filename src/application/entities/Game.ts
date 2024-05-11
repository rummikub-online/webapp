import { randomUUID } from "crypto";
import { MAX_PLAYERS } from "../../domain/constants/player";
import { DrawStackDto } from "../../domain/dtos/drawStack";
import { GameBoardDto } from "../../domain/dtos/gameBoard";
import { PlayerDto } from "../../domain/dtos/player";
import { indexOfFirstPlayerByDrawedCard } from "../../domain/gamerules/player/firstToPlay";
import { isPlayerCountValid } from "../../domain/gamerules/player/isCountValid";
import { DrawStack, IDrawStack } from "./DrawStack";
import { GameBoard, IGameBoard } from "./GameBoard";
import { IPlayer, Player } from "./Player";

type GenerateUserIdFn = () => string;

export type GameDto = {
  drawStack: DrawStackDto;
  gameBoard: GameBoardDto;
  state: GameState;
  players: Array<PlayerDto>;
  isFull: boolean;
};

type AddPlayerProps = {
  username?: string;
};

export interface IGame {
  id: string;
  addPlayer(props: AddPlayerProps): IPlayer;
  removePlayer(id: string): void;
  start(): void;
  end(): void;
  nextPlayerAfter(currentPlayer: IPlayer): IPlayer;
  isFull(): boolean;
  currentPlayer(): IPlayer;
  winner(): IPlayer;
  canAddPlayer(): boolean;
  isStarted(): boolean;
  isEnded(): boolean;
  toDto(): GameDto;
}

type GameState = "created" | "started" | "ended";

type GameProps = {
  id: string;
  drawStack?: IDrawStack;
  gameBoard?: IGameBoard;
  state?: GameState;
  generateUserId?: GenerateUserIdFn;
};

export class Game implements IGame {
  public readonly id: string;

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
    this.generateUserId = props.generateUserId ?? (() => randomUUID());
  }

  isFull(): boolean {
    return this.players.length >= MAX_PLAYERS;
  }

  addPlayer(props?: AddPlayerProps): IPlayer {
    if (this.state !== "created") {
      throw new Error("Game has started");
    }

    if (this.isFull()) {
      throw new Error("Max players limit reached");
    }

    const player = new Player({
      game: this,
      drawStack: this.drawStack,
      gameBoard: this.gameBoard,
      id: this.generateUserId(),
      ...props,
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
    newPlayers.splice(playerIndex, 1);
    this.players = newPlayers;

    if (this.state === "started") {
      this.end();
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

  currentPlayer(): IPlayer {
    if (this.state !== "started") {
      throw new Error("Game has not started");
    }

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
      drawStack: this.drawStack.toDto(),
      gameBoard: this.gameBoard.toDto(),
      players: this.players.map((player) => player.toDto()),
      state: this.state,
      isFull: this.isFull(),
    };
  }
}
