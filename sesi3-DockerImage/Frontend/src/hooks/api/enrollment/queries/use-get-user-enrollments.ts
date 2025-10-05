import { getUserEnrollments } from "@/services/enrollment-service";
import { useQuery } from "@tanstack/react-query";

export function useGetUserEnrollments() {
  const {
    data: userEnrollments,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userEnrollments"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return null;
      }

      const response = await getUserEnrollments();
      if (response.error != null) {
        throw new Error(response.error);
      }
      return response.payload;
    },
  });

  return { userEnrollments, isLoading, error, refetch };
}
