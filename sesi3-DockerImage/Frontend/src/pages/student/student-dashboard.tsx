import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetUserEnrollments } from "@/hooks/api/enrollment/queries/use-get-user-enrollments";
import { DashboardHeader } from "@/components/student-dashboard/dashboard-header";
import { DashboardSummary } from "@/components/student-dashboard/dashboard-summary";
import { CourseCard } from "@/components/student-dashboard/course-card";
import { EmptyState } from "@/components/student-dashboard/dashboard-empty";
import { useGetUserUpcomingAssignments } from "@/hooks/api/assignment/queries/use-get-user-upcoming-assignments";
import useAuth from "@/hooks/context/use-auth";

export default function StudentDashboard() {
  const auth = useAuth();
  const { userEnrollments } = useGetUserEnrollments();
  const { upcomingAssignmentsCount } = useGetUserUpcomingAssignments();
  const [searchQuery, setSearchQuery] = useState("");

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!auth.currentUser) {
    return null;
  }

  const filteredEnrollments = userEnrollments?.filter(
    (enrollment) =>
      enrollment.course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      enrollment.course.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto pt-10 pb-6 space-y-8">
        <DashboardHeader user={auth.currentUser} />
        <DashboardSummary
          courseCount={userEnrollments?.length ?? 0}
          assignmentCount={upcomingAssignmentsCount?.upcomingAssignments || 0}
        />
        <div className="w-full">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Enrolled Courses
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          {filteredEnrollments && filteredEnrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnrollments?.map((enrollment) => (
                <CourseCard
                  key={enrollment.id}
                  course={enrollment.course}
                  lessonCount={enrollment.lessonCount}
                  assignmentCount={enrollment.assignmentCount}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={searchQuery ? "No courses found" : "No courses enrolled"}
              description={
                searchQuery
                  ? "Try adjusting your search query"
                  : "Enroll in courses to see them here"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
