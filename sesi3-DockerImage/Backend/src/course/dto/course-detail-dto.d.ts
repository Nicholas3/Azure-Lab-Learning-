import { Assignment, Course, Lesson, User } from '@prisma/client';

export interface CourseDetailDTO extends Course {
  completedLessons: number;
  completedAssignments: number;

  teacher: User | null;
  lessons: Lesson[];
  Assignments: Assignment[];
}
