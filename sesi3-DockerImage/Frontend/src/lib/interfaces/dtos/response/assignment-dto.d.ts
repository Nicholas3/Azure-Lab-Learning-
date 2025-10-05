import { Assignment } from "../../models/assignment";

export interface AssignmentDTO extends Assignment {
  submission?: Submission;
  status: "pending" | "submitted" | "graded";
}
