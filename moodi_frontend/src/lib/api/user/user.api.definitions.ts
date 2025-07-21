import { User } from "@/lib/types/moodiusers.types";

export interface UserApiService {
  getConnectedUser: () => Promise<User>;
  getUserByUsername: (username: string) => Promise<User>;
  getUserFeed: () => Promise<User[]>;
  updateUser: (id: number, user: User) => Promise<User>;
}