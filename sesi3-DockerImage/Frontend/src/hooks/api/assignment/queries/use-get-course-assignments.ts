import { getCourseAssignments } from "@/services/assignment-service";
import { useQuery } from "@tanstack/react-query";

export function useGetCourseAssignments(courseId: string) {
  const {
    data: assignments,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["courseAssignments", courseId],
    queryFn: async () => {
      const response = await getCourseAssignments(courseId);
      if (response.error != null) {
        throw new Error(response.error);
      }
      return response.payload;
    },
    enabled: !!courseId,
  });

  return { assignments, isLoading, error, refetch };
}
