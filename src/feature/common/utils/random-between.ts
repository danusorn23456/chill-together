function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export { randomBetween };
