import Joi from 'joi'

export const addTaskCheckSchema = {
  body: Joi.object({
    title: Joi.string().trim().min(15).required(),
    description: Joi.string().trim().max(250).required(),
    deadline: Joi.date().greater('now').required(),
  }),
}
export const updateTaskCheckSchema = {
  body: Joi.object({
    taskId: Joi.string().trim().length(24).required(),
    title: Joi.string().trim().min(15).required(),
    description: Joi.string().trim().max(250).required(),
    status: Joi.string().trim().valid('toDo', 'doing', 'done').required(),
    deadline: Joi.date().greater('now').required(),
  }),
}

export const assignToUserCheckSchema = {
  body: Joi.object({
    taskId: Joi.string().trim().length(24).required(),
    AssignTo: Joi.string().trim().length(24).required(),
  }),
}
export const deleteTaskCheckSchema = {
  body: Joi.object({
    taskId: Joi.string().trim().length(24).required(),
  }),
}
