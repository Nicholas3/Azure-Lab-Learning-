import axios, { AxiosError } from "axios";
import { Response } from "../interfaces/dtos/response/response";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log(
        "No token found, sending request without Authorization header.",
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Token might be invalid or expired.");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

async function get<T>(url: string): Promise<Response<T>> {
  try {
    const response = await axiosInstance.get<T>(url);
    return {
      statusCode: response.status,
      payload: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);

    return {
      statusCode: axiosError.status || 500,
      payload: {} as T,
      error: String(axiosError.message) || "Unknown error occurred",
    };
  }
}

async function post<T, U>(url: string, data: U): Promise<Response<T>> {
  try {
    const response = await axiosInstance.post<T>(url, data);
    return {
      statusCode: response.status,
      payload: response.data,
    };
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError;

    return {
      statusCode: axiosError.status || 500,
      payload: {} as T,
      error: String(axiosError.message) || "Unknown error occurred",
    };
  }
}

const apiClient = { get, post };

export default apiClient;
