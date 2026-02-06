import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Email inválido").max(100, "Email inválido"),

  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(64, "A senha deve ter no máximo 64 caracteres"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
