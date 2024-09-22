import { CombinationDto } from "../../dtos/combination";

export const areEqual = (a: CombinationDto, b: CombinationDto): boolean =>
  JSON.stringify(a) === JSON.stringify(b);
