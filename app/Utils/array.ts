export const toShuffled = <T>(arr: readonly T[], rounds: number = 1) => {
  const arrCopy = [...arr];

  for (let round = 0; round < rounds; round++) {
    for (let i = arrCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }
  }

  return arrCopy;
};
