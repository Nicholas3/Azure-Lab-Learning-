import { getUpcomingAssignments } from "@/services/assignment-service";
import { useQuery } from "@tanstack/react-query";

export function useGetUserUpcomingAssignments() {
  const {
    data: upcomingAssignmentsCount,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["upcomingAssignments"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return null;
      }

      const response = await getUpcomingAssignments();
      if (response.error != null) {
        throw new Error(response.error);
      }
      return response.payload;
    },
  });

  return { upcomingAssignmentsCount, isLoading, error, refetch };
}
