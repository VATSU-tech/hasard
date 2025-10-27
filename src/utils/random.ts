export function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

export function getRandomItem<T>(array: T[]): { item: T; index: number } {
  const index = getRandomIndex(array.length);
  return { item: array[index], index };
}
