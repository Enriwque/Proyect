// arrayUtils.test.js
import { findMax, sumArray, filterEvenNumbers } from '../src/array-utils';

describe('findMax', () => {
  test('returns the maximum value in an array', () => {
    expect(findMax([1, 2, 3, 4, 5])).toBe(5);
  });

  test('returns null for an empty array', () => {
    expect(findMax([])).toBeNull();
  });

  test('returns null for a non-array input', () => {
    expect(findMax('not an array')).toBeNull();
  });
});

describe('sumArray', () => {
  test('returns the sum of all numbers in an array', () => {
    expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
  });

  test('returns 0 for an empty array', () => {
    expect(sumArray([])).toBe(0);
  });

  test('returns null for a non-array input', () => {
    expect(sumArray('not an array')).toBeNull();
  });
});

describe('filterEvenNumbers', () => {
  test('returns an array of even numbers', () => {
    expect(filterEvenNumbers([1, 2, 3, 4, 5])).toEqual([2, 4]);
  });

  test('returns an empty array if no even numbers are found', () => {
    expect(filterEvenNumbers([1, 3, 5])).toEqual([]);
  });

  test('returns null for a non-array input', () => {
    expect(filterEvenNumbers('not an array')).toBeNull();
  });
});
