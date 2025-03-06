import { z } from "zod";

// Word validation schema
export const wordSchema = z.object({
  word: z.string().length(5),
});

export type Word = z.infer<typeof wordSchema>;

// Guess result schema
export const guessResultSchema = z.object({
  correct: z.boolean(),
  feedback: z.array(
    z.object({
      letter: z.string().length(1),
      status: z.enum(["correct", "present", "absent"])
    })
  )
});

export type GuessResult = z.infer<typeof guessResultSchema>;
