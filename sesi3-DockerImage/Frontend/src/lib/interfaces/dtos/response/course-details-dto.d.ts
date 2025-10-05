import type { Course } from "@/lib/interfaces/models/course";
import { Lesson } from "../../models/lesson";
import { Assignment } from "../../models/assignment";

export interface CourseDetailsDTO extends Course {
  completedLessons: number;
  completedAssignments: number;

  lessons: Lesson[];
  Assignments: Assignment[];
}
