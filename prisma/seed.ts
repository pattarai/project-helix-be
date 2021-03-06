import { Prisma, PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const NUMBER_OF_USERS = 20;
const NUMBER_OF_WORKSHOPS = 10;


const workshops: Prisma.WorkshopCreateInput[] = Array.from({
  length: NUMBER_OF_WORKSHOPS,
}).map((_, i) => ({
  name: faker.random.word(),
  description: faker.lorem.words(5),
  Topic: {
    create: {
      name: faker.random.word(),
      description: faker.lorem.words(5),
      url: faker.internet.url(),
    },
  },
}));

async function main() {
  await prisma.$transaction(
    workshops.map((workshop) =>
      prisma.workshop.create({
        data: workshop,
      })
    )
  );
}

main().finally(async () => {
  await prisma.$disconnect();
});
