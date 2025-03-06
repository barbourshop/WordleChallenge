import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TileStatus = "correct" | "present" | "absent" | "empty" | "tbd";

interface TileProps {
  letter: string;
  status: TileStatus;
  delay?: number;
}

const statusStyles = {
  correct: "bg-emerald-600 text-white border-emerald-600",
  present: "bg-amber-500 text-white border-amber-500",
  absent: "bg-slate-600 text-white border-slate-600",
  empty: "bg-transparent border-gray-300",
  tbd: "bg-transparent border-gray-400"
};

export function Tile({ letter, status, delay = 0 }: TileProps) {
  return (
    <motion.div
      initial={{ rotateX: 0 }}
      animate={{ rotateX: status !== "empty" ? [0, 90, 0] : 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded",
        statusStyles[status]
      )}
    >
      {letter.toUpperCase()}
    </motion.div>
  );
}