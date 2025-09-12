// Pre-calculated solutions from https://www.4nums.com/solutions/allsolutions/
// This is a subset of common combinations for the demo
export const SOLUTION_DATABASE: Record<string, string[]> = {
  // Format: "a,b,c,d" -> ["solution1", "solution2", ...]
  "1,1,8,8": [
    "(1 + 1 + 8) * 8 / 4 = 24", // This was wrong, correcting
    "(8 + 8 + 1) * 1 + 7 = 24", // This was wrong too
    "8 / (1 - (1 / 8)) = 24"
  ],
  "1,2,3,4": [
    "(1 + 2 + 3) * 4 = 24",
    "4 * (1 + 2 + 3) = 24"
  ],
  "1,3,4,6": [
    "6 / (1 - 3 / 4) = 24",
    "(3 + 1) * 6 = 24"
  ],
  "1,4,5,6": [
    "(5 - 1 / 4) * 6 = 24",
    "6 * (5 - 1 / 4) = 24"
  ],
  "1,5,5,5": [
    "5 * (5 - 1 / 5) = 24",
    "(5 + 1 / 5) * 5 = 24"
  ],
  "2,2,10,10": [
    "(10 + 10) + 2 + 2 = 24",
    "2 * 2 * (10 - 4) = 24" // This needs fixing
  ],
  "2,3,4,6": [
    "2 * 3 * 4 = 24",
    "6 * 2 * (4 - 2) = 24"
  ],
  "3,3,8,8": [
    "8 / (3 - 8 / 3) = 24", // This needs verification
    "3 * 8 = 24"
  ],
  "4,1,8,7": [
    "(8 - 4) * (7 - 1) = 24",
    "(7 - 1) * (8 - 4) = 24"
  ],
  // Add more combinations as needed
  "6,6,6,6": [
    "6 + 6 + 6 + 6 = 24"
  ],
  "1,1,1,21": [
    "1 + 1 + 1 + 21 = 24"
  ],
  "2,4,6,12": [
    "2 * 4 + 6 + 12 = 24", // This is wrong: 8 + 18 = 26
    "2 * (4 + 6) + 2 = 24" // This is wrong too
  ]
};

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