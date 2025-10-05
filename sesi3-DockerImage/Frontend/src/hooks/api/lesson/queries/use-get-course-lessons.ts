import { getCourseLessons } from "@/services/lesson-service";
import { useQuery } from "@tanstack/react-query";

export function useGetCourseLessons(courseId: string) {
  const {
    data: lessons,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["courseLessons", courseId],
    queryFn: async () => {
      const response = await getCourseLessons(courseId);
      if (response.error != null) {
        throw new Error(response.error);
      }
      return response.payload;
    },
    enabled: !!courseId,
  });

  return { lessons, isLoading, error, refetch };
}
