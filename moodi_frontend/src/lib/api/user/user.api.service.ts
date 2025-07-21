import { User } from "@/lib/types/moodiusers.types";
import { getBaseBackendUrl } from "../getBaseBackendUrl";
import { UserApiService } from "../user/user.api.definitions";

export class UserApiServiceImplementation implements UserApiService {
  async getConnectedUser(): Promise<User> {
    const baseUrl = getBaseBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/v1/users/me`,
       {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch my moodi");
    }
    return response.json();
  }
  async getUserFeed(): Promise<User[]> {
    const baseUrl = getBaseBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/v1/users/feed`, 
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user feed");
    }
    return response.json();
  }
  async getUserByUsername(username: string): Promise<User> {
    const baseUrl = getBaseBackendUrl();
    const response = await fetch( 
      `${baseUrl}/api/v1/users/username/${username}`,
      {
        method: "GET",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch user with username: ${username}`);
    }
    return response.json();
  }
  async updateUser(id: number, user: User): Promise<User> {
    const baseUrl = getBaseBackendUrl();
    const response = await fetch( 
      `${baseUrl}/api/v1/users/edit_profile/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to update user with id: ${id}`);
    } 
    return response.json();
  }
}