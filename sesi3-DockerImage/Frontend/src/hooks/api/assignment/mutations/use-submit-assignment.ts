import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastUtils } from "@/components/utils/toast-helper";
import { addSubmission } from "@/services/submission-service";
import { CreateSubmissionRequest } from "@/lib/interfaces/dtos/request/create-submission-request";

export function useSubmitAssignment() {
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async ({ data }: { data: CreateSubmissionRequest }) => {
      const response = await addSubmission(data);
      if (response.error != null) {
        throw new Error(
          response.error ||
            `Error submitting assignment: ${response.statusCode}`,
        );
      }
      return response.payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseAssignments"] });
      queryClient.invalidateQueries({ queryKey: ["courseDetails"] });
      ToastUtils.success({
        title: "Assignment Submitted",
        description: "Your assignment has been submitted successfully!",
      });
    },
    onError: (error: Error) => {
      ToastUtils.error({
        title: "Error Submitting Assignment",
        description: error.message,
      });
    },
  });

  return submitMutation;
}
