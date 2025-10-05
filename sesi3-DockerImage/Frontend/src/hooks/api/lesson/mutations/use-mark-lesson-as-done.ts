import { ToastUtils } from "@/components/utils/toast-helper";
import { MarkLessonCompletedRequest } from "@/lib/interfaces/dtos/request/mark-lesson-completed-request";
import { markLessonAsDone } from "@/services/lesson-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMarkLessonAsDone() {
  const queryClient = useQueryClient();
  const markAsDoneMutation = useMutation({
    mutationFn: async (request: MarkLessonCompletedRequest) => {
      const response = await markLessonAsDone(request);
      if (response.error != null) {
        throw new Error(
          response.error ||
            `Error marking lesson as done: ${response.statusCode}`,
        );
      }
      return response.payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseLessons"] });
      queryClient.invalidateQueries({ queryKey: ["courseDetails"] });
      ToastUtils.success({
        title: "Success!",
        description: "Successfully marked lesson as done!",
      });
    },
    onError: (error: Error) => {
      ToastUtils.error({
        title: "Error marking lesson as done!",
        description: error.message,
      });
    },
  });

  return markAsDoneMutation;
}
