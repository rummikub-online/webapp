import {
  randomCombination,
  randomSerie,
  randomSuite,
} from "@/app/Combination/application/utils/random";
import { expect, test } from "vitest";

test("randomSuite", { repeats: 1000 }, () => {
  const suite = randomSuite();

  expect(suite.type()).toBe("suite");
});

test("randomSerie", { repeats: 1000 }, () => {
  const serie = randomSerie();

  expect(serie.type()).toBe("serie");
});

test("randomCombination", { repeats: 1000 }, () => {
  const combination = randomCombination();

  expect(combination.type()).not.toBe("invalid");
});
