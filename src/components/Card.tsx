import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  isUsed?: boolean;
  isDragging?: boolean;
  isDealingAnimation?: boolean;
  dealDelay?: number;
  onDragStart?: (card: CardType) => void;
  onDragEnd?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  card, 
  isUsed = false,
  isDragging = false,
  isDealingAnimation = false,
  dealDelay = 0,
  onDragStart,
  onDragEnd
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

  // Animation for dragging and interaction
  const cardAnimation = useSpring({
    transform: isDragging ? 'scale(1.1) rotate(-5deg)' : isUsed ? 'scale(0.9) rotate(0deg)' : 'scale(1) rotate(0deg)',
    opacity: isDragging ? 0.7 : isUsed ? 0.4 : 1,
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

  const handleDragStart = (e: React.DragEvent) => {
    if (isUsed) {
      e.preventDefault();
      return;
    }
    // Set the data being dragged
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'card',
      data: card
    }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(card);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  return (
    <animated.div
      style={{
        ...dealAnimation,
        ...cardAnimation,
        cursor: isUsed ? 'not-allowed' : 'grab'
      }}
      className={`card ${isDragging ? 'dragging' : ''} ${isUsed ? 'used' : ''}`}
      draggable={!isUsed}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // Touch support for mobile
      onTouchStart={(e) => e.preventDefault()}
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