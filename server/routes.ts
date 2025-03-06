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
    const result = wordSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid word format" });
    }

    const guess = result.data.word.toLowerCase();
    const target = getRandomWord().toLowerCase();
    
    const feedback = guess.split("").map((letter, i) => {
      if (letter === target[i]) {
        return { letter, status: "correct" as const };
      }
      if (target.includes(letter)) {
        return { letter, status: "present" as const };
      }
      return { letter, status: "absent" as const };
    });

    const isCorrect = feedback.every(f => f.status === "correct");
    res.json({ correct: isCorrect, feedback });
  });

  const httpServer = createServer(app);
  return httpServer;
}
