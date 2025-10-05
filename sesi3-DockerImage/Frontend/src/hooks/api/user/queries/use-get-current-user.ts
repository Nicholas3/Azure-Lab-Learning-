import { getCurrentUser } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentUser() {
  const {
    data: currentUser,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return null;
      }

      const response = await getCurrentUser();
      if (response.error != null) {
        throw new Error(response.error);
      }
      return response.payload;
    },
  });

  return { currentUser, isLoading, error, refetch };
}
