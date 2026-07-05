import { motion } from 'motion/react';

interface SectionDividerProps {
  label?: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative w-full flex items-center justify-center my-0 z-20 overflow-visible pointer-events-none select-none py-6 bg-white">
      {/* Darker light blue atmospheric smudge glow */}
      <div className="absolute inset-x-0 h-10 bg-gradient-to-r from-transparent via-sky-500/15 via-blue-600/20 via-sky-500/15 to-transparent blur-xl -translate-y-1/2" />
      
      {/* Smudged thick border glow */}
      <div className="absolute inset-x-0 h-[5px] bg-gradient-to-r from-transparent via-sky-500/35 via-blue-600/45 via-sky-500/35 to-transparent blur-[3px]" />
      
      {/* Solid dark blue-sky core divider line (the "smudge drawing" effect) */}
      <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/60 via-blue-600/85 via-sky-400/60 to-transparent" />
    </div>
  );
}
