import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TileStatus = "correct" | "present" | "absent" | "empty" | "tbd";

interface TileProps {
  letter: string;
  status: TileStatus;
  delay?: number;
}

const statusStyles = {
  correct: "bg-[#6aaa64] text-white border-[#6aaa64]",
  present: "bg-[#c9b458] text-white border-[#c9b458]",
  absent: "bg-[#787c7e] text-white border-[#787c7e]",
  empty: "bg-white border-[#d3d6da]",
  tbd: "bg-white border-[#878a8c]"
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