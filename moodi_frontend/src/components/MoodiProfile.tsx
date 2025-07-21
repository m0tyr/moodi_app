"use client";
import { useQueryMyProfile } from "@/hooks/useQueryMyProfile";
import { UserApiServiceImplementation } from "@/lib/api/user/user.api.service";
import { motion } from "framer-motion";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/useLogout";
import { AuthApiServiceImplementation } from "@/lib/api/auth/auth.api.service";
import { useRouter } from "next/navigation";
import { useQueryProfile } from "@/hooks/useQueryProfile";

type MoodiProfileProps = {
  username: string;
};

const MoodiProfile: React.FC<MoodiProfileProps> = ({ username }) => {
  const UserApiService = new UserApiServiceImplementation();
  const AuthApiService = new AuthApiServiceImplementation();
  const router = useRouter();

  const { data: user, isLoading, error } = useQueryProfile(username, UserApiService);

  const handleGoBack = () => {
    router.push('/feed');
  }
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="w-[300px] relative flex flex-row items-center justify-between">
        <motion.div whileTap={{ scale: 0.95 }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }} onClick={handleGoBack} className="absolute top-0 left-[-50px] p-2 cursor-pointer justify-center items-center flex bg-[#121212] border border-[#2d2d2d]/30 rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" strokeWidth={2} viewBox="0 0 7 16"><path fill="white" d="M5.5 13a.47.47 0 0 1-.35-.15l-4.5-4.5c-.2-.2-.2-.51 0-.71l4.5-4.49c.2-.2.51-.2.71 0c.2.2.2.51 0 .71L1.71 8l4.15 4.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z" /></svg>
        </motion.div>
        <span className=" tracking-tight font-medium text-[15px] text-white">{user?.username}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[220px] drop-shadow-xl rounded-2xl bg-[#181818] border-x-[0.2333333px] border-b-[0.2333333px]  border-x-[#1d1d1d] border-y-[#1d1d1d]  text-small-semibold !text-[15px]"
          >
            <DropdownMenuGroup className="text-white text-[14px] m-1">
              <DropdownMenuItem className=" text-red-600 hover:bg-[#121212]/80 cursor-pointer">
                Signaler
              </DropdownMenuItem>
            </DropdownMenuGroup>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <motion.div whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }} className="w-[300px] cursor-pointer h-[300px] rounded-full bg-[#121212] border border-[#2d2d2d]/30 shadow-2xl">
      </motion.div>
    </div>

  );
};

export default MoodiProfile;
