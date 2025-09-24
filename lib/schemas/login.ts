import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email obrigatório" })
    .email("Email inválido"),
  password: z.string({ required_error: "Senha obrigatória" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default loginSchema;
