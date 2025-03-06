import { type GuessResult } from "@shared/schema";
import { apiRequest } from "./queryClient";

export type GameState = {
  guesses: string[];
  feedback: GuessResult["feedback"][];
  currentGuess: string;
  gameWon: boolean;
  gameLost: boolean;
};

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export async function checkGuess(word: string): Promise<GuessResult> {
  const res = await apiRequest("POST", "/api/check", { word });
  return res.json();
}

export function isValidGuess(guess: string): boolean {
  return guess.length === WORD_LENGTH && /^[a-zA-Z]+$/.test(guess);
}

export function createInitialState(): GameState {
  return {
    guesses: [],
    feedback: [],
    currentGuess: "",
    gameWon: false,
    gameLost: false
  };
}
