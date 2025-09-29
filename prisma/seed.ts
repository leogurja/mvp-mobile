import { PointOfInterestType, PrismaClient } from "@/generated/prisma";
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

const pointsOfInterest = [
  {
    name: "Trilha suspensa",
    description: "Uma trilha que passa por pontes suspensas.",
    type: PointOfInterestType.TRAIL,
    parkId: 1,
  },
  {
    name: "Cachoeira do Escorrega",
    description: "Uma cachoeira com uma pedra lisa para escorregar.",
    type: PointOfInterestType.WATERFALL,
    parkId: 1,
  },
  {
    name: "Mirante do Dedo de Deus",
    description: "Um mirante com vista para o Dedo de Deus.",
    type: PointOfInterestType.VIEWPOINT,
    parkId: 1,
  },
  {
    name: "Pico do Caledônia",
    description: "O ponto mais alto do parque, com vista panorâmica.",
    type: PointOfInterestType.VIEWPOINT,
    parkId: 2,
  },
  {
    name: "Trilha dos Mirantes",
    description: "Trilha que leva a vários mirantes ao longo do parque.",
    type: PointOfInterestType.TRAIL,
    parkId: 2,
  },
  {
    name: "Cachoeira dos Frades",
    description: "Cachoeira popular para banho e piqueniques.",
    type: PointOfInterestType.WATERFALL,
    parkId: 2,
  },
  {
    name: "Mirante da Pedra Bonita",
    description: "Mirante com vista para a cidade de Teresópolis.",
    type: PointOfInterestType.VIEWPOINT,
    parkId: 3,
  },
  {
    name: "Trilha do Açude",
    description: "Trilha que leva a um antigo açude no parque.",
    type: PointOfInterestType.TRAIL,
    parkId: 3,
  },
  {
    name: "Cachoeira do Imbuí",
    description: "Cachoeira tranquila, ideal para relaxar.",
    type: PointOfInterestType.WATERFALL,
    parkId: 3,
  },
  {
    name: "Pico do Açu",
    description: "Segundo ponto mais alto do estado do Rio de Janeiro.",
    type: PointOfInterestType.CAMPSITE,
    parkId: 3,
  },
  {
    name: "Mirante do Soberbo",
    description: "Mirante com vista para o vale.",
    type: PointOfInterestType.VIEWPOINT,
    parkId: 3,
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

  for (const poi of pointsOfInterest) {
    promises.push(
      prisma.pointOfInterest.upsert({
        where: { name_parkId: { name: poi.name, parkId: poi.parkId } },
        update: {},
        create: poi,
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
