import type { Express } from "express";
import { createServer, type Server } from "http";
import { getRandomWord } from "./words";
import { wordSchema, guessResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get a new random word
  app.get("/api/word", (_req, res) => {
    const word = getRandomWord();
    res.json({ word });
  });

  // Check a guess
  app.post("/api/check", (req, res) => {
    const { word, targetWord } = req.body;
    const result = wordSchema.safeParse({ word });
    if (!result.success) {
      return res.status(400).json({ message: "Invalid word format" });
    }

    const guess = result.data.word.toLowerCase();
    const target = targetWord.toLowerCase();

    // First pass: mark correct letters
    const feedback = Array(5).fill(null).map((_, i) => {
      if (guess[i] === target[i]) {
        return { letter: guess[i], status: "correct" as const };
      }
      return null;
    });

    // Second pass: mark present/absent letters
    const targetLetters = target.split('');
    for (let i = 0; i < guess.length; i++) {
      if (feedback[i] !== null) continue; // Skip correct letters

      const letter = guess[i];
      const letterIndex = targetLetters.indexOf(letter);

      if (letterIndex !== -1 && guess[letterIndex] !== target[letterIndex]) {
        // Letter exists in target and isn't already used for a correct match
        feedback[i] = { letter, status: "present" as const };
        targetLetters[letterIndex] = null as any; // Mark as used
      } else {
        feedback[i] = { letter, status: "absent" as const };
      }
    }

    const isCorrect = feedback.every(f => f.status === "correct");
    res.json({ correct: isCorrect, feedback });
  });

  const httpServer = createServer(app);
  return httpServer;
}