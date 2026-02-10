import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthResponseDto } from "../data/dto/auth.dto";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

let isRefreshing = false;
let failedStack: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedStack.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedStack = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const storedData = await AsyncStorage.getItem("userData");
    let userData: AuthResponseDto | null = null;

    if (storedData) {
      try {
        userData = JSON.parse(storedData);
      } catch (e) {
        await AsyncStorage.removeItem("userData");
        return Promise.reject(e);
      }
    }

    if (!userData?.refreshToken) {
      await AsyncStorage.removeItem("userData");
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedStack.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      console.log(userData.refreshToken);
      const response = await axios.post(
        `${api.defaults.baseURL}/auth/refresh`,
        { refreshToken: userData.refreshToken },
      );

      const newToken = response.data.accessToken;
      const newRefreshToken =
        response.data.refreshToken || userData.refreshToken;

      const updatedData = {
        ...userData,
        token: newToken,
        refreshToken: newRefreshToken,
      };
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData));

      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      processQueue(null, newToken);

      return api(originalRequest);
    } catch (e) {
      processQueue(e, null);
      await AsyncStorage.removeItem("userData");
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);
