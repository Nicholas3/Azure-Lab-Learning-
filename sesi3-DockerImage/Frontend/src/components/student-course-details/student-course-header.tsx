import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { CourseDetailsDTO } from "@/lib/interfaces/dtos/response/course-details-dto";
import { ArrowLeft, BookOpen, Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

interface StudentCourseHeaderProps {
  course: CourseDetailsDTO;
}

export function StudentCourseHeader({ course }: StudentCourseHeaderProps) {
  const overallProgress = (
    ((course.completedLessons + course.completedAssignments) /
      (course.lessons.length + course.Assignments.length)) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          to="/student/dashboard"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Active
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/3 space-y-4">
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">Course Progress</h3>
              <div className="flex justify-between text-sm">
                <span>{overallProgress}% Complete</span>
                <span>
                  {course.completedLessons}/{course.lessons.length} Lessons
                  {"     •     "}
                  {course.completedAssignments}/{course.Assignments.length}{" "}
                  Assignments
                </span>
              </div>
              <Progress value={Number(overallProgress)} className="h-2" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{course.teacher?.name || "Unknown instructor"}</span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>
                  {course.lessons.length}{" "}
                  {course.lessons.length === 1 ? "Lesson" : "Lessons"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {course.Assignments.length}{" "}
                  {course.Assignments.length === 1
                    ? "Assignment"
                    : "Assignments"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Estimated 6 weeks to complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">About this course</h2>
        <p className="text-muted-foreground">
          {course.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
