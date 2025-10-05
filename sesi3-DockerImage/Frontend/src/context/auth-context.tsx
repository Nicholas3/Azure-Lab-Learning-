import { createContext, ReactNode } from "react";
import { User } from "../lib/interfaces/models/user";
import { useLoginUser } from "@/hooks/api/user/mutations/use-login-user";
import { useGetCurrentUser } from "@/hooks/api/user/queries/use-get-current-user";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ToastUtils } from "@/components/utils/toast-helper";

interface AuthContextType {
  currentUser: User | null | undefined;
  isLoading: boolean;
  error: Error | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { currentUser, isLoading, error } = useGetCurrentUser();
  const queryClient = useQueryClient();
  const loginMutation = useLoginUser();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({
        email,
        password,
      });
    } catch (error) {
      ToastUtils.error({
        title: "Error logging in!",
        description: String(error),
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    navigate("/");
  };

  const value = {
    currentUser,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
