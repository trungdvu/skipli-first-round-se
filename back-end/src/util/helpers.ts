export function generateAccessCode() {
  const from = 100000;
  const to = 999999;

  return Math.floor(Math.random() * (to - from + 1)) + from;
}
