import { formatCurrency, generatePagination } from './utils';

describe('formatCurrency', () => {
  it('converts cents to a formatted USD string', () => {
    expect(formatCurrency(100)).toBe('$1.00');
    expect(formatCurrency(123456)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
  });
});

describe('generatePagination', () => {
  it('returns all pages when total is 7 or fewer', () => {
    expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePagination(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('shows ellipsis at end when current page is in first 3', () => {
    expect(generatePagination(2, 10)).toEqual([1, 2, 3, '...', 9, 10]);
  });

  it('shows ellipsis at start when current page is in last 3', () => {
    expect(generatePagination(9, 10)).toEqual([1, 2, '...', 8, 9, 10]);
  });

  it('shows ellipsis on both sides when current page is in the middle', () => {
    expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });
});
