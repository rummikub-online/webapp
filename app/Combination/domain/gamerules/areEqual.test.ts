import type { CombinationDto } from "@/app/Combination/domain/dtos/combination";
import { areEqual } from "@/app/Combination/domain/gamerules/areEqual";
import { describe, expect, test } from "vitest";

describe("areEqual", () => {
  test("return true for same combinations", () => {
    const a: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 1 },
      ],
    };

    const b: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 1 },
      ],
    };

    expect(areEqual(a, b)).toBeTruthy();
  });

  test("return false if different card count", () => {
    const a: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 1 },
      ],
    };

    const b: CombinationDto = {
      type: "invalid",
      cards: [{ color: "blue", number: 7, duplicata: 1 }],
    };

    expect(areEqual(a, b)).toBeFalsy();
  });

  test("return false if different card duplicata", () => {
    const a: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 1 },
      ],
    };

    const b: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 2 },
      ],
    };

    expect(areEqual(a, b)).toBeFalsy();
  });

  test("return false if different card color", () => {
    const a: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 1 },
      ],
    };

    const b: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "black", number: 8, duplicata: 1 },
      ],
    };

    expect(areEqual(a, b)).toBeFalsy();
  });

  test("return false if different card number", () => {
    const a: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 1 },
      ],
    };

    const b: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 8, duplicata: 1 },
        { color: "blue", number: 9, duplicata: 1 },
      ],
    };

    expect(areEqual(a, b)).toBeFalsy();
  });

  test("return false if different type", () => {
    const a: CombinationDto = {
      type: "invalid",
      cards: [
        { color: "blue", number: 7, duplicata: 1 },
        { color: "blue", number: 8, duplicata: 1 },
      ],
    };

    const b: CombinationDto = {
      type: "suite",
      cards: [
        { color: "blue", number: 8, duplicata: 1 },
        { color: "blue", number: 9, duplicata: 1 },
      ],
    };

    expect(areEqual(a, b)).toBeFalsy();
  });
});
