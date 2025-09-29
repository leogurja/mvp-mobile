import { z } from "zod";

export const createUserSchema = z
  .object({
    email: z
      .string({ required_error: "Email obrigatório" })
      .email("Email inválido"),
    password: z
      .string({ required_error: "Senha obrigatória" })
      .min(6, "Senha deve ter ao menos 6 caracteres"),
    passwordConfirm: z.string({
      required_error: "Confirmação de senha obrigatória",
    }),
    name: z
      .string({ required_error: "Nome obrigatório" })
      .min(2, "Nome muito curto"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não coincidem",
  });

export const updateUserSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  name: z.string().min(2, "Nome muito curto").optional(),
  password: z.undefined({ message: "Não pode atualizar a senha aqui" }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
