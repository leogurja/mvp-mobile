"use server";

import { compare } from "bcryptjs";
import db from "../db";
import type { LoginSchema } from "../schemas/login";
import { sign } from "jsonwebtoken";
import { env } from "../env";
import { cookies } from "next/headers";
import loginSchema from "../schemas/login";

export async function login(input: LoginSchema) {
  const { email, password } = loginSchema.parse(input);
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await compare(password, user.passwordDigest);
  if (!valid) return null;

  const token = sign(
    { id: user.id, email: user.email, name: user.name },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const requestCookies = await cookies();
  requestCookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  // Retorne dados seguros do usuário e o token
  return { id: user.id, email: user.email, name: user.name, token };
}
