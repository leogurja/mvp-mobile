import { PrismaClient } from "@/generated/prisma";
import "server-only";

const db = new PrismaClient();

export default db;
