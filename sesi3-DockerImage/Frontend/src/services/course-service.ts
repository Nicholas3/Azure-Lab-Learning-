import apiClient from "@/lib/api/api-client";
import { CourseDetailsDTO } from "@/lib/interfaces/dtos/response/course-details-dto";

async function getCourseDetails(courseId: string) {
  return await apiClient.get<CourseDetailsDTO>(`/courses/details/${courseId}`);
}

export { getCourseDetails };
