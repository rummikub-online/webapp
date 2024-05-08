import { indexOfFirstPlayerByDrawedCard } from "../../domain/gamerules/player/firstToPlay";
import { isPlayerCountValid } from "../../domain/gamerules/player/isCountValid";
import { DrawStack, IDrawStack } from "./DrawStack";
import { GameBoard, IGameBoard } from "./GameBoard";
import { IPlayer, Player } from "./Player";

export interface IGame {
  addPlayer(): void;
  start(): void;
}

type GameState = "created" | "started" | "ended";

type GameProps = {
  playerCount: number;
  drawStack?: IDrawStack;
  gameBoard?: IGameBoard;
  state?: GameState;
};

export class Game implements IGame {
  private drawStack: IDrawStack;
  private gameBoard: IGameBoard;
  private players: Array<IPlayer> = [];
  private currentPlayerIndex: number | null = null;
  private state: GameState;

  constructor(props: GameProps) {
    this.drawStack = props.drawStack ?? new DrawStack({});
    this.gameBoard = props.gameBoard ?? new GameBoard({});
    this.state = props.state ?? "created";
  }

  addPlayer(): void {
    if (this.state !== "created") {
      throw new Error("Game already started");
    }

    const player = new Player({
      drawStack: this.drawStack,
      gameBoard: this.gameBoard,
      id: this.generateUserId(),
    });

    this.players.push(player);
  }

  private generateUserId(): string {
    return crypto.randomUUID();
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

    this.determineFirstPlayer();
  }

  private determineFirstPlayer(): void {
    const drawedCardsByPLayers = this.players.map(() =>
      this.drawStack.drawCard()
    );

    const firstPlayerIndex =
      indexOfFirstPlayerByDrawedCard(drawedCardsByPLayers);

    this.currentPlayerIndex = firstPlayerIndex;

    drawedCardsByPLayers.forEach((card) => this.drawStack.putBack(card));
  }

  private currentPlayer(): IPlayer {
    if (this.currentPlayerIndex === null) {
      throw new Error("No current player");
    }

    return this.players[this.currentPlayerIndex];
  }
}
