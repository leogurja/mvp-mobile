import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email obrigatório" })
    .email("Email inválido"),
  password: z
    .string({ required_error: "Senha obrigatória" })
    .min(6, "Senha deve ter ao menos 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;

export default loginSchema;
