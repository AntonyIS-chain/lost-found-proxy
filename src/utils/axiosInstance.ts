import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import config from "../config";
import { response } from "express";

const { gateway } = config;

const axiosInstance = axios.create({
    baseURL: gateway,
    timeout: 10000,
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// 🔹 Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized - Redirecting to login...");
        // window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
