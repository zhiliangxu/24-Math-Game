import { Card, Operator, GameConfig } from '../types/game';

export const GAME_CONFIG: GameConfig = {
  cardRange: {
    easy: { min: 1, max: 10 },
    standard: { min: 1, max: 13 }
  },
  targetValue: 24,
  cardsPerGame: 4
};

export const OPERATORS: Operator[] = ['+', '-', '*', '/', '(', ')'];

// Create a standard deck of cards
function createDeck(mode: 'easy' | 'standard'): Card[] {
  const { min, max } = GAME_CONFIG.cardRange[mode];
  const deck: Card[] = [];
  const suits: ('hearts' | 'diamonds' | 'clubs' | 'spades')[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  
  for (let value = min; value <= max; value++) {
    for (const suit of suits) {
      deck.push({
        value,
        suit,
        id: `${suit}-${value}`
      });
    }
  }
  
  return deck;
}

// Shuffle an array using Fisher-Yates algorithm
function shuffleDeck<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateCards(mode: 'easy' | 'standard'): Card[] {
  // Create and shuffle a complete deck
  const deck = createDeck(mode);
  const shuffledDeck = shuffleDeck(deck);
  
  // Deal the first 4 cards from the shuffled deck
  return shuffledDeck.slice(0, GAME_CONFIG.cardsPerGame);
}

// Enhanced expression evaluator with proper parentheses and operator precedence support
function evaluateWithPrecedence(tokens: string[]): number {
  // Handle parentheses first (recursive evaluation)
  while (tokens.includes('(')) {
    let openIndex = -1;
    let closeIndex = -1;
    let depth = 0;
    
    // Find innermost parentheses
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '(') {
        if (depth === 0) openIndex = i;
        depth++;
      } else if (tokens[i] === ')') {
        depth--;
        if (depth === 0) {
          closeIndex = i;
          break;
        }
      }
    }
    
    if (openIndex === -1 || closeIndex === -1) {
      throw new Error('Unbalanced parentheses');
    }
    
    // Extract and evaluate the expression inside parentheses
    const innerTokens = tokens.slice(openIndex + 1, closeIndex);
    const innerResult = evaluateWithPrecedence(innerTokens);
    
    // Replace the parentheses and their contents with the result
    tokens.splice(openIndex, closeIndex - openIndex + 1, innerResult.toString());
  }
  
  // Handle multiplication and division (left to right)
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);
      const result = tokens[i] === '*' ? left * right : left / right;
      
      tokens.splice(i - 1, 3, result.toString());
      i = Math.max(0, i - 1);
    } else {
      i++;
    }
  }
  
  // Handle addition and subtraction (left to right)
  i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '+' || tokens[i] === '-') {
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);
      const result = tokens[i] === '+' ? left + right : left - right;
      
      tokens.splice(i - 1, 3, result.toString());
      i = Math.max(0, i - 1);
    } else {
      i++;
    }
  }
  
  if (tokens.length !== 1) {
    throw new Error('Invalid expression');
  }
  
  return parseFloat(tokens[0]);
}

export function calculateExpression(expression: (Card | Operator)[]): number | null {
  if (expression.length === 0) return null;
  
  try {
    // Convert expression to string tokens
    const tokens = expression.map(item => 
      typeof item === 'object' ? item.value.toString() : item
    );
    
    // Validate balanced parentheses
    let depth = 0;
    for (const token of tokens) {
      if (token === '(') depth++;
      else if (token === ')') depth--;
      if (depth < 0) return null; // Closing before opening
    }
    if (depth !== 0) return null; // Unbalanced parentheses
    
    // Basic validation: check for valid token sequence
    // Allow numbers, operators (+, -, *, /), and parentheses
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const isNumber = !isNaN(parseFloat(token)) && isFinite(parseFloat(token));
      const isOperator = ['+', '-', '*', '/'].includes(token);
      const isParenthesis = ['(', ')'].includes(token);
      
      if (!isNumber && !isOperator && !isParenthesis) {
        return null;
      }
    }
    
    const result = evaluateWithPrecedence([...tokens]);
    
    return typeof result === 'number' && !isNaN(result) && isFinite(result) ? Math.round(result * 1000) / 1000 : null;
  } catch (error) {
    return null;
  }
}

export function isValidExpression(expression: (Card | Operator)[]): boolean {
  if (expression.length === 0) return false;
  
  // Count different types of items
  const cards = expression.filter(item => typeof item === 'object');
  const openParens = expression.filter(item => item === '(');
  const closeParens = expression.filter(item => item === ')');
  
  // Must use exactly 4 cards
  if (cards.length !== 4) return false;
  
  // Must have balanced parentheses
  if (openParens.length !== closeParens.length) return false;
  
  // Basic structure validation - check for valid token sequence
  let parenDepth = 0;
  for (let i = 0; i < expression.length; i++) {
    const item = expression[i];
    const isCard = typeof item === 'object';
    const isMathOp = typeof item === 'string' && ['+', '-', '*', '/'].includes(item);
    const isOpenParen = item === '(';
    const isCloseParen = item === ')';
    
    if (isOpenParen) {
      parenDepth++;
    } else if (isCloseParen) {
      parenDepth--;
      if (parenDepth < 0) return false; // Closing before opening
    }
    
    // Basic adjacency rules
    const prev = i > 0 ? expression[i - 1] : null;
    const next = i < expression.length - 1 ? expression[i + 1] : null;
    
    if (isCard) {
      // Cards cannot be adjacent to other cards
      if (prev && typeof prev === 'object') return false;
      if (next && typeof next === 'object') return false;
    }
    
    if (isMathOp) {
      // Math operators need operands on both sides (cards or closing/opening parens)
      const prevValid = prev && (typeof prev === 'object' || prev === ')');
      const nextValid = next && (typeof next === 'object' || next === '(');
      if (!prevValid || !nextValid) return false;
    }
  }
  
  // Must end with balanced parentheses
  return parenDepth === 0;
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