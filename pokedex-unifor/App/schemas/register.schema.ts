import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(80, "Nome muito longo"),

    email: z.email("Email inválido").max(100, "Email inválido"),

    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .max(64, "A senha deve ter no máximo 64 caracteres"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;
