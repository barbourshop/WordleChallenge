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
  const getKeyStyle = (key: string) => {
    const lowKey = key.toLowerCase();
    let style = "bg-[#d3d6da] hover:bg-[#d3d6da]/80 text-black";

    for (const guess of feedback) {
      for (const { letter, status: letterStatus } of guess) {
        if (letter === lowKey) {
          if (letterStatus === "correct") return "bg-[#6aaa64] hover:bg-[#6aaa64]/80 text-white";
          if (letterStatus === "present") return "bg-[#c9b458] hover:bg-[#c9b458]/80 text-white";
          if (letterStatus === "absent") style = "bg-[#787c7e] hover:bg-[#787c7e]/80 text-white";
        }
      }
    }

    return style;
  };

  return (
    <div className="w-full max-w-[500px] mx-auto p-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 my-1">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKey(key)}
              className={cn(
                "h-14 text-lg font-semibold transition-colors",
                key.length > 1 ? "px-4" : "w-9",
                getKeyStyle(key)
              )}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}