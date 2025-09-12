# 24 Math Game

A web-based implementation of the classic 24 math game built with React, TypeScript, and Vite.

## What is the 24 Math Game?

The 24 math game is a mathematical puzzle where players use four given numbers and basic arithmetic operations (+, -, ×, ÷) to create an expression that equals exactly 24. Each number must be used exactly once, and parentheses can be used to change the order of operations.

## Features

- **Two Game Modes**: Easy (1-10) and Standard (1-13) difficulty levels
- **Interactive UI**: Drag and drop cards and operators to build expressions
- **Real-time Calculation**: See results as you build your expression
- **Animated Cards**: Card dealing animations with sound effects
- **Success Feedback**: Congratulatory animations and sounds when you solve it
- **Computer Solutions**: View all possible solutions for the current card set
- **Responsive Design**: Works on desktop and mobile devices
- **Green Poker Theme**: Authentic card game aesthetic

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Bootstrap 5 for responsive UI components
- **Animations**: React Spring for smooth animations and transitions
- **Audio**: Web Audio API for sound effects
- **Testing**: Vitest with React Testing Library
- **Code Quality**: ESLint and TypeScript for type safety

## Project Structure

```
src/
├── components/          # React components
│   ├── Card.tsx        # Playing card component
│   ├── OperatorButton.tsx  # Math operator buttons
│   └── DropZone.tsx    # Drop zones for drag & drop
├── utils/              # Utility modules
│   ├── gameRules.ts    # Game logic and rules
│   ├── solutionLookup.ts  # Pre-calculated solutions database
│   └── audioUtils.ts   # Sound effect utilities
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related interfaces
├── tests/              # Unit tests
│   ├── gameRules.test.ts
│   ├── solutionLookup.test.ts
│   └── audioUtils.test.ts
└── assets/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 24-Math-Game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder, ready for deployment to any static hosting service.

## How to Play

1. **Choose a game mode**: Select Easy (1-10) or Standard (1-13) difficulty
2. **Study the cards**: You'll see 4 randomly generated cards
3. **Build an expression**: Drag cards and operators to create a mathematical expression
4. **Reach 24**: Try to make an expression that equals exactly 24
5. **Get help**: Click "Show Solutions" if you need hints
6. **Celebrate**: Enjoy the success animation when you solve it!

## Game Rules

- Use each of the 4 cards exactly once
- Only use basic arithmetic operators: +, -, ×, ÷
- The final result must equal exactly 24
- Parentheses are implied by the order you place cards and operators

## Examples

**Cards: 4, 1, 8, 7**
- Solution: (8 - 4) × (7 - 1) = 4 × 6 = 24

**Cards: 6, 6, 6, 6**
- Solution: 6 + 6 + 6 + 6 = 24

## Technical Implementation

### Modular Architecture

The codebase is organized into separate modules for maintainability:

- **Game Rules Module**: Handles card generation, expression validation, and calculation
- **Solution Lookup Module**: Contains pre-calculated solutions from mathematical databases
- **Audio Utils Module**: Manages sound effects using Web Audio API
- **Component Architecture**: Reusable React components with TypeScript interfaces

### Performance Optimizations

- **Vite Build System**: Fast hot module replacement and optimized production builds
- **React Spring**: Hardware-accelerated animations using CSS transforms
- **Lazy Loading**: Components and utilities loaded on demand
- **Minified Output**: Compressed JavaScript and CSS for faster loading

### Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast color scheme
- Responsive design for all screen sizes

## Testing

The project includes comprehensive unit tests for all utility modules:

```bash
npm run test
```

Tests cover:
- Game rule validation
- Mathematical expression calculation
- Solution lookup functionality
- Audio system integration

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Ensure all tests pass: `npm run test`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Solutions database inspired by [4nums.com](https://www.4nums.com/solutions/allsolutions/)
- Card design inspired by classic poker aesthetics
- Mathematical algorithms based on standard 24-game rules
