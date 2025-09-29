"use client";

import { updateUser } from "@/lib/services/user";
import { updateUserSchema, type UpdateUserSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../atoms/button";
import * as Dialog from "../../atoms/dialog";
import { useState, type ReactNode } from "react";
import Form from "../../atoms/form";
import { Input } from "../../atoms/input";

interface UpdateUserFormProps {
  children: ReactNode;
  user: UpdateUserSchema & { id: number };
}

export default function UpdateUserForm({
  user,
  children,
}: UpdateUserFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
    defaultValues: {
      ...user,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    await updateUser(user.id, data);

    setOpen(false);
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Atualizar Usuário</Dialog.Title>
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
