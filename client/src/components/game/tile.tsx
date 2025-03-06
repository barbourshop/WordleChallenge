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
      initial={{ rotateX: 0 }}
      animate={{ rotateX: status !== "empty" ? [0, 90, 0] : 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded",
        "sm:w-16 sm:h-16",
        statusStyles[status]
      )}
    >
      {letter.toUpperCase()}
    </motion.div>
  );
}
