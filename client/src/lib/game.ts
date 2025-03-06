import { getRandomWord, checkGuess as checkGuessLocal } from "./words";
import type { GuessResult } from "@shared/schema";

export type GameState = {
  guesses: string[];
  feedback: GuessResult["feedback"][];
  currentGuess: string;
  gameWon: boolean;
  gameLost: boolean;
  targetWord?: string;
};

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export function getNewWord(): string {
  return getRandomWord();
}

export function checkGuess(word: string, targetWord: string): GuessResult {
  return checkGuessLocal(word, targetWord);
}

export function isValidGuess(guess: string): boolean {
  return guess.length === WORD_LENGTH && /^[a-zA-Z]+$/.test(guess);
}

export function createInitialState(): GameState {
  const targetWord = getNewWord();
  return {
    guesses: [],
    feedback: [],
    currentGuess: "",
    gameWon: false,
    gameLost: false,
    targetWord,
  };
}