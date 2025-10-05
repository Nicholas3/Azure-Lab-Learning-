import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitAssignment } from "@/hooks/api/assignment/mutations/use-submit-assignment";
import type { AssignmentDTO } from "@/lib/interfaces/dtos/response/assignment-dto";
import { CalendarClock, CheckCircle, Clock, FileText } from "lucide-react";
import { useState } from "react";

interface AssignmentsSectionProps {
  assignments: AssignmentDTO[];
  courseId: string;
}

export function AssignmentsSection({ assignments }: AssignmentsSectionProps) {
  const [activeAssignment, setActiveAssignment] =
    useState<AssignmentDTO | null>(null);
  const [submissionContent, setSubmissionContent] = useState("");
  const submitMutation = useSubmitAssignment();

  const handleSubmit = () => {
    if (!activeAssignment) return;

    submitMutation.mutate(
      {
        data: { assignmentId: activeAssignment.id, submissionContent },
      },
      {
        onSuccess: () => {
          setActiveAssignment(null);
          setSubmissionContent("");
        },
      },
    );
  };

  const formatDueDate = (date: Date | null) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="text-orange-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" /> Not submitted
          </span>
        );
      case "submitted":
        return (
          <span className="text-blue-500 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" /> Submitted
          </span>
        );
      case "graded":
        return (
          <span className="text-green-600 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" /> Graded
          </span>
        );
      default:
        return <span className="text-muted-foreground">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Assignments</h2>

      {activeAssignment ? (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setActiveAssignment(null)}
            className="mb-2"
          >
            Back to assignments
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>{activeAssignment.title}</CardTitle>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <CalendarClock className="h-4 w-4 mr-1" />
                Due: {formatDueDate(activeAssignment.dueDate)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <p className="text-muted-foreground">
                  {activeAssignment.description || "No instructions provided."}
                </p>
              </div>

              {activeAssignment.status === "graded" &&
              activeAssignment.submission ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Your Submission</h3>
                    <p className="text-muted-foreground border p-3 rounded-md bg-muted/50">
                      {activeAssignment.submission.submissionContent}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Grade</h3>
                    <p className="font-semibold">
                      {activeAssignment.submission.grade}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Feedback</h3>
                    <p className="text-muted-foreground">
                      {activeAssignment.submission.feedback ||
                        "No feedback provided yet."}
                    </p>
                  </div>
                </div>
              ) : activeAssignment.status === "submitted" &&
                activeAssignment.submission ? (
                <div>
                  <h3 className="font-medium mb-2">Your Submission</h3>
                  <p className="text-muted-foreground border p-3 rounded-md bg-muted/50">
                    {activeAssignment.submission.submissionContent}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Submitted on{" "}
                    {new Date(
                      activeAssignment.submission.submittedAt,
                    ).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium mb-2">Your Submission</h3>
                  <Textarea
                    placeholder="Type your assignment submission here..."
                    className="min-h-[200px]"
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
            {activeAssignment.status === "pending" && (
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    !submissionContent.trim() || submitMutation.isPending
                  }
                  className="w-full"
                >
                  {submitMutation.isPending
                    ? "Submitting..."
                    : "Submit Assignment"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      ) : (
        <div className="space-y-2">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <Card
                key={assignment.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setActiveAssignment(assignment)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Due: {formatDueDate(assignment.dueDate)}
                      </p>
                    </div>
                  </div>
                  <div>{getStatusBadge(assignment.status)}</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No assignments available for this course.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
