"use server";

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import {
  createUserSchema,
  type CreateUserSchema,
  type UpdateUserSchema,
} from "../schemas/user";
import { requireAuth } from "../require-auth";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export async function createUser(input: CreateUserSchema) {
  const user = await requireAuth();
  console.log(user);
  const passwordDigest = await bcrypt.hash(input.password, 10);
  const newUser = createUserSchema.parse(input);

  revalidatePath("/admin");
  return await db.user.create({
    data: {
      ...newUser,
      passwordDigest,
    },
  });
}

export async function updateUser(id: number, input: UpdateUserSchema) {
  await requireAuth();
  const updatedUser = createUserSchema.parse(input);

  revalidatePath("/admin");
  return await db.user.update({
    where: { id },
    data: updatedUser,
  });
}

export async function deleteUser(id: number) {
  await requireAuth();

  return await db.user.delete({ where: { id } });
}

export const getAllUsers = cache(async () => {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});
