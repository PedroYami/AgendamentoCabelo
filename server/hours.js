import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const populateSchedules = async () => {
  const times = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ];

  for (const time of times) {
    await prisma.schedule.create({
      data: { time },
    });
  }

  console.log('Horários criados com sucesso!');
};

populateSchedules()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
