"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
import { useQueryMyProfile } from "@/hooks/useQueryMyProfile";
import { UserApiServiceImplementation } from "@/lib/api/user/user.api.service";
import { Textarea } from "@/components/ui/textarea";
import { useLogout } from "@/hooks/useLogout";
import { AuthApiServiceImplementation } from "@/lib/api/auth/auth.api.service";

const editProfileSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Le nom d'utilisateur doit contenir au moins 2 caractères." })
    .max(100, { message: "Le nom d'utilisateur est trop long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Seuls les lettres, chiffres et underscores sont autorisés.",
    }),
});

type EditProfileFormInputs = z.infer<typeof editProfileSchema>;

const MoodiEditProfile: React.FC = () => {
  const UserApiService = new UserApiServiceImplementation();
  const router = useRouter();
  const { data: user, isLoading, error } = useQueryMyProfile(UserApiService);

  const AuthApiService = new AuthApiServiceImplementation();
  const logoutMutation = useLogout(AuthApiService);
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
        console.log("Logout successful");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setValue,
    reset
  } = useForm<EditProfileFormInputs>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: EditProfileFormInputs) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("username", data.username);

    try {
      await UserApiService.updateUser(Number(user.id), {
        ...user,
        username: data.username,
      });
      router.push(`/feed`);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };
  if (isLoading) return <div>Chargement...</div>;
  if (error || !user) return <div>Erreur lors du chargement du profil.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="w-[300px] flex flex-row items-center justify-between">
          <div className="flex flex-col items-start relative w-full gap-1">
            <Textarea
              {...register("username")}
              defaultValue={user.username}
              className="w-full h-[20px] resize-none text-white tracking-tight font-medium  placeholder:text-white border-none outline-none text-[15px] focus:outline-none bg-[#060606]  rounded-[20px] p-4"
            />
            {errors.username && (
              <span className="text-red-500 text-xs pl-2">
                {errors.username.message}
              </span>
            )}
          </div>
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
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="!text-[rgb(255,48,64)]"
                >
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <motion.div whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }} className="w-[300px] h-[300px] cursor-pointer rounded-full bg-[#121212] border border-[#2d2d2d]/30 shadow-2xl">
        </motion.div>    </div>
      <div className="flex flex-col items-center p-6 min-w-[350px] max-w-[400px] gap-5 w-full">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          animate={
            isSubmitted && Object.keys(errors).length > 0
              ? { y: [0, -2, 1, -0.5, 0.25, 0] }
              : { y: 0 }
          }
          transition={
            isSubmitted && Object.keys(errors).length > 0
              ? { duration: 0.8, ease: "easeInOut" }
              : {}
          }
          disabled={isSubmitting}
          className={`cursor-pointer py-4.5 px-4 w-full bg-white tracking-tight text-[15px] font-semibold rounded-[20px] ${Object.keys(errors).length > 0
            ? "text-red-500 border-[.5px] border-red-500"
            : "text-black"
            }`}
        >
          Enregistrer les modifications
        </motion.button>
      </div>
    </form>
  );
};

export default MoodiEditProfile;
