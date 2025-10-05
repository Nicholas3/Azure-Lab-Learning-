import apiClient from "@/lib/api/api-client";
import { MarkLessonCompletedRequest } from "@/lib/interfaces/dtos/request/mark-lesson-completed-request";
import { LessonDTO } from "@/lib/interfaces/dtos/response/lesson-dto";
import { CompletedLesson } from "@/lib/interfaces/models/completed-lesson";

async function getCourseLessons(courseId: string) {
  return await apiClient.get<LessonDTO[]>(`/lesson/course/${courseId}`);
}

async function markLessonAsDone(request: MarkLessonCompletedRequest) {
  return await apiClient.post<CompletedLesson, MarkLessonCompletedRequest>(
    "/completed-lesson",
    request,
  );
}

export { getCourseLessons, markLessonAsDone };
