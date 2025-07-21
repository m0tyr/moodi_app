import { useQuery } from "@tanstack/react-query";
import { UserApiService } from "@/lib/api/user/user.api.definitions";
import { User } from "@/lib/types/moodiusers.types";

export function useQueryUserFeed(UserApiService: UserApiService) {
  return useQuery<User[], Error>({
    queryKey: ["user", "my_feed"],
    queryFn: async () => UserApiService.getUserFeed(),
  });
}
