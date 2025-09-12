export interface Card {
  value: number;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  id: string;
  position?: { x: number; y: number };
}

export type Operator = '+' | '-' | '*' | '/';

export interface GameState {
  cards: Card[];
  operators: Operator[];
  currentExpression: (Card | Operator)[];
  result: number | null;
  isCorrect: boolean;
  gameMode: 'easy' | 'standard';
  showSolutions: boolean;
  solutions: string[];
}

export interface DroppedItem {
  type: 'card' | 'operator';
  value: Card | Operator;
  position: number;
}

export interface GameConfig {
  cardRange: {
    easy: { min: number; max: number };
    standard: { min: number; max: number };
  };
  targetValue: number;
  cardsPerGame: number;
}