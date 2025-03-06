// Common 5-letter words
export const words = [
  "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again",
  "agent", "agree", "ahead", "alarm", "album", "alert", "alike", "alive", "allow", "alone",
  "along", "alter", "among", "anger", "angle", "angry", "apart", "apple", "apply", "arena",
  "argue", "arise", "array", "aside", "asset", "audio", "audit", "avoid", "award", "aware",
  "badly", "baker", "bases", "basic", "basis", "beach", "began", "begin", "begun", "being",
  "below", "bench", "billy", "birth", "black", "blame", "blind", "block", "blood", "board",
  "boost", "booth", "bound", "brain", "brand", "bread", "break", "breed", "brief", "bring",
  "broad", "broke", "brown", "build", "built", "buyer", "cable", "calif", "carry", "catch",
  "cause", "chain", "chair", "chart", "chase", "cheap", "check", "chest", "chief", "child",
  "china", "chose", "civil", "claim", "class", "clean", "clear", "click", "clock", "close"
];

export function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

export function checkGuess(guess: string, target: string): { 
  correct: boolean;
  feedback: Array<{ letter: string; status: "correct" | "present" | "absent" }>;
} {
  guess = guess.toLowerCase();
  target = target.toLowerCase();

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

  const isCorrect = feedback.every(f => f!.status === "correct");
  return { correct: isCorrect, feedback: feedback as any };
}
