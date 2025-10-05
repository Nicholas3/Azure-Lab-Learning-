import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourseDetails } from "@/hooks/api/course/queries/use-get-course-details";
import { useGetCourseLessons } from "@/hooks/api/lesson/queries/use-get-course-lessons";
import { useGetCourseAssignments } from "@/hooks/api/assignment/queries/use-get-course-assignments";
import { StudentCourseHeader } from "@/components/student-course-details/student-course-header";
import { LessonsSection } from "@/components/student-course-details/lessons-section";
import { AssignmentsSection } from "@/components/student-course-details/assignments-section";

export default function CourseDetailsPage() {
  const { courseId = "" } = useParams<{ courseId: string }>();
  const { courseDetails, isLoading: isLoadingCourse } =
    useGetCourseDetails(courseId);
  const { lessons, isLoading: isLoadingLessons } =
    useGetCourseLessons(courseId);
  const { assignments, isLoading: isLoadingAssignments } =
    useGetCourseAssignments(courseId);

  const isLoading = isLoadingCourse || isLoadingLessons || isLoadingAssignments;

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-64 w-full md:w-2/3" />
            <Skeleton className="h-64 w-full md:w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="text-muted-foreground mt-2">
            The course you're looking for doesn't exist or you don't have access
            to it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-16 space-y-10">
        <StudentCourseHeader course={courseDetails} />

        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            {lessons && (
              <LessonsSection lessons={lessons} courseId={courseId} />
            )}
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            {assignments && (
              <AssignmentsSection
                assignments={assignments}
                courseId={courseId}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
