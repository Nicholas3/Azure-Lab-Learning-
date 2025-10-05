import React, { useState } from "react";
import { useRegisterUser } from "../api/user/mutations/use-register-user";
import { useNavigate } from "react-router-dom";
import { ToastUtils } from "@/components/utils/toast-helper";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function useRegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.password === "" ||
      formData.email === ""
    ) {
      ToastUtils.error({
        title: "Error",
        description: "Please fill in all the fields!",
      });
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { formData, handleInputChange, handleSelectChange, handleSubmit };
}
