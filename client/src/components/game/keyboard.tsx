import { Button } from "@/components/ui/button";
import { type GuessResult } from "@shared/schema";
import { cn } from "@/lib/utils";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "←"]
];

interface KeyboardProps {
  onKey: (key: string) => void;
  feedback: GuessResult["feedback"][];
}

export function Keyboard({ onKey, feedback }: KeyboardProps) {
  const getKeyVariant = (key: string) => {
    const lowKey = key.toLowerCase();
    let status: "default" | "destructive" | "secondary" | "primary" = "default";

    for (const guess of feedback) {
      for (const { letter, status: letterStatus } of guess) {
        if (letter === lowKey) {
          if (letterStatus === "correct") return "primary";
          if (letterStatus === "present") return "warning";
          if (letterStatus === "absent" && status === "default") return "secondary";
        }
      }
    }

    return status;
  };

  return (
    <div className="w-full max-w-[500px] mx-auto p-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 my-1">
          {row.map((key) => (
            <Button
              key={key}
              variant={getKeyVariant(key)}
              className={cn(
                "h-14 text-lg font-semibold",
                key.length > 1 ? "px-4" : "w-9"
              )}
              onClick={() => onKey(key)}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}