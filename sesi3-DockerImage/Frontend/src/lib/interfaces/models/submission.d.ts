export interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  submissionContent: string | null;
  submittedAt: Date;
  grade: string | null;
  feedback: string | null;
}
