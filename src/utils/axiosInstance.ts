import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import config from "../config";

const { gateway } = config;

const axiosInstance = axios.create({
    baseURL: gateway,
    timeout: 10000,
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // const token = localStorage.getItem("token");

        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        // console.log("Outgoing request:", config);
        return config;
    },
    (error: AxiosError) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// 🔹 Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // console.log("Response received:", response);
        return response;
    },
    (error: AxiosError) => {
        console.error("Response Error:", error);

        if (error.response) {
            if (error.response.status === 401) {
                console.warn("Unauthorized - Redirecting to login...");
                window.location.href = "/login";
            }

            if (error.response.status === 403) {
                console.warn("Forbidden - Access Denied!");
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
