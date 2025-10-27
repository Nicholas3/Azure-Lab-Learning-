import { Assignment, Submission } from '@prisma/client';

export interface AssignmentDTO extends Omit<Assignment, 'submissions'> {
  submission?: Submission;
  status: 'pending' | 'submitted' | 'graded';
}
