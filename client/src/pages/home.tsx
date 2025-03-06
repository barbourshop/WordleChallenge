import { useState } from "react";
import { Board } from "@/components/game/board";
import { Keyboard } from "@/components/game/keyboard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  createInitialState,
  checkGuess,
  isValidGuess,
  WORD_LENGTH,
  type GameState
} from "@/lib/game";
import { RefreshCw } from "lucide-react";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const { toast } = useToast();

  const handleNewGame = () => {
    setGameState(createInitialState());
  };

  const handleKey = async (key: string) => {
    if (gameState.gameWon || gameState.gameLost) return;

    if (key === "Enter") {
      if (gameState.currentGuess.length !== WORD_LENGTH) {
        toast({
          title: "Not enough letters",
          description: "Word must be 5 letters long",
          variant: "destructive"
        });
        return;
      }

      if (!isValidGuess(gameState.currentGuess)) {
        toast({
          title: "Invalid word",
          description: "Please enter a valid word",
          variant: "destructive"
        });
        return;
      }

      try {
        const result = await checkGuess(gameState.currentGuess);
        
        setGameState(prev => ({
          ...prev,
          guesses: [...prev.guesses, prev.currentGuess],
          feedback: [...prev.feedback, result.feedback],
          currentGuess: "",
          gameWon: result.correct,
          gameLost: !result.correct && prev.guesses.length === 5
        }));

        if (result.correct) {
          toast({
            title: "Congratulations!",
            description: "You won! Try another word?",
            variant: "default"
          });
        } else if (!result.correct && gameState.guesses.length === 5) {
          toast({
            title: "Game Over",
            description: "Better luck next time!",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to check word",
          variant: "destructive"
        });
      }
    } else if (key === "←") {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1)
      }));
    } else if (gameState.currentGuess.length < WORD_LENGTH) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key.toLowerCase()
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full p-4 flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold text-center flex-1">Wordle Clone</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNewGame}
          className="ml-auto"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </header>

      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col items-center justify-between gap-8 p-4">
        <Board gameState={gameState} />
        <Keyboard onKey={handleKey} feedback={gameState.feedback} />
      </main>
    </div>
  );
}