import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import dedent from "dedent";

const prisma = new PrismaClient();

const users = [
  {
    email: "admin@admin.com",
    name: "Admin",
    password: "admin",
  },
];

const pointOfInterestTypes = [
  {
    singular: "Trilha",
    plural: "Trilhas",
  },
  {
    singular: "Cachoeira",
    plural: "Cachoeiras",
  },
  {
    singular: "Mirante",
    plural: "Mirantes",
  },
  {
    singular: "Camping",
    plural: "Campings",
  },
  {
    singular: "Montanha",
    plural: "Montanhas",
  },
  {
    singular: "Poço",
    plural: "Poços",
  },
];

const parks = [
  {
    imageUrl: "/images/serra-dos-orgaos.jpg",
    name: "Parque Nacional da Serra dos Órgãos",
    description:
      "Famoso pelas trilhas, cachoeiras e montanhas icônicas como o Dedo de Deus.",
    biodiversity: dedent`
      O clima é super-úmido tropical, com 80% a 90% de umidade relativa causada pelo ar úmido do Atlântico a maior parte do ano.
      As temperaturas médias variam de 13 a 23°C, mas podem chegar a 38°C e podem cair abaixo de zero nas partes mais altas do parque.
      A precipitação média é de 1.700 a 3.600 milímetros, com mais chuvas no verão (dezembro a março) e uma estação seca no inverno, de junho a agosto.
      O lado sudeste voltado para o oceano recebe mais chuva que o lado noroeste.

      O parque está no bioma da Mata Atlântica e, devido à alta pluviosidade, possui rica vegetação, grande parte exclusiva desse bioma.
      Mais de 2.800 espécies de plantas foram registradas, incluindo 360 de orquídeas e mais de 100 bromélias. 
      Até 500 metros, as encostas mais baixas são cobertas por floresta típica de terras baixas. De 500 a 1.500 metros a vegetação é floresta montana, 
      com variações significativas dependendo das condições em cada área. Em muitos lugares, o dossel superior é de 25 a 30 metros, com árvores emergentes atingindo até 40 metros. 
      De 1.500 a 2.000 metros, há uma floresta com árvores de 5 a 10 metros e com troncos tortos cobertos de musgo epifítico, além de plantas como bromélias e orquídeas. 
      O sub-bosque tem arbustos e os afloramentos são povoados por samambaias e musgos. Existem várias espécies endêmicas. Acima de 2.000 metros a vegetação é de alta montanha, 
      com campos abertos e pequenos arbustos lenhosos. 347 espécies foram encontradas neste ambiente, das quais 66 são endêmicas para este ecossistema.
      O parque é um dos poucos habitats naturais de espécies de Schlumbergera, que foram desenvolvidas em coloridos cactos amplamente cultivadas como plantas da casa.
    `,
  },
  {
    imageUrl: "/images/tres-picos.jpg",
    name: "Parque Estadual dos Três Picos",
    description:
      "Maior parque estadual do RJ, com picos, vales e rica biodiversidade.",
    biodiversity: dedent`
      A criação do parque representou um acréscimo de 75% em toda a área protegida por parques e reservas estaduais,
      visando preservar o cinturão central de Mata Atlântica do Estado do Rio de Janeiro,
      que já perdeu cerca de 83% de sua cobertura florestal original. Em suas densas matas foram detectados os mais elevados índices de biodiversidade em todo o Estado,
      isto é, a maior variedade de espécies animais e vegetais em uma dada unidade de área, sendo por isso considerada uma região da mais elevada prioridade,
      em termos de conservação, pelos especialistas.

      Muitas espécies ameaçadas, especialmente grandes mamíferos como o puma ou onça-parda, porco-do-mato,
      o Muriqui-do-sul a lontra e a jaguatirica ou aves como o gavião-pega-macaco, aqui encontram refúgio,
      pois o Parque Estadual forma um extenso contínuo florestal com o Parque Nacional da Serra dos Órgãos e com a Estação Ecológica do Paraíso,
      em Guapimirim. Sem o estabelecimento de tais contínuos de vegetação, populações isoladas destas e de outras espécies entram em inevitável declínio,
      devido aos cruzamentos entre parentes próximos. Já a onça pintada desapareceu ao longo do século XX,
      porém um projeto em desenvolvimento pela UFRJ pretende reintroduzir esta espécie no parque.
    `,
  },
  {
    imageUrl: "/images/montanhas.jpg",
    name: "Parque Natural Municipal Montanhas de Teresópolis",
    description:
      "Área de proteção municipal com trilhas, mirantes e natureza preservada.",
    biodiversity: dedent`
      O Parque Natural Municipal Montanhas de Teresópolis está situado na parte noroeste do município de Teresópolis,
      limitando-se com os municípios de Petrópolis e São José do Vale do Rio Preto.
      Possui uma área de 4 397 hectares, sendo a maior unidade de conservação municipal totalmente protegida do estado do Rio de Janeiro.
      Ao longo de sua extensão, estão localizadas as bacias hidrológicas dos rios Piabanha, Preto e Paquequer.
      O parque contém uma imponente cordilheira que contém grandes afloramentos rochosos como a Tartaruga, Camelo e Santana.
      O parque faz limite com o Parque Nacional da Serra dos Órgãos na Barragem do Caleme.
    `,
  },
];

const pointsOfInterest = [
  // Parque Nacional da Serra dos Órgãos
  {
    name: "Travessia Petrópolis-Teresópolis",
    description:
      "A mais famosa, uma caminhada de três dias que atravessa o parque, oferecendo paisagens incríveis, mas exige preparo físico.",
    typeId: 1,
    parkId: 1,
  },
  {
    name: "Trilha Suspensa",
    description:
      "Uma opção mais leve e acessível, inclusive para pessoas com deficiência, com banquinhos para descanso.",
    typeId: 1,
    parkId: 1,
  },
  {
    name: "Trilha da Primavera",
    description:
      "Trilha curta e fácil, ideal para famílias, com várias cachoeiras ao longo do caminho.",
    typeId: 1,
    parkId: 1,
  },
  {
    name: "Cachoeira do Escorrega",
    description: "Uma cachoeira com uma pedra lisa para escorregar.",
    typeId: 2,
    parkId: 1,
  },
  {
    name: "Circuito das Bromélias",
    description: "Trilha que passa por áreas ricas em bromélias.",
    typeId: 1,
    parkId: 1,
  },
  {
    name: "Cachoeira Véu da Noiva",
    description:
      "Uma queda d'água com 32 metros de altura, ideal para a prática de esportes e um visual espetacular.",
    typeId: 2,
    parkId: 1,
  },
  {
    name: "Poço Verde",
    description: "Um poço natural para banho, cercado por vegetação.",
    typeId: 6,
    parkId: 1,
  },
  {
    name: "Poço do Sossego",
    description: "Outro poço natural, conhecido por sua água cristalina.",
    typeId: 6,
    parkId: 1,
  },
  {
    name: "Poço da Preguiça",
    description: "Poço tranquilo, ideal para relaxar.",
    typeId: 6,
    parkId: 1,
  },
  {
    name: "Dedo de Deus",
    description: "O pico mais famoso do parque, com 1.692 metros de altura.",
    typeId: 5,
    parkId: 1,
  },
  {
    name: "Mirante do Dedo de Deus",
    description: "Um mirante com vista para o Dedo de Deus.",
    typeId: 3,
    parkId: 1,
  },
  // Parque Estadual dos Três Picos
  {
    name: "Vale dos Deuses",
    description: "Trilha que passa por formações rochosas impressionantes.",
    typeId: 1,
    parkId: 2,
  },
  {
    name: "Cabeça do Dragão",
    description:
      "Um mirante natural que oferece uma vista panorâmica das formações rochosas, com uma caminhada que pode levar cerca de quatro horas.",
    typeId: 3,
    parkId: 2,
  },
  {
    name: "Torres de Bonsucesso",
    description:
      'Um conjunto de montanhas com nomes como Torre Maior, Torre Central e o "Ferro de Passar Roupa".',
    typeId: 5,
    parkId: 2,
  },
  {
    name: "Caixa de Fósforo",
    description:
      "Uma formação rochosa única, com um trecho que pode ser ascendido com auxílio de equipamento de segurança para ter uma visão privilegiada do Vale dos Deuses.",
    typeId: 3,
    parkId: 2,
  },
  {
    name: "Pico do Caledônia",
    description: "O ponto mais alto do parque, com vista panorâmica.",
    typeId: 5,
    parkId: 2,
  },
  {
    name: "Trilha dos Mirantes",
    description: "Trilha que leva a vários mirantes ao longo do parque.",
    typeId: 1,
    parkId: 2,
  },
  {
    name: "Cachoeira dos Frades",
    description: "Cachoeira popular para banho e piqueniques.",
    typeId: 2,
    parkId: 2,
  },
  {
    name: "Mirante da Pedra Bonita",
    description: "Mirante com vista para a cidade de Teresópolis.",
    typeId: 3,
    parkId: 3,
  },
  {
    name: "Trilha do Açude",
    description: "Trilha que leva a um antigo açude no parque.",
    typeId: 1,
    parkId: 3,
  },
  {
    name: "Cachoeira do Imbuí",
    description: "Cachoeira tranquila, ideal para relaxar.",
    typeId: 2,
    parkId: 3,
  },
  {
    name: "Pico do Açu",
    description: "Segundo ponto mais alto do estado do Rio de Janeiro.",
    typeId: 4,
    parkId: 3,
  },
  {
    name: "Mirante do Soberbo",
    description: "Mirante com vista para o vale.",
    typeId: 3,
    parkId: 3,
  },
];

async function main() {
  const promises: Promise<unknown>[] = [];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        passwordDigest: bcrypt.hashSync(user.password, 10),
      },
    });
  }

  for (const park of parks) {
    await prisma.park.upsert({
      where: { name: park.name },
      update: {},
      create: park,
    });
  }

  for (const type of pointOfInterestTypes) {
    await prisma.pointOfInterestType.upsert({
      where: { singular: type.singular },
      update: {},
      create: type,
    });
  }

  await Promise.all(promises);

  for (const poi of pointsOfInterest) {
    await prisma.pointOfInterest.upsert({
      where: { name_parkId: { name: poi.name, parkId: poi.parkId } },
      update: {},
      create: poi,
    });
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
