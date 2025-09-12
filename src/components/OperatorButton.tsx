import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Operator } from '../types/game';

interface OperatorButtonProps {
  operator: Operator;
  onClick?: (operator: Operator) => void;
  onDragStart?: (operator: Operator) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

export const OperatorButton: React.FC<OperatorButtonProps> = ({
  operator,
  onClick,
  onDragStart,
  onDragEnd,
  isDragging = false
}) => {
  const animation = useSpring({
    transform: isDragging ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)',
    opacity: isDragging ? 0.8 : 1,
    config: { tension: 300, friction: 30 }
  });

  const getOperatorDisplay = (op: Operator): string => {
    switch (op) {
      case '*': return '×';
      case '/': return '÷';
      default: return op;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onDragStart?.(operator);
  };

  const handleMouseUp = () => {
    onDragEnd?.();
  };

  const handleClick = () => {
    onClick?.(operator);
  };

  return (
    <animated.button
      style={animation}
      className="operator-btn"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      draggable
    >
      {getOperatorDisplay(operator)}
    </animated.button>
  );
};