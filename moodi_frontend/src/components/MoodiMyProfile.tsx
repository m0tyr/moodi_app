"use client";
import { useQueryMyProfile } from "@/hooks/useQueryMyProfile";
import { UserApiServiceImplementation } from "@/lib/api/user/user.api.service";
import { motion } from "framer-motion";
import React from "react";

type MoodiMyProfileProps = {};

const MoodiMyProfile: React.FC<MoodiMyProfileProps> = () => {
  const UserApiService = new UserApiServiceImplementation();
  const { data: user, isLoading, error } = useQueryMyProfile(UserApiService);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[300px] flex flex-row items-center justify-between">
        <span className=" tracking-tight font-medium text-[15px]">{user?.username}</span>
        <motion.div
          className="flex flex-row items-center justify-center gap-2 cursor-pointer p-2"
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
      <div className="w-[300px] h-[300px] rounded-full bg-[#121212] border border-[#2d2d2d]/30 shadow-2xl"></div>
    </div>
  );
};

export default MoodiMyProfile;
