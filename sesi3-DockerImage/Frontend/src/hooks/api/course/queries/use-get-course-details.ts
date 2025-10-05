import { getCourseDetails } from "@/services/course-service";
import { useQuery } from "@tanstack/react-query";

export function useGetCourseDetails(courseId: string) {
  const {
    data: courseDetails,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: async () => {
      const response = await getCourseDetails(courseId);
      if (response.error != null) {
        throw new Error(response.error);
      }
      return response.payload;
    },
    enabled: !!courseId,
  });

  return { courseDetails, isLoading, error, refetch };
}
