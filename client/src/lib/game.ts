import { type GuessResult } from "@shared/schema";
import { apiRequest } from "./queryClient";

export type GameState = {
  guesses: string[];
  feedback: GuessResult["feedback"][];
  currentGuess: string;
  gameWon: boolean;
  gameLost: boolean;
  targetWord?: string; // Add target word to state
};

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export async function getNewWord(): Promise<string> {
  const res = await apiRequest("GET", "/api/word");
  const data = await res.json();
  return data.word;
}

export async function checkGuess(word: string, targetWord: string): Promise<GuessResult> {
  const res = await apiRequest("POST", "/api/check", { word, targetWord });
  return res.json();
}

export function isValidGuess(guess: string): boolean {
  return guess.length === WORD_LENGTH && /^[a-zA-Z]+$/.test(guess);
}

export async function createInitialState(): Promise<GameState> { // Async to fetch the word
  const targetWord = await getNewWord();
  return {
    guesses: [],
    feedback: [],
    currentGuess: "",
    gameWon: false,
    gameLost: false,
    targetWord,
  };
}