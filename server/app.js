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
      id: id
    }
  })
  res.json(user)
})

export default app
