"use client";

import { login } from "@/lib/services/login";
import Button from "@/lib/components/atoms/button";
import Form from "@/lib/components/atoms/form";
import { Input } from "@/lib/components/atoms/input";
import loginSchema, { type LoginSchema } from "@/lib/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema) => {
    const res = await login(data);
    if (!res) {
      form.setError("password", { message: "Email ou senha inválidos" });
      return;
    }

    router.replace("/admin");
  };

  return (
    <main className="max-w-xl mx-auto flex flex-col items-center">
      <Form.Root
        {...form}
        className="grid gap-4 py-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form.Field
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Login</Form.Label>
              <Form.Control>
                <Input placeholder="Login" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
          name="email"
          control={form.control}
        />
        <Form.Field
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Senha</Form.Label>
              <Form.Control>
                <Input
                  type="password"
                  placeholder="Senha"
                  autoComplete="current-password"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
          name="password"
          control={form.control}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant="default"
        >
          Entrar
        </Button>
      </Form.Root>
    </main>
  );
}
