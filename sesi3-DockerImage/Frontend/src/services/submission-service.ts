import apiClient from "@/lib/api/api-client";
import { CreateSubmissionRequest } from "@/lib/interfaces/dtos/request/create-submission-request";
import { Submission } from "@/lib/interfaces/models/submission";

async function addSubmission(submissionData: CreateSubmissionRequest) {
  return await apiClient.post<Submission, CreateSubmissionRequest>(
    "/submission",
    submissionData,
  );
}

export { addSubmission };
