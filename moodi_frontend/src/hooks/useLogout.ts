import { useMutation } from "@tanstack/react-query";
import { AuthApiService } from "@/lib/api/auth/auth.api.definitions";

export function useLogout(AuthApiService: AuthApiService) {
  return useMutation<void, unknown, void>({
    mutationFn: () => AuthApiService.logout(),
  });
}
