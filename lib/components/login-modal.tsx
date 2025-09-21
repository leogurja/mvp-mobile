"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { login } from "../actions/login";
import { InputWithLabel } from "./ui-element/input-with-label";
import Button from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { LoginData } from "../schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../schemas/login";
import { useState } from "react";
import { useAuth } from "./auth-provider";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const { setToken } = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const res = await login(data);
    if (!res) {
      setError("password", { message: "Email ou senha inválidos" });
    } else {
      void cookieStore.set("token", res.token);
      setToken(res.token);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <InputWithLabel
            label="Email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputWithLabel
            label="Senha"
            placeholder="Senha"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit" disabled={isSubmitting} variant="default">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
