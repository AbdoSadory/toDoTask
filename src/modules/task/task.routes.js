import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authHandler } from '../../middlewares/authHandler.js'
import * as taskControllers from './task.controllers.js'
import * as taskDataValidationSchemas from '../../utils/dataValidationSchemas/task.dataValidatorSchema.js'
import authorizationHandler from '../../middlewares/authorizationHandler.js'
const taskRouter = Router()

taskRouter.get('/allTasks', expressAsyncHandler(taskControllers.allTasks))
taskRouter.get(
  '/userTasks',
  authHandler(),
  expressAsyncHandler(taskControllers.getUserTasks)
)
taskRouter.get(
  '/notDoneTasks',
  expressAsyncHandler(taskControllers.notDoneTasks)
)
taskRouter.post(
  '/addTask',
  authHandler(),
  taskDataValidationSchemas.addTaskCheckSchema,
  expressAsyncHandler(taskControllers.addTask)
)
taskRouter.put(
  '/updateTask',
  authHandler(),
  taskDataValidationSchemas.updateTaskCheckSchema,
  expressAsyncHandler(taskControllers.updateTask)
)
taskRouter.put(
  '/assignTaskToUser',
  authHandler(),
  authorizationHandler('manager'),
  taskDataValidationSchemas.assignToUserCheckSchema,
  expressAsyncHandler(taskControllers.assignTaskToUser)
)

taskRouter.delete(
  '/deleteTask',
  authHandler(),
  taskDataValidationSchemas.deleteTaskCheckSchema,
  expressAsyncHandler(taskControllers.deleteTask)
)
export default taskRouter
