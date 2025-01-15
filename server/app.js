import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()

const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.post('/users/', async (req, res) => {
  const { username, telefone, password } = req.body
  const user = await prisma.user.create({
    data: {
      username: username,
      telefone: telefone,
      password: password
    }
  })
  res.json(user)
})

app.get('/users/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/users/:id', async (req, res) => {
  const users = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id)
    }
  })
  res.json(users)
})

app.get('/users/ByUsername/:username', async (req, res) => {
  const users = await prisma.user.findUnique({
    where: {
      username: req.params.username
    }
  })
  res.json(users)
})

app.put('/users/:id', async (req, res) => {
  const { id, username, telefone } = req.body
  const updateUser = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      username: username,
      telefone: telefone
    }
  })
  res.json(updateUser)
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.json(user)
})

app.get('/schedules', async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany({
      include: { user: true },
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar horários' });
  }
});

app.delete('/schedules/:id', async (req, res) => {
  const { id } = req.params
  const schedule = await prisma.schedule.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.json(schedule)
})

app.post('/schedules/book', async (req, res) => {
  const { userId, time } = req.body;

  try {
    const existingSchedule = await prisma.schedule.findFirst({
      where: { time },
    });

    if (existingSchedule && existingSchedule.userID) {
      return res.status(400).json({
        message: 'Horário já ocupado. Adicionado à fila de espera.',
      });
    }

    const schedule = await prisma.schedule.create({
      data: {
        time,
        userID: parseInt(userId),
      },
    });

    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao marcar o horário' });
  }
});

app.post('/waitlist', async (req, res) => {
  const { userId, time } = req.body;

  try {
    const schedule = await prisma.schedule.findFirst({
      where: { time },
    });

    if (!schedule) {
      return res.status(404).json({ message: 'Horário não encontrado' });
    }

    const waitlistEntry = await prisma.waitlist.create({
      data: {
        userID: parseInt(userId),
        scheduleId: schedule.id,
      },
    });

    res.json(waitlistEntry);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar à fila de espera' });
  }
});

export default app
