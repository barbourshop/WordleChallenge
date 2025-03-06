import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TileStatus = "correct" | "present" | "absent" | "empty" | "tbd";

interface TileProps {
  letter: string;
  status: TileStatus;
  delay?: number;
}

const statusStyles = {
  correct: "bg-green-500 text-white border-green-500",
  present: "bg-yellow-500 text-white border-yellow-500",
  absent: "bg-gray-500 text-white border-gray-500",
  empty: "bg-transparent text-foreground border-gray-200",
  tbd: "bg-transparent text-foreground border-gray-400"
};

export function Tile({ letter, status, delay = 0 }: TileProps) {
  return (
    <motion.div
      initial={{ rotateX: 0, scale: 1 }}
      animate={{ 
        rotateX: status !== "empty" ? [0, 90, 0] : 0,
        scale: letter ? [1, 1.1, 1] : 1
      }}
      transition={{ 
        duration: 0.5, 
        delay: status !== "empty" ? delay : 0,
        scale: { duration: 0.1 }
      }}
      className={cn(
        "w-12 h-12 border-2 flex items-center justify-center text-xl font-bold rounded",
        "sm:w-14 sm:h-14 sm:text-2xl",
        "transition-colors duration-300",
        statusStyles[status]
      )}
    >
      {letter.toUpperCase()}
    </motion.div>
  );
}