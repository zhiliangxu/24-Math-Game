// Complete solutions database from https://www.4nums.com/solutions/allsolutions/
// All 1362 solvable combinations for the 24 Math Game
// Solutions are statically imported from all-solutions.json

// Import the solutions JSON file
import allSolutionsData from '../all-solutions.json';

// Convert the JSON data to the expected format
export const SOLUTION_DATABASE: Record<string, string[]> = (() => {
  const convertedDatabase: Record<string, string[]> = {};
  
  // Convert space-separated keys to comma-separated keys and ensure consistent format
  for (const [key, solutions] of Object.entries(allSolutionsData)) {
    // Convert "1 1 1 8" to "1,1,1,8"
    const commaKey = key.replace(/\s+/g, ',');
    if (Array.isArray(solutions)) {
      convertedDatabase[commaKey] = solutions as string[];
    }
  }
  
  return convertedDatabase;
})();

// Async version for getting solutions (for backward compatibility, now synchronous)
export async function getSolutionsAsync(cards: number[]): Promise<string[]> {
  const sortedCards = [...cards].sort((a, b) => a - b);
  const key = sortedCards.join(',');
  
  // Return solutions from database
  const solutions = SOLUTION_DATABASE[key] || [];
  return solutions;
}

// Synchronous version for getting solutions
export function getSolutions(cards: number[]): string[] {
  const sortedCards = [...cards].sort((a, b) => a - b);
  const key = sortedCards.join(',');
  
  // Return solutions from database
  const solutions = SOLUTION_DATABASE[key] || [];
  
  // If no pre-calculated solutions found, return empty array
  // In a real implementation, you might want to calculate solutions algorithmically
  return solutions;
}

// Async version for checking if solutions exist (preferred)
export async function hasAnySolutionAsync(cards: number[]): Promise<boolean> {
  const solutions = await getSolutionsAsync(cards);
  return solutions.length > 0;
}

// Synchronous version for backward compatibility (may return false if not loaded)
export function hasAnySolution(cards: number[]): boolean {
  const solutions = getSolutions(cards);
  return solutions.length > 0;
}

export function formatSolution(solution: string): string {
  return solution;
}