import { validationResult } from 'express-validator'
import Task from '../../../DB/models/task.model.js'
import * as dbMethods from '../../../DB/dbMethods.js'
import User from '../../../DB/models/user.model.js'

export const allTasks = async (req, res, next) => {
  /*
  Check token in middleware
  1- get tasks with their users 
  */
  const tasks = await Task.find().populate({
    path: 'userID assignTo',
    select: 'username userRole email',
  })
  if (!tasks) {
    return next(new Error('Error while getting tasks', { cause: 400 }))
  }
  res
    .status(200)
    .json({ message: 'Tasks', tasks: tasks.length ? tasks : 'No Tasks Yet' })
}
export const getUserTasks = async (req, res, next) => {
  //  User tasks (created Tasks or Assigned to him)
  const { authUser } = req
  const userTasks = await dbMethods.findDocuments(Task, {
    $or: [
      { userID: authUser._id.toString() },
      { assignTo: authUser._id.toString() },
    ],
  })
  if (!userTasks.success) {
    return next(new Error(userTasks.message, { cause: userTasks.status }))
  }

  res.status(userTasks.status).json({
    message: 'User Tasks',
    tasks: userTasks.result
      ? userTasks.result
      : "This user hasn't got any tasks yet",
  })
}
export const notDoneTasks = async (req, res, next) => {
  // 2 solutions for this API handler
  // 🟢 First: check the not done documents
  //   const tasks = await dbMethods.findDocuments(Task, { status: { $ne: 'done' } })
  //   if (!tasks.success) {
  //     return next(new Error(tasks.message, { cause: tasks.status }))
  //   }
  //   res.status(tasks.status).json({
  //     message: 'Tasks not done after deadline',
  //     tasks: tasks.result
  //       ? tasks.result
  //       : 'All Tasks are Done or no Tasks yet in Database',
  //   })
  // ========================================
  // 🟢 Second: check on specific Date which is entered by user
  const { deadline } = req.body
  const tasks = await dbMethods.findDocuments(Task, {
    deadline: { $gt: new Date(deadline) },
    status: { $ne: 'done' },
  })
  if (!tasks.success) {
    return next(new Error(tasks.message, { cause: tasks.status }))
  }
  res.status(tasks.status).json({
    message: 'Tasks not done after deadline',
    tasks: tasks.result
      ? tasks.result
      : 'All Tasks are Done or no Tasks yet in Database',
  })
}
export const addTask = async (req, res, next) => {
  /*
  1- check body data validity 
  2- create task
  */
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }
  const { authUser } = req
  const { title, description, deadline, assignTo } = req.body
  const taskObject = assignTo
    ? {
        title,
        description,
        deadline,
        userID: authUser._id.toString(),
        assignTo,
      }
    : {
        title,
        description,
        deadline,
        userID: authUser._id.toString(),
      }
  const newTask = await dbMethods.createDocument(Task, taskObject)

  if (!newTask.success) {
    return next(new Error(newTask.message, { cause: newTask.status }))
  }

  res.status(newTask.status).json({
    message: 'Task has been added successfully',
    newTask: newTask.result,
  })
}
export const updateTask = async (req, res, next) => {
  /*
  1- check body data validity 
  2- create task is existed
  3- check if user owns this task
  4- update task
  */
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }
  const { authUser } = req
  const { taskId, title, description, deadline, status } = req.body
  const isTaskExisted = await dbMethods.findByIdDocument(Task, taskId)
  if (!isTaskExisted.success) {
    return next(
      new Error(isTaskExisted.message, { cause: isTaskExisted.status })
    )
  }
  if (isTaskExisted.result.userID.toString() !== authUser._id.toString()) {
    return next(new Error('You only can update your own tasks', { cause: 400 }))
  }
  const updatedTask = await dbMethods.findByIdAndUpdateDocument(
    Task,
    { _id: taskId },
    { title, description, deadline, status }
  )
  if (!updatedTask.success) {
    return next(new Error(updatedTask.message, { cause: updatedTask.status }))
  }

  res.status(updatedTask.status).json({
    message: 'Task has been updated successfully',
    updateTask: updatedTask.result,
  })
}
export const assignTaskToUser = async (req, res, next) => {
  /*
   1-  check if user is manager (Authorization)
  2- check body data validity 
  3- create task is existed
  4- check if user who is assigned to, is existed in db.
  5- assign task to the user
  */
  const { authUser, isUserAuthorized } = req
  if (!isUserAuthorized) {
    return next(new Error('User is not authorized', { cause: 403 }))
  }
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }
  const { taskId, assignTo } = req.body
  if (!taskId || !assignTo) {
    return next(
      new Error('taskId and assignTo should not be empty strings', {
        cause: 400,
      })
    )
  }

  const isTaskExisted = await dbMethods.findByIdDocument(Task, taskId)
  if (!isTaskExisted.success) {
    return next(
      new Error(isTaskExisted.message, { cause: isTaskExisted.status })
    )
  }
  if (isTaskExisted.result.userID.toString() !== authUser._id.toString()) {
    return next(
      new Error('You only can assign your own tasks to users', { cause: 400 })
    )
  }

  const isUserExisted = await dbMethods.findByIdDocument(User, assignTo)
  if (!isUserExisted.success) {
    return next(
      new Error(isUserExisted.message, { cause: isUserExisted.status })
    )
  }

  const updatedTask = await dbMethods.findByIdAndUpdateDocument(
    Task,
    { _id: taskId },
    { assignTo }
  )
  if (!updatedTask.success) {
    return next(new Error(updatedTask.message, { cause: updatedTask.status }))
  }

  res.status(updatedTask.status).json({
    message: 'Task has been assigned successfully',
    updateTask: updatedTask.result,
  })
}
export const deleteTask = async (req, res, next) => {
  /*
  1- check body data validity 
  2- create task is existed
  3- check if user owns this task
  4- delete task
  */
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }
  const { authUser } = req
  const { taskId } = req.body
  if (!taskId) {
    return next(
      new Error('taskId should not be empty strings', {
        cause: 400,
      })
    )
  }
  const isTaskExisted = await dbMethods.findByIdDocument(Task, taskId)
  if (!isTaskExisted.success) {
    return next(
      new Error(isTaskExisted.message, { cause: isTaskExisted.status })
    )
  }
  if (isTaskExisted.result.userID.toString() !== authUser._id.toString()) {
    return next(
      new Error('You only can delete your own tasks to users', { cause: 400 })
    )
  }
  const deletedTask = await dbMethods.findByIdAndDeleteDocument(Task, taskId)
  if (!deletedTask.success) {
    return next(new Error(deletedTask.message, { cause: deletedTask.status }))
  }

  res.status(deletedTask.status).json({ message: deletedTask.message })
}
