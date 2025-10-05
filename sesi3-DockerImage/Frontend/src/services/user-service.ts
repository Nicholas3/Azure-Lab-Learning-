import apiClient from "@/lib/api/api-client";
import { LoginRequest } from "@/lib/interfaces/dtos/request/login-request";
import { RegisterRequest } from "@/lib/interfaces/dtos/request/register-request";
import { User } from "@/lib/interfaces/models/user";

async function getUsers() {
  return await apiClient.get<User[]>("/users");
}

async function registerUser(userData: RegisterRequest) {
  return await apiClient.post<User, RegisterRequest>(
    "/users/register",
    userData,
  );
}

async function loginUser(userData: LoginRequest) {
  return await apiClient.post<{ access_token: string }, LoginRequest>(
    "/auth/login",
    userData,
  );
}

async function getCurrentUser() {
  return await apiClient.get<User>("/users/current");
}

export { getUsers, registerUser, loginUser, getCurrentUser };
