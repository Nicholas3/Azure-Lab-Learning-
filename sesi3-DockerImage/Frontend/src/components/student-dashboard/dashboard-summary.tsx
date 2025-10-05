import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, Clock } from "lucide-react";

interface DashboardSummaryProps {
  courseCount: number;
  assignmentCount: number;
}

export function DashboardSummary({
  courseCount,
  assignmentCount,
}: DashboardSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center gap-4 px-6 py-1">
          <div className="rounded-full bg-primary/10 p-3">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Enrolled Courses
            </p>
            <h3 className="text-2xl font-bold">{courseCount}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 px-6 py-1">
          <div className="rounded-full bg-orange-500/10 p-3">
            <Calendar className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Upcoming Assignments
            </p>
            <h3 className="text-2xl font-bold">{assignmentCount}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 px-6 py-1">
          <div className="rounded-full bg-green-500/10 p-3">
            <Clock className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Hours This Week
            </p>
            <h3 className="text-2xl font-bold">12.5</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
