import { z } from "zod";

const createUserSchema = z.object({
  email: z
    .string({ required_error: "Email obrigatório" })
    .email("Email inválido"),
  password: z
    .string({ required_error: "Senha obrigatória" })
    .min(6, "Senha deve ter ao menos 6 caracteres"),
  name: z
    .string({ required_error: "Nome obrigatório" })
    .min(2, "Nome muito curto"),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

export default createUserSchema;
