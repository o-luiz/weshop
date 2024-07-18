export function precisionFloor(value: number, decimals: number) {
  const multiplier = Math.pow(10, decimals);
  return Math.floor(value * multiplier) / multiplier;
}

export function clamp(value: number, min: number, max: number) {
  if (value <= min) return min;
  if (value >= max) return max;
  return value;
}

export function calculatePriceWithDiscount(
  price: number,
  discount: number
): number {
  return price * (1 - discount);
}
