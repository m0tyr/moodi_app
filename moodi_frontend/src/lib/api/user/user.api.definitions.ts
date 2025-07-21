import { User } from "@/lib/types/moodiusers.types";

export interface UserApiService {
  getConnectedUser: () => Promise<User>;
}