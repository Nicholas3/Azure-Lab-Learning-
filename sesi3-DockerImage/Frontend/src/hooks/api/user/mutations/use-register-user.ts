import { ToastUtils } from "@/components/utils/toast-helper";
import { RegisterRequest } from "@/lib/interfaces/dtos/request/register-request";
import { User } from "@/lib/interfaces/models/user";
import { registerUser } from "@/services/user-service";
import { useMutation } from "@tanstack/react-query";

export function useRegisterUser() {
  const registerMutation = useMutation({
    mutationFn: async ({ name, email, password, role }: RegisterRequest) => {
      const response = await registerUser({ name, email, password, role });
      if (response.error != null) {
        throw new Error(
          response.error || `Error Registering User: ${response.statusCode}`,
        );
      }
      return response.payload;
    },
    onSuccess: (data: User) => {
      ToastUtils.success({
        title: "Successfully Registered User!",
        description: "User " + data.name + " has been created!",
      });
    },
    onError: (error: Error) => {
      ToastUtils.error({
        title: "Error Registering User!",
        description: error.message,
      });
    },
  });

  return registerMutation;
}
