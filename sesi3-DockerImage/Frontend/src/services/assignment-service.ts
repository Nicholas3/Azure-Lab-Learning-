import apiClient from "@/lib/api/api-client";
import { AssignmentDTO } from "@/lib/interfaces/dtos/response/assignment-dto";
import { UpcomingAssignmentsDTO } from "@/lib/interfaces/dtos/response/upcoming-assignments-dto";

async function getUpcomingAssignments() {
  return await apiClient.get<UpcomingAssignmentsDTO>(
    "/assignment/my-upcoming-assignments",
  );
}

async function getCourseAssignments(courseId: string) {
  return await apiClient.get<AssignmentDTO[]>(
    `assignment/my-course-assignments/${courseId}`,
  );
}

export { getUpcomingAssignments, getCourseAssignments };
