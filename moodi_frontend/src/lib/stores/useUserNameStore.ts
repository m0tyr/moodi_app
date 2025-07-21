import { create } from "zustand";
import { User } from "../types/moodiusers.types";

type UserNameStore = {
  username: string | null;
  actions: {
    cacheUsername: (user: string) => void;
    getConnectedUsername: () => string | null;
  };
};

export const useUserNameStore = create<UserNameStore>((set, get) => ({
  username: null,
  actions: {
    cacheUsername: (username: string) => set({ username }),
    getConnectedUsername: () => get().username,
  },
}));
