import db from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const [name, email, password] = process.argv.slice(2);

  if (!name || !email || !password) {
    console.error("Usage: ts-node create-user.ts <name> <email> <password>");
    process.exit(1);
  }

  const passwordDigest = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    console.error("Erro: Usuário com este email já existe.");
    process.exit(1);
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      passwordDigest,
    },
  });

  console.log("Usuário criado:", user);
}

await main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
