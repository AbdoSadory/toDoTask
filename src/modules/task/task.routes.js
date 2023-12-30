import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authHandler } from '../../middlewares/authHandler.js'
import * as taskControllers from './task.controllers.js'
import * as taskDataValidationSchemas from './task.dataValidatorSchema.js'
import authorizationHandler from '../../middlewares/authorizationHandler.js'
import validationMiddleware from '../../middlewares/validationMiddleware.js'
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
  validationMiddleware(taskDataValidationSchemas.addTaskCheckSchema),
  expressAsyncHandler(taskControllers.addTask)
)
taskRouter.put(
  '/updateTask',
  authHandler(),
  validationMiddleware(taskDataValidationSchemas.updateTaskCheckSchema),
  expressAsyncHandler(taskControllers.updateTask)
)
taskRouter.put(
  '/assignTaskToUser',
  authHandler(),
  authorizationHandler('manager'),
  validationMiddleware(taskDataValidationSchemas.assignToUserCheckSchema),
  expressAsyncHandler(taskControllers.assignTaskToUser)
)

taskRouter.delete(
  '/deleteTask',
  authHandler(),
  validationMiddleware(taskDataValidationSchemas.deleteTaskCheckSchema),
  expressAsyncHandler(taskControllers.deleteTask)
)
export default taskRouter
