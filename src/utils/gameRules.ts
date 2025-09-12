import { Card, Operator, GameConfig } from '../types/game';

export const GAME_CONFIG: GameConfig = {
  cardRange: {
    easy: { min: 1, max: 10 },
    standard: { min: 1, max: 13 }
  },
  targetValue: 24,
  cardsPerGame: 4
};

export const OPERATORS: Operator[] = ['+', '-', '*', '/'];

export function generateCards(mode: 'easy' | 'standard'): Card[] {
  const { min, max } = GAME_CONFIG.cardRange[mode];
  const cards: Card[] = [];
  const suits: ('hearts' | 'diamonds' | 'clubs' | 'spades')[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  
  for (let i = 0; i < GAME_CONFIG.cardsPerGame; i++) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    const suit = suits[Math.floor(Math.random() * suits.length)];
    cards.push({
      value,
      suit,
      id: `card-${i}-${Date.now()}-${Math.random()}`
    });
  }
  
  return cards;
}

export function calculateExpression(expression: (Card | Operator)[]): number | null {
  if (expression.length === 0) return null;
  
  // Convert expression to a calculable string
  const expressionStr = expression
    .map(item => {
      if (typeof item === 'string') {
        return item === '*' ? '*' : item === '/' ? '/' : item;
      }
      return (item as Card).value.toString();
    })
    .join(' ');
  
  try {
    // Basic validation - should alternate between numbers and operators
    const tokens = expressionStr.split(' ');
    if (tokens.length !== 7) return null; // 4 numbers + 3 operators
    
    // Validate pattern: number operator number operator number operator number
    for (let i = 0; i < tokens.length; i++) {
      if (i % 2 === 0) {
        // Should be number
        if (isNaN(Number(tokens[i]))) return null;
      } else {
        // Should be operator
        if (!['+', '-', '*', '/'].includes(tokens[i])) return null;
      }
    }
    
    // Evaluate using Function constructor (safer than eval)
    const result = new Function('return ' + expressionStr)();
    return typeof result === 'number' && isFinite(result) ? Math.round(result * 1000) / 1000 : null;
  } catch (error) {
    return null;
  }
}

export function isValidExpression(expression: (Card | Operator)[]): boolean {
  if (expression.length !== 7) return false;
  
  const cardCount = expression.filter(item => typeof item === 'object').length;
  const operatorCount = expression.filter(item => typeof item === 'string').length;
  
  return cardCount === 4 && operatorCount === 3;
}

export function checkSolution(expression: (Card | Operator)[], target: number = GAME_CONFIG.targetValue): boolean {
  if (!isValidExpression(expression)) return false;
  
  const result = calculateExpression(expression);
  return result !== null && Math.abs(result - target) < 0.001;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}