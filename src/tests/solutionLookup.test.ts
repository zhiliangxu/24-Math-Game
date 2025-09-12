import { describe, it, expect } from 'vitest';
import { getSolutions, hasAnySolution, formatSolution } from '../utils/solutionLookup';

describe('Solution Lookup', () => {
  describe('getSolutions', () => {
    it('should return solutions for known combinations', () => {
      const solutions = getSolutions([1, 1, 8, 8]);
      expect(solutions).toBeInstanceOf(Array);
      expect(solutions.length).toBeGreaterThan(0);
    });

    it('should return empty array for unknown combinations', () => {
      const solutions = getSolutions([99, 99, 99, 99]);
      expect(solutions).toHaveLength(0);
    });

    it('should handle sorting of input cards', () => {
      const solutions1 = getSolutions([8, 1, 8, 1]);
      const solutions2 = getSolutions([1, 1, 8, 8]);
      expect(solutions1).toEqual(solutions2);
    });

    it('should return solutions for 6,6,6,6', () => {
      const solutions = getSolutions([6, 6, 6, 6]);
      expect(solutions).toContain('6 + 6 + 6 + 6 = 24');
    });
  });

  describe('hasAnySolution', () => {
    it('should return true for combinations with solutions', () => {
      const hasSolution = hasAnySolution([6, 6, 6, 6]);
      expect(hasSolution).toBe(true);
    });

    it('should return false for combinations without solutions', () => {
      const hasSolution = hasAnySolution([99, 99, 99, 99]);
      expect(hasSolution).toBe(false);
    });
  });

  describe('formatSolution', () => {
    it('should return the solution as-is', () => {
      const solution = '6 + 6 + 6 + 6 = 24';
      const formatted = formatSolution(solution);
      expect(formatted).toBe(solution);
    });

    it('should handle empty string', () => {
      const formatted = formatSolution('');
      expect(formatted).toBe('');
    });
  });
});