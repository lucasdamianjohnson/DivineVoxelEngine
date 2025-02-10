export function getBitValue(data: number, bitIndex: number, bitSize: number) {
  const mask = (1 << bitSize) - 1;
  return (data >>> bitIndex) & mask;
}

export function setBitValue(
  data: number,
  bitIndex: number,
  value: number,
  bitSize: number
) {
  const mask = (1 << bitSize) - 1;
  return (data & ~(mask << bitIndex)) | ((value & mask) << bitIndex);
}

export function forceMultipleOf2(n: number): number {
  return n % 2 === 0 ? n : n + 1;
}

export function bitsNeeded(n: number): number {
  if (n < 0) throw new Error("Input must be a non-negative integer.");

  let bits = 0;
  while (n > 0) {
    bits++;
    n >>= 1;
  }

  return bits;
}
