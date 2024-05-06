import { CARDS } from "../../domain/constants/card";
import { CardDto } from "../../domain/dtos/card";
import { DrawStackDto } from "../../domain/dtos/drawStack";

export interface IDrawStack {
  shuffle(): void;
  drawCard(): CardDto;
}

export class DrawStack implements IDrawStack {
  private cards: DrawStackDto = [...CARDS];

  drawCard(): CardDto {
    throw new Error("Method not implemented.");
  }

  shuffle(): void {
    throw new Error("Method not implemented.");
  }
}
