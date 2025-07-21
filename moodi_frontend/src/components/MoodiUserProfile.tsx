'use client';
import { motion } from "framer-motion";
import React from "react";

interface MoodiUserProfileProps {
  id: number;
  name: string;
  mood: string;
  describe_my_mood: string;
  index: number; 
}

const MoodiUserProfile: React.FC<MoodiUserProfileProps> = ({
  id,
  name,
  mood,
  describe_my_mood,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.15,
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.02,
      }}
      key={id}
      className="flex flex-row justify-between cursor-pointer items-center gap-2 w-[300px] h-[75px] p-1.5 bg-[#121212] border border-[#2d2d2d]/30 rounded-full shadow-lg overflow-x-hidden"
    >
      <div className="flex flex-row items-center justify-center gap-3 h-full">
        <div className="w-[60px] h-full rounded-full bg-[#161616]"></div>
        <div className="flex flex-col justify-center items-start h-full">
          <span className="tracking-tight font-normal text-[15px] text-white">
            {name}
          </span>
          <span className="tracking-tight text-[#b0b0b0] font-medium text-[12px]">
            {describe_my_mood}
          </span>
        </div>
      </div>

      <div className="w-fit flex flex-row items-center justify-center gap-3 p-2.5">
        <motion.div
          className="flex flex-row items-center justify-center gap-2 cursor-pointer p-2 text-white"
          whileTap={{ scale: 0.95 }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MoodiUserProfile;