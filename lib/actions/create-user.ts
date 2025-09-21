"use server";

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import type { CreateUserData } from "../schemas/create-user";

export default async function createUser(user: CreateUserData) {
  const passwordDigest = await bcrypt.hash(user.password, 10);

  return await db.user.create({
    data: {
      ...user,
      passwordDigest,
    },
  });
}
