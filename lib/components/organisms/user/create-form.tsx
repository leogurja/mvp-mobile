"use client";

import { createUser } from "@/lib/services/user";
import { createUserSchema, type CreateUserSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../atoms/button";
import * as Dialog from "../../atoms/dialog";
import { useState, type ReactNode } from "react";
import Form from "../../atoms/form";
import { Input } from "../../atoms/input";
import Textarea from "../../atoms/textarea";

interface CreateUserFormProps {
  children: ReactNode;
}

export default function CreateUserForm({ children }: CreateUserFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    await createUser(data);

    setOpen(false);
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Criar Novo Usuário</Dialog.Title>
        </Dialog.Header>
        <Form.Root {...form} onSubmit={onSubmit}>
          <div className="flex flex-col items-center gap-4 py-4">
            <Form.Field
              name="name"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control>
                    <Input placeholder="Nome" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="email"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Input type="email" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="password"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control>
                    <Input placeholder="Senha" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="passwordConfirmation"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control>
                    <Textarea placeholder="Confirmar senha" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Button
              type="reset"
              onClick={() => setOpen(false)}
              variant="ghost"
              className="w-full"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="default" className="w-full">
              Salvar usuário
            </Button>
          </div>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
