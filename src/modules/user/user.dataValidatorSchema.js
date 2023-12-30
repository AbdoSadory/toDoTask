import Joi from 'joi'

export const signUpSchema = {
  body: Joi.object({
    firstName: Joi.string().trim().min(3).required(),
    lastName: Joi.string().trim().min(3).required(),
    age: Joi.number().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
    gender: Joi.string().trim().valid('male', 'female').required(),
    phone: Joi.string().trim().min(7).max(15).required(),
    userRole: Joi.string().trim().valid('manager', 'user'),
  }),
}

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
  }).with('email', 'password'),
}

export const changePasswordSchema = {
  body: Joi.object({
    newPassword: Joi.string().trim().alphanum().min(6).required(),
    oldPassword: Joi.string().trim().alphanum().min(6).required(),
  }).with('newPassword', 'oldPassword'),
}

export const updateUserDataSchema = {
  body: Joi.object({
    firstName: Joi.string().trim().min(3).required(),
    lastName: Joi.string().trim().min(3).required(),
    age: Joi.number().required(),
  }),
}
