// arrayUtils.js
export function findMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return Math.max(...arr);
}

export function sumArray(arr) {
  if (!Array.isArray(arr)) return null;
  return arr.reduce((acc, num) => acc + num, 0);
}

export function filterEvenNumbers(arr) {
  if (!Array.isArray(arr)) return null;
  return arr.filter(num => num % 2 === 0);
}