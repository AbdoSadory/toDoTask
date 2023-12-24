import express from 'express'
import { config } from 'dotenv'
import userRouter from './src/modules/user/user.routes.js'
import db_connection from './DB/connection.js'
import globalErrorHandler from './src/middlewares/globalErrorHandler.js'
import taskRouter from './src/modules/task/task.routes.js'
config()
const app = express()
db_connection()
app.use(express.json())

app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.use('*', (req, res, next) => {
  res.status(400).json({ message: 'Invalid URL' })
})

app.use(globalErrorHandler)

app.listen(process.env.PORT, () => {
  console.log('Server is on Port 3000 🔥🔥🔥🔥')
})
