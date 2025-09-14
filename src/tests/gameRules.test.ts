import { describe, it, expect } from 'vitest';
import { 
  generateCards, 
  calculateExpression, 
  checkSolution, 
  isValidExpression,
  GAME_CONFIG,
  OPERATORS
} from '../utils/gameRules';
import { Operator } from '../types/game';

describe('Game Rules', () => {
  describe('generateCards', () => {
    it('should generate 4 cards in easy mode', () => {
      const cards = generateCards('easy');
      expect(cards).toHaveLength(GAME_CONFIG.cardsPerGame);
    });

    it('should generate cards with values between 1-10 in easy mode', () => {
      const cards = generateCards('easy');
      cards.forEach(card => {
        expect(card.value).toBeGreaterThanOrEqual(1);
        expect(card.value).toBeLessThanOrEqual(10);
      });
    });

    it('should generate cards with values between 1-13 in standard mode', () => {
      const cards = generateCards('standard');
      cards.forEach(card => {
        expect(card.value).toBeGreaterThanOrEqual(1);
        expect(card.value).toBeLessThanOrEqual(13);
      });
    });

    it('should generate cards with valid suits and unique IDs', () => {
      const cards = generateCards('easy');
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const ids = new Set();

      cards.forEach(card => {
        expect(suits).toContain(card.suit);
        expect(card.id).toBeDefined();
        expect(ids.has(card.id)).toBe(false);
        ids.add(card.id);
      });
    });

    it('should never generate duplicate cards (same suit and value)', () => {
      // Test multiple generations to ensure no duplicates
      for (let i = 0; i < 20; i++) {
        const cards = generateCards('standard');
        const cardSignatures = cards.map(card => `${card.suit}-${card.value}`);
        const uniqueSignatures = new Set(cardSignatures);
        
        expect(uniqueSignatures.size).toBe(4);
        expect(cards).toHaveLength(4);
      }
    });
  });

  describe('calculateExpression', () => {
    it('should return null for empty expression', () => {
      const result = calculateExpression([]);
      expect(result).toBeNull();
    });

    it('should calculate simple addition correctly', () => {
      // Test a complete expression: 1 + 2 + 3 * 6 = 21 (with precedence)
      const completeExpression = [
        { value: 1, suit: 'hearts' as const, id: '1' },
        '+' as Operator,
        { value: 2, suit: 'clubs' as const, id: '2' },
        '+' as Operator,
        { value: 3, suit: 'diamonds' as const, id: '3' },
        '*' as Operator,
        { value: 6, suit: 'spades' as const, id: '4' }
      ];
      const result = calculateExpression(completeExpression);
      expect(result).toBe(21); // 1 + 2 + 3 * 6 = 1 + 2 + 18 = 21
    });

    it('should handle multiplication and division', () => {
      const expression = [
        { value: 4, suit: 'hearts' as const, id: '1' },
        '*' as Operator,
        { value: 6, suit: 'clubs' as const, id: '2' },
        '/' as Operator,
        { value: 2, suit: 'diamonds' as const, id: '3' },
        '+' as Operator,
        { value: 0, suit: 'spades' as const, id: '4' }
      ];
      const result = calculateExpression(expression);
      expect(result).toBe(12); // 4 * 6 / 2 + 0 = 24 / 2 + 0 = 12
    });

    it('should return null for invalid expressions', () => {
      const invalidExpression = [
        { value: 1, suit: 'hearts' as const, id: '1' },
        { value: 2, suit: 'clubs' as const, id: '2' } // Missing operators
      ];
      const result = calculateExpression(invalidExpression);
      expect(result).toBeNull();
    });
  });

  describe('isValidExpression', () => {
    it('should return true for valid expressions', () => {
      const validExpression = [
        { value: 1, suit: 'hearts' as const, id: '1' },
        '+' as Operator,
        { value: 2, suit: 'clubs' as const, id: '2' },
        '*' as Operator,
        { value: 3, suit: 'diamonds' as const, id: '3' },
        '-' as Operator,
        { value: 4, suit: 'spades' as const, id: '4' }
      ];
      expect(isValidExpression(validExpression)).toBe(true);
    });

    it('should return false for expressions with wrong length', () => {
      const shortExpression = [
        { value: 1, suit: 'hearts' as const, id: '1' },
        '+' as Operator,
        { value: 2, suit: 'clubs' as const, id: '2' }
      ];
      expect(isValidExpression(shortExpression)).toBe(false);
    });

    it('should return false for expressions with invalid card/operator arrangement', () => {
      const wrongExpression = [
        { value: 1, suit: 'hearts' as const, id: '1' },
        { value: 2, suit: 'clubs' as const, id: '2' },
        { value: 3, suit: 'diamonds' as const, id: '3' },
        { value: 4, suit: 'spades' as const, id: '4' },
        '+' as Operator,
        '*' as Operator,
        '-' as Operator
      ];
      expect(isValidExpression(wrongExpression)).toBe(false); // Invalid: adjacent cards without operators between them
    });

    it('should return true for valid expressions with parentheses', () => {
      const validExpressionWithParens = [
        '(' as Operator,
        { value: 1, suit: 'hearts' as const, id: '1' },
        '+' as Operator,
        { value: 1, suit: 'clubs' as const, id: '2' },
        ')' as Operator,
        '*' as Operator,
        '(' as Operator,
        { value: 2, suit: 'diamonds' as const, id: '3' },
        '+' as Operator,
        { value: 10, suit: 'spades' as const, id: '4' },
        ')' as Operator
      ];
      expect(isValidExpression(validExpressionWithParens)).toBe(true); // (1+1)*(2+10) = 24
    });

    it('should return false for expressions with unbalanced parentheses', () => {
      const unbalancedExpression = [
        '(' as Operator,
        { value: 1, suit: 'hearts' as const, id: '1' },
        '+' as Operator,
        { value: 2, suit: 'clubs' as const, id: '2' },
        '*' as Operator,
        { value: 3, suit: 'diamonds' as const, id: '3' },
        '+' as Operator,
        { value: 4, suit: 'spades' as const, id: '4' }
        // Missing closing parenthesis
      ];
      expect(isValidExpression(unbalancedExpression)).toBe(false);
    });
  });

  describe('checkSolution', () => {
    it('should return true for expressions that equal 24', () => {
      const solution = [
        { value: 6, suit: 'hearts' as const, id: '1' },
        '+' as Operator,
        { value: 6, suit: 'clubs' as const, id: '2' },
        '+' as Operator,
        { value: 6, suit: 'diamonds' as const, id: '3' },
        '+' as Operator,
        { value: 6, suit: 'spades' as const, id: '4' }
      ];
      expect(checkSolution(solution)).toBe(true);
    });

    it('should return false for expressions that do not equal 24', () => {
      const nonSolution = [
        { value: 1, suit: 'hearts' as const, id: '1' },
        '+' as Operator,
        { value: 1, suit: 'clubs' as const, id: '2' },
        '+' as Operator,
        { value: 1, suit: 'diamonds' as const, id: '3' },
        '+' as Operator,
        { value: 1, suit: 'spades' as const, id: '4' }
      ];
      expect(checkSolution(nonSolution)).toBe(false);
    });
  });

  describe('OPERATORS constant', () => {
    it('should contain all operators including parentheses', () => {
      expect(OPERATORS).toHaveLength(6);
      expect(OPERATORS).toContain('+');
      expect(OPERATORS).toContain('-');
      expect(OPERATORS).toContain('*');
      expect(OPERATORS).toContain('/');
      expect(OPERATORS).toContain('(');
      expect(OPERATORS).toContain(')');
    });
  });
});