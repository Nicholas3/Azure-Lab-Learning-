import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, User } from "lucide-react";
import { Course } from "@/lib/interfaces/models/course";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  lessonCount: number;
  assignmentCount: number;
}

export function CourseCard({
  course,
  lessonCount,
  assignmentCount,
}: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold line-clamp-1">{course.title}</h3>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-1 mb-4">
          {course.description || "No description available"}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{course.teacher?.name || "Unknown instructor"}</span>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>
              {lessonCount || 0} {lessonCount === 1 ? "Lesson" : "Lessons"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {assignmentCount || 0}{" "}
              {assignmentCount === 1 ? "Assignment" : "Assignments"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            navigate(`/student/courses/${course.id}`);
          }}
        >
          <p>Go to Course</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
