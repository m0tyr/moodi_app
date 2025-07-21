import { User, UserCreate } from "@/lib/types/moodiusers.types";
import { AuthApiService } from "./auth.api.definitions";
import { getBaseBackendUrl } from "../getBaseBackendUrl";

export class AuthApiServiceImplementation implements AuthApiService {
  async getConnectedUser(req?: Request): Promise<User> {
    const baseUrl = getBaseBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/users/my-moodi`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch my moodi");
    }
    return response.json();
  }

  async signUp(user: UserCreate, req?: Request): Promise<any> {
    const baseUrl = getBaseBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/auth/signup`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    return response.json();
  }

  async validateSession(sessionId: string, req?: Request): Promise<any> {
    if (!sessionId) return { valid: false };

    try {
      const baseUrl = getBaseBackendUrl();
      const response = await fetch(
        `${baseUrl}/api/auth/validate-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `moodisessionid=${sessionId}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (!data.valid) {
          return { valid: false, reason: data.reason };
        } else {
          return {
            valid: true,
            userId: data.userId,
            username: data.username,
            sessionId: data.sessionId,
            loginTime: data.loginTime,
            lastAcceessed: data.lastAccessed,
          };
        }
      } else {
        return { valid: false, reason: "Backend Failed" };
      }
    } catch (error) {
      console.error("Backend session validation error:", error);
      return { valid: false, reason: "Network error" };
    }
  }
}