import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    email: "admin@admin.com",
    name: "Admin",
    password: "admin",
  },
];

const parks = [
  {
    name: "Parque Nacional da Serra dos Órgãos",
    description:
      "Famoso pelas trilhas, cachoeiras e montanhas icônicas como o Dedo de Deus.",
  },
  {
    name: "Parque Estadual dos Três Picos",
    description:
      "Maior parque estadual do RJ, com picos, vales e rica biodiversidade.",
  },
  {
    name: "Parque Natural Municipal Montanhas de Teresópolis",
    description:
      "Área de proteção municipal com trilhas, mirantes e natureza preservada.",
  },
];

async function main() {
  const promises: Promise<unknown>[] = [];

  for (const user of users) {
    promises.push(
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          name: user.name,
          passwordDigest: bcrypt.hashSync(user.password, 10),
        },
      })
    );
  }

  for (const park of parks) {
    promises.push(
      prisma.park.upsert({
        where: { name: park.name },
        update: {},
        create: park,
      })
    );
  }

  await Promise.all(promises);
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
