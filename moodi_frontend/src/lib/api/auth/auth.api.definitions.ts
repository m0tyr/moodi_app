

import { User, UserCreate } from "@/lib/types/moodiusers.types";

export interface AuthApiService {
  getConnectedUser: () => Promise<User>;
  signUp: (user: UserCreate) => Promise<any>;
  validateSession: (sessionId: string) => Promise<any>;
}
