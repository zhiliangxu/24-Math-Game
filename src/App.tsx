import { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { OperatorButton } from './components/OperatorButton';
import { DropZone } from './components/DropZone';
import { Card as CardType, Operator, GameState } from './types/game';
import { generateCards, calculateExpression, checkSolution, OPERATORS } from './utils/gameRules';
import { getSolutions } from './utils/solutionLookup';
import { playSound } from './utils/audioUtils';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    operators: OPERATORS,
    currentExpression: [],
    result: null,
    isCorrect: false,
    gameMode: 'easy',
    showSolutions: false,
    solutions: []
  });

  const [draggedItem, setDraggedItem] = useState<CardType | Operator | null>(null);
  const [dropZoneItems, setDropZoneItems] = useState<(CardType | Operator | null)[]>(new Array(11).fill(null));

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  // Update expression when drop zones change
  useEffect(() => {
    const newExpression = dropZoneItems.filter(item => item !== null) as (CardType | Operator)[];
    setGameState(prev => ({
      ...prev,
      currentExpression: newExpression
    }));
  }, [dropZoneItems]);

  // Calculate result when expression changes
  useEffect(() => {
    const result = calculateExpression(gameState.currentExpression);
    const isCorrect = checkSolution(gameState.currentExpression);
    
    setGameState(prev => ({
      ...prev,
      result,
      isCorrect
    }));

    if (isCorrect && result === 24) {
      playSound('success');
    }
  }, [gameState.currentExpression]);

  const startNewGame = () => {
    const newCards = generateCards(gameState.gameMode);
    const cardValues = newCards.map(card => card.value);
    const solutions = getSolutions(cardValues);

    // Deal cards with animation
    newCards.forEach((_, index) => {
      setTimeout(() => {
        playSound('cardDeal');
      }, index * 200);
    });

    setGameState(prev => ({
      ...prev,
      cards: newCards,
      currentExpression: [],
      result: null,
      isCorrect: false,
      showSolutions: false,
      solutions
    }));
    setDropZoneItems(new Array(11).fill(null));
  };

  const handleModeChange = (mode: 'easy' | 'standard') => {
    setGameState(prev => ({ ...prev, gameMode: mode }));
    // Start new game with new mode
    setTimeout(() => startNewGame(), 100);
  };

  const handleCardDragStart = (card: CardType) => {
    setDraggedItem(card);
  };

  const handleOperatorDragStart = (operator: Operator) => {
    setDraggedItem(operator);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (item: CardType | Operator, position: number) => {
    // Update drop zone items
    setDropZoneItems(prev => {
      const newItems = [...prev];
      newItems[position] = item;
      return newItems;
    });
    
    playSound('cardDeal');
  };

  const handleRemove = (position: number) => {
    setDropZoneItems(prev => {
      const newItems = [...prev];
      newItems[position] = null;
      return newItems;
    });
  };

  const clearExpression = () => {
    setGameState(prev => ({
      ...prev,
      currentExpression: [],
      result: null,
      isCorrect: false
    }));
    setDropZoneItems(new Array(11).fill(null));
  };

  const toggleSolutions = () => {
    setGameState(prev => ({
      ...prev,
      showSolutions: !prev.showSolutions
    }));
  };

  const renderExpression = () => {
    return gameState.currentExpression.map((item, index) => (
      <span key={index} className="expression-item">
        {typeof item === 'string' ? (
          item === '*' ? '×' : item === '/' ? '÷' : item
        ) : (
          item.value
        )}
        {index < gameState.currentExpression.length - 1 && ' '}
      </span>
    ));
  };

  return (
    <div className="game-container">
      <div className="container">
        <h1 className="text-center mb-4">24 Math Game</h1>
        
        {/* Mode Selector */}
        <div className="mode-selector text-center">
          <h3>Game Mode</h3>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${gameState.gameMode === 'easy' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => handleModeChange('easy')}
            >
              Easy (1-10)
            </button>
            <button
              type="button"
              className={`btn ${gameState.gameMode === 'standard' ? 'btn-success' : 'btn-outline-light'}`}
              onClick={() => handleModeChange('standard')}
            >
              Standard (1-13)
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="row justify-content-center mb-4">
          <div className="col-auto">
            <h3 className="text-center mb-3">Cards</h3>
            <div className="d-flex justify-content-center gap-3">
              {gameState.cards.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  onDragStart={handleCardDragStart}
                  onDragEnd={handleDragEnd}
                  isDealingAnimation={true}
                  dealDelay={index * 200}
                  isUsed={dropZoneItems.some(item => item && typeof item === 'object' && item.id === card.id)}
                  isDragging={draggedItem === card}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Operators */}
        <div className="row justify-content-center mb-4">
          <div className="col-auto">
            <h3 className="text-center mb-3">Operators</h3>
            <div className="d-flex justify-content-center gap-2">
              {gameState.operators.map(operator => (
                <OperatorButton
                  key={operator}
                  operator={operator}
                  onDragStart={handleOperatorDragStart}
                  onDragEnd={handleDragEnd}
                  isDragging={draggedItem === operator}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Expression Area */}
        <div className="solution-area">
          <h3 className="text-center mb-3">Your Solution</h3>
          <div className="text-center mb-3">
            <div className="expression-display">
              {gameState.currentExpression.length > 0 ? renderExpression() : 'Drop cards and operators here'}
            </div>
          </div>
          
          <div className="drop-zones d-flex justify-content-center gap-1 mb-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(position => (
              <DropZone
                key={position}
                position={position}
                currentItem={dropZoneItems[position]}
                onDrop={handleDrop}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="result-display">
            Result: {gameState.result !== null ? gameState.result : '?'}
          </div>

          {gameState.isCorrect && (
            <div className="success-message">
              🎉 Congratulations! You solved it! 🎉
            </div>
          )}

          <div className="text-center">
            <button className="btn btn-warning me-2" onClick={clearExpression}>
              Clear Expression
            </button>
            <button className="btn btn-primary me-2" onClick={startNewGame}>
              New Game
            </button>
            <button className="btn btn-info" onClick={toggleSolutions}>
              {gameState.showSolutions ? 'Hide' : 'Show'} Solutions
            </button>
          </div>
        </div>

        {/* Computer Solutions */}
        {gameState.showSolutions && (
          <div className="computer-solutions">
            <h3>Computer Solutions</h3>
            {gameState.solutions.length > 0 ? (
              <ul className="list-unstyled">
                {gameState.solutions.map((solution, index) => (
                  <li key={index} className="mb-2">
                    {solution}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No solutions found for this combination. Try generating new cards!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;