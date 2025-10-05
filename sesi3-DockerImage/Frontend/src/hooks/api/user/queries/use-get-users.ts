import { getUsers } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getUsers();
      if (response.error != null) {
        console.log(response.error);
        return null;
      }
      return response.payload;
    },
  });

  return { users, isLoading, error, refetch };
}
