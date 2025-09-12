import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onDragStart?: (card: CardType) => void;
  onDragEnd?: () => void;
  isDealingAnimation?: boolean;
  dealDelay?: number;
  isDragging?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  card, 
  onDragStart, 
  onDragEnd,
  isDealingAnimation = false,
  dealDelay = 0,
  isDragging = false
}) => {

  // Animation for card dealing
  const dealAnimation = useSpring({
    from: { 
      opacity: 0, 
      transform: isDealingAnimation ? 'translateY(-100px) rotateY(180deg)' : 'translateY(0px) rotateY(0deg)'
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0px) rotateY(0deg)'
    },
    delay: dealDelay,
    config: { tension: 300, friction: 30 }
  });

  // Animation for dragging
  const dragAnimation = useSpring({
    transform: isDragging ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
    opacity: isDragging ? 0.8 : 1,
    config: { tension: 300, friction: 30 }
  });

  const getSuitSymbol = (suit: CardType['suit']): string => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '♠';
    }
  };

  const getSuitColor = (suit: CardType['suit']): string => {
    return suit === 'hearts' || suit === 'diamonds' ? '#dc3545' : '#000';
  };

  const getDisplayValue = (value: number): string => {
    if (value === 1) return 'A';
    if (value === 11) return 'J';
    if (value === 12) return 'Q';
    if (value === 13) return 'K';
    return value.toString();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onDragStart?.(card);
  };

  const handleMouseUp = () => {
    onDragEnd?.();
  };

  return (
    <animated.div
      style={{
        ...dealAnimation,
        ...dragAnimation,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      className={`card ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      draggable
    >
      <div style={{ color: getSuitColor(card.suit) }}>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          {getDisplayValue(card.value)}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '4px' }}>
          {getSuitSymbol(card.suit)}
        </div>
      </div>
    </animated.div>
  );
};