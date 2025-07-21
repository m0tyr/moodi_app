import { useQuery } from "@tanstack/react-query";
import { UserApiService } from "@/lib/api/user/user.api.definitions";
import { User } from "@/lib/types/moodiusers.types";

export function useQueryProfile(username: string,UserApiService: UserApiService) {
  return useQuery<User, Error>({
    queryKey: ["user", "profile"],
    queryFn: async () => UserApiService.getUserByUsername(username),
  });
}
