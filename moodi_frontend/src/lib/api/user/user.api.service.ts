import { User } from "@/lib/types/moodiusers.types";
import { getBaseBackendUrl } from "../getBaseBackendUrl";
import { UserApiService } from "../user/user.api.definitions";

export class UserApiServiceImplementation implements UserApiService {
  async getConnectedUser(): Promise<User> {
    const baseUrl = getBaseBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/v1/users/me`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch my moodi");
    }
    return response.json();
  }
}