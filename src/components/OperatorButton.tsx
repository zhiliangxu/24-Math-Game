import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Operator } from '../types/game';

interface OperatorButtonProps {
  operator: Operator;
  isDragging?: boolean;
  onDragStart?: (operator: Operator) => void;
  onDragEnd?: () => void;
}

export const OperatorButton: React.FC<OperatorButtonProps> = ({
  operator,
  isDragging = false,
  onDragStart,
  onDragEnd
}) => {
  const animation = useSpring({
    transform: isDragging ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)',
    opacity: isDragging ? 0.7 : 1,
    config: { tension: 300, friction: 30 }
  });

  const getOperatorDisplay = (op: Operator): string => {
    switch (op) {
      case '*': return '×';
      case '/': return '÷';
      default: return op;
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'operator',
      data: operator
    }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(operator);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  return (
    <animated.button
      style={animation}
      className={`operator-btn ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // Touch support for mobile
      onTouchStart={(e) => e.preventDefault()}
    >
      {getOperatorDisplay(operator)}
    </animated.button>
  );
};