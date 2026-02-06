import type { AuthResponseDto } from "../../data/dto/auth.dto";
import type { UserResponseDto } from "../../data/dto/user.dto";
import type { LoginFormData } from "../../schemas/login.schema";
import type { RegisterFormData } from "../../schemas/register.schema";
import { api } from "../client";

export const loginService = async (
  loginFormData: LoginFormData,
): Promise<AuthResponseDto> => {
  try {
    const response = await api.post("/auth/login", {
      email: loginFormData.email,
      password: loginFormData.password,
    });
    return response.data;
  } catch (e) {
    console.error(
      "Erro ao fazer login",
      e instanceof Error ? e.message : "Unknown Error",
    );
    throw e;
  }
};

export const registerService = async (
  registerFormData: RegisterFormData,
): Promise<AuthResponseDto> => {
  try {
    const response = await api.post("/auth/register", {
      name: registerFormData.name,
      email: registerFormData.email,
      password: registerFormData.password,
    });
    return response.data;
  } catch (e) {
    console.error(
      "Erro ao registrar:",
      e instanceof Error ? e.message : "Unknown Error",
    );
    throw e;
  }
};

export const refreshService = async (
  refreshToken: string,
): Promise<AuthResponseDto> => {
  try {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  } catch (e) {
    console.error(
      "Erro ao capturar refresh token:",
      e instanceof Error ? e.message : "Unknown Error",
    );
    throw e;
  }
};

export const getMe = async (): Promise<UserResponseDto> => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (e) {
    console.error(
      "Erro ao pegar informações do usuário:",
      e instanceof Error ? e.message : "Unknown Error",
    );
    throw e;
  }
};
