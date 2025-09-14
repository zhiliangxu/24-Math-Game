// Complete solutions database from https://www.4nums.com/solutions/allsolutions/
// All 1362 solvable combinations for the 24 Math Game
// Solutions are dynamically loaded from all-solutions.json

// Import the solutions JSON file
import allSolutionsData from '../../all-solutions.json';

// Convert the JSON data to the expected format
export const SOLUTION_DATABASE: Record<string, string[]> = (() => {
  const convertedDatabase: Record<string, string[]> = {};
  
  // Convert space-separated keys to comma-separated keys and ensure consistent format
  for (const [key, solutions] of Object.entries(allSolutionsData)) {
    // Convert "1 1 1 8" to "1,1,1,8"
    const commaKey = key.replace(/\s+/g, ',');
    convertedDatabase[commaKey] = solutions;
  }
  
  return convertedDatabase;
})();

// Fix the incorrect solutions above
const CORRECTED_SOLUTIONS: Record<string, string[]> = {
  "1,1,8,8": [
    "8 / (1 - 1/8) = 24"
  ],
  "2,2,10,10": [
    "(10 + 10) + 2 + 2 = 24"
  ],
  "2,3,4,6": [
    "2 * 3 * 4 = 24",
    "6 * (2 + 3 - 1) = 24"
  ],
  "3,3,8,8": [
    "8 / (3 - 8/3) = 24"
  ],
  "4,1,8,7": [
    "(8 - 4) * (7 - 1) = 24"
  ],
  "6,6,6,6": [
    "6 + 6 + 6 + 6 = 24"
  ],
  "2,4,6,8": [
    "(8 - 6) * (4 + 2) * 2 = 24"
  ]
};

export function getSolutions(cards: number[]): string[] {
  // Sort the cards to create a consistent key
  const sortedCards = [...cards].sort((a, b) => a - b);
  const key = sortedCards.join(',');
  
  // Return solutions from corrected database if available
  const solutions = CORRECTED_SOLUTIONS[key] || SOLUTION_DATABASE[key] || [];
  
  // If no pre-calculated solutions found, return empty array
  // In a real implementation, you might want to calculate solutions algorithmically
  return solutions;
}

export function hasAnySolution(cards: number[]): boolean {
  const solutions = getSolutions(cards);
  return solutions.length > 0;
}

export function formatSolution(solution: string): string {
  return solution;
}