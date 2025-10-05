import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest } from "@/lib/interfaces/dtos/request/login-request";
import { loginUser } from "@/services/user-service";
import { ToastUtils } from "@/components/utils/toast-helper";

export function useLoginUser() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginRequest) => {
      const response = await loginUser({ email, password });
      if (response.error != null) {
        throw new Error(
          response.error ||
            `Error Trying to Login User: ${response.statusCode}`,
        );
      }
      return response.payload;
    },
    onSuccess: (response: { access_token: string }) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      localStorage.setItem("accessToken", response.access_token);
      ToastUtils.success({
        title: "Login Success!",
        description: "Successfully logged in!",
      });
    },
    onError: (error: Error) => {
      ToastUtils.error({
        title: "Error Trying to Login User!",
        description: error.message,
      });
    },
  });

  return loginMutation;
}
