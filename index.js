import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import userRouter from './src/modules/user/user.routes.js'
import db_connection from './DB/connection.js'
import globalErrorHandler from './src/middlewares/globalErrorHandler.js'
import taskRouter from './src/modules/task/task.routes.js'
import path from 'path'

config()

const app = express()

db_connection()
const corsOptions = { origin: '*' }

app.use(cors(corsOptions), express.json())
app.use('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome To ToDo Tasks APP APIs' })
})
app.use('/static', express.static(path.resolve('src/uploads')))
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.use('*', (req, res, next) => {
  res.status(400).json({ message: 'Invalid URL' })
})

app.use(globalErrorHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is on Port 3000 🔥🔥🔥🔥')
})
