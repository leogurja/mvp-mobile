"use server";

import { compare } from "bcryptjs";
import db from "../db";
import type { LoginData } from "../schemas/login";
import { sign } from "jsonwebtoken";
import { env } from "../env";

export async function login({ email, password }: LoginData) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await compare(password, user.passwordDigest);
  if (!valid) return null;

  const token = sign(
    { id: user.id, email: user.email, name: user.name },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Retorne dados seguros do usuário e o token
  return { id: user.id, email: user.email, name: user.name, token };
}
