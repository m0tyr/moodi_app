"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AuthApiServiceImplementation } from "@/lib/api/auth/auth.api.service";
import { Emoji, UserCreate } from "@/lib/types/moodiusers.types";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(100, { message: "Username must be at most 100 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    })
    .refine((val) => !val.includes(" "), {
      message: "Username cannot contain spaces",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be at most 50 characters" })
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+]+$/, {
      message:
        "Password can only contain letters, numbers, and special characters",
    })
    .refine((val) => !val.includes(" "), {
      message: "Password cannot contain spaces",
    }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    const authApiService = new AuthApiServiceImplementation();
    const createdUserReq: UserCreate = {
      username: data.username,
      password: data.password,
      myMoodi: {
        id: "",
        name: "",
        category: "",
        userId: "",
        emoji: Emoji.HAPPY,
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      id: "",
    };

    authApiService.signUp(createdUserReq).then(() => {
      router.push("/feed");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col items-center p-6 min-w-[350px] max-w-[400px] gap-5 w-full ">
        <div className="flex flex-col items-start relative justify-cente gap-1 w-full ">
          <input
            type="text"
            placeholder="nom d'utilisateur"
            {...register("username")}
            autoComplete="username"
            className="py-5 px-4 w-full rounded-[20px] bg-[#060606] tracking-tight outline outline-[#161616] placeholder:text-[#6d6d6d] text-white font-normal text-[15px]"
          />
          <div className="pl-2 absolute bottom-[-20px] left-0">
            {errors.username && (
              <span className="text-red-500 text-[10px]">
                {errors.username.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center relative justify-center flex-row gap-4 w-full ">
          <input
            type="password"
            placeholder="mot de passe"
            {...register("password")}
            autoComplete="current-password"
            className="py-5 px-4 w-full rounded-[20px] bg-[#060606] tracking-tight outline outline-[#161616] placeholder:text-[#6d6d6d] text-white font-normal text-[15px]"
          />
          <div className="pl-2 absolute bottom-[-20px] left-0">
            {errors.password && (
              <span className="text-red-500 text-[10px]">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          animate={
            isSubmitted && (errors.username || errors.password)
              ? { y: [0, -2, 1, -0.5, 0.25, 0] }
              : { y: 0 }
          }
          transition={
            isSubmitted && (errors.username || errors.password)
              ? { duration: 0.8, ease: "easeInOut" }
              : {}
          }
          disabled={isSubmitting}
          type="submit"
          className={`cursor-pointer py-4.5 px-4 w-full bg-white tracking-tight text-[15px] font-semibold rounded-[20px] ${
            isSubmitted && (errors.username || errors.password)
              ? "text-red-500 border-[.5px] border-red-500"
              : "text-black"
          }`}
          key={
            isSubmitted && (errors.username || errors.password)
              ? `${errors.username?.message ?? ""}-${
                  errors.password?.message ?? ""
                }-${Date.now()}`
              : "normal"
          }
        >
          S'identifier
        </motion.button>
      </div>
    </form>
  );
};

export default LoginForm;
