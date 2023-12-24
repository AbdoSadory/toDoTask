import { checkSchema } from 'express-validator'

export const addTaskCheckSchema = checkSchema(
  {
    title: { errorMessage: 'Invalid Title', notEmpty: true, isString: true },
    description: {
      errorMessage: 'Invalid Description',
      notEmpty: true,
      isString: true,
    },
    deadline: {
      errorMessage: 'Invalid deadline, it should be "YYYY-MM-DD"',
      notEmpty: true,
      isString: true,
    },
  },
  ['body']
)
export const updateTaskCheckSchema = checkSchema(
  {
    taskId: { errorMessage: 'Invalid taskId', notEmpty: true, isString: true },
    title: { errorMessage: 'Invalid Title', notEmpty: true, isString: true },
    description: {
      errorMessage: 'Invalid Description',
      notEmpty: true,
      isString: true,
    },
    status: {
      errorMessage: 'Invalid status',
      notEmpty: true,
      isString: true,
    },
    deadline: {
      errorMessage: 'Invalid deadline, it should be "YYYY-MM-DD"',
      notEmpty: true,
      isString: true,
    },
  },
  ['body']
)

export const assignToUserCheckSchema = checkSchema(
  {
    taskId: { errorMessage: 'Invalid taskId', notEmpty: true },
    AssignTo: {
      errorMessage: 'Invalid AssignTo',
      notEmpty: true,
    },
  },
  ['body']
)
export const deleteTaskCheckSchema = checkSchema(
  {
    taskId: { errorMessage: 'Invalid taskId', notEmpty: true },
  },
  ['body']
)
