import React from 'react';
import { Card as CardType, Operator } from '../types/game';

interface DropZoneProps {
  onDrop?: (item: CardType | Operator, position: number) => void;
  position: number;
  currentItem?: CardType | Operator;
  className?: string;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onDrop,
  position,
  currentItem,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle drop logic here
  };

  const renderContent = () => {
    if (currentItem) {
      if (typeof currentItem === 'string') {
        // It's an operator
        return <span className="dropped-operator">{currentItem === '*' ? '×' : currentItem === '/' ? '÷' : currentItem}</span>;
      } else {
        // It's a card
        return <span className="dropped-card">{currentItem.value}</span>;
      }
    }
    return <span className="drop-placeholder">Drop here</span>;
  };

  return (
    <div
      className={`drop-zone ${isDragOver ? 'drag-over' : ''} ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {renderContent()}
    </div>
  );
};