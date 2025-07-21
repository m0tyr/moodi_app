import { useQuery } from "@tanstack/react-query";
import { UserApiService } from "@/lib/api/user/user.api.definitions";
import { User } from "@/lib/types/moodiusers.types";

export function useQueryMyProfile(UserApiService: UserApiService) {
  return useQuery<User, Error>({
    queryKey: ["user", "my_profile"],
    queryFn: async () => UserApiService.getConnectedUser(),
    staleTime: 1000 * 60 * 5,
  });
}
