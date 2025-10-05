import React, { useState } from "react";
import { ToastUtils } from "@/components/utils/toast-helper";
import { useLoginUser } from "../api/user/mutations/use-login-user";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface LoginFormData {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLoginUser();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      ToastUtils.error({
        title: "Error",
        description: "Please fill in all the fields!",
      });
      return;
    }

    try {
      await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      navigate("/student/dashboard");
    } catch (error) {
      ToastUtils.error({
        title: "Error logging in",
        description: String(error),
      });
    }
  };

  return { formData, handleInputChange, handleSubmit };
}
