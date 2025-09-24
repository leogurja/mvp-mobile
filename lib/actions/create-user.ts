"use server";

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { createUserSchema, type CreateUserSchema } from "../schemas/user";
import { requireAuth } from "../require-auth";

export default async function createUser(input: CreateUserSchema) {
  const user = await requireAuth();
  console.log(user);
  const passwordDigest = await bcrypt.hash(input.password, 10);
  const newUser = createUserSchema.parse(input);

  return await db.user.create({
    data: {
      ...newUser,
      passwordDigest,
    },
  });
}
