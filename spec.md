# Requirements of 24 math game

## What is 24 math game?

The 24 math game is a classic mathematical puzzle where players are given four numbers (typically from playing cards) and must use basic arithmetic operations (+, -, ×, ÷) to combine these numbers and reach exactly 24.

### Game Rules

- Players receive 4 numbers (usually 1-13 from playing cards, where J=11, Q=12, K=13)
- Each number must be used exactly once
- Only basic arithmetic operations are allowed: addition (+), subtraction (-), multiplication (×), and division (÷)
- Parentheses can be used to change the order of operations
- The goal is to create an expression that equals exactly 24

### Examples

- Given numbers: 4, 1, 8, 7
  - Solution: (8-4) × (7-1) = 4 × 6 = 24
- Given numbers: 1, 1, 8, 8
  - Solution: (8+8+1) × 1 = 24

### Game Variations

- **Easy Mode**: Use simpler numbers (1-10)
- **Standard Mode**: Use card values (1-13)
- **Time Challenge**: Solve within a time limit
- **Multiple Solutions**: Find all possible solutions for a given set

## Feature requirements

* Write a web-based 24 math game.
* Players can choose from easy mode and standard mode.
* No time challenge.
* The game board is green.
* Use poker cards to represent numbers.
* Use animation for dealing cards, use sound when cards are dealt.
* Allow players to use add, subtract, multiple, divide operators, as well as parenthesis.
* Players can drag and drop cards and operators to input a solution. The result is calculated in real time.
* Congratulate players if the solution they input is correct, with a sound and animation.
* Players can choose to let computer tell them the solutions. Solutions by computer are displayed in plain text. Display all distinct solutions.

## Technical requirements

* Write a single page application with no backend service.
* Written in TypeScript, HTML and CSS.
* Use Vite for local development.
* For frontend framework, use React.
* Use Bootstrap for UI styles.
* Use React Spring for animation effect.
* Use NPM packages only where necessary.
* Use the solutions listed in [All distinct 24 math game solutions](https://www.4nums.com/solutions/allsolutions/) to look for solutions in computer mode. Do not write algorithms to figure out solutions.
* Code should be modular, for example, implement solution lookup in a separate TypeScript file, implement rules of the game in a separate TypeScript file too. Group similar files in folders.
* Add test cases for TypeScript modules. Make sure all test cases can pass.
* At the end, compile TypeScript code to minimal JavaScript so that it can run in a web browser.
* When the width of solution area is not enough, add a horizontal scroll bar for the area to drop cards.
