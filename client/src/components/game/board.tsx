import { Tile } from "./tile";
import { WORD_LENGTH, MAX_GUESSES, type GameState } from "@/lib/game";

interface BoardProps {
  gameState: GameState;
}

export function Board({ gameState }: BoardProps) {
  const { guesses, feedback, currentGuess } = gameState;
  
  const rows = Array(MAX_GUESSES).fill(null);

  return (
    <div className="grid gap-1 mx-auto">
      {rows.map((_, rowIndex) => {
        const isCurrentRow = rowIndex === guesses.length;
        const guess = isCurrentRow ? currentGuess : guesses[rowIndex] || "";
        const rowFeedback = feedback[rowIndex];

        return (
          <div key={rowIndex} className="grid grid-cols-5 gap-1">
            {Array(WORD_LENGTH).fill(null).map((_, colIndex) => {
              const letter = guess[colIndex] || "";
              let status: "correct" | "present" | "absent" | "empty" | "tbd" = "empty";

              if (isCurrentRow && letter) {
                status = "tbd";
              } else if (rowFeedback) {
                status = rowFeedback[colIndex].status;
              }

              return (
                <Tile
                  key={colIndex}
                  letter={letter}
                  status={status}
                  delay={colIndex * 0.1}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
