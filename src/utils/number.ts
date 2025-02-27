type GenerateRandomNumberFromInterval = {
  min: number;
  max: number;
};

function generateRandomNumberFromInterval({ min, max }: GenerateRandomNumberFromInterval): number {
  return Math.random() * (max - min) + min;
}

export { generateRandomNumberFromInterval };
