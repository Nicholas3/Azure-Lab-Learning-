import { Course } from '@prisma/client';

export interface EnrollmentDTO {
  id: number;
  studentId: number;
  courseId: number;
  course: Course;
  lessonCount: number;
  assignmentCount: number;
}
