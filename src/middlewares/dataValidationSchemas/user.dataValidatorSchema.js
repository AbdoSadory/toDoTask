import { checkSchema } from 'express-validator'

export const signUpCheckSchema = checkSchema(
  {
    firstName: { errorMessage: 'Invalid firstName', notEmpty: true },
    lastName: { errorMessage: 'Invalid lastName', notEmpty: true },
    age: { errorMessage: 'Invalid age', notEmpty: true, isNumeric: true },
    email: { errorMessage: 'Invalid email', notEmpty: true, isEmail: true },
    password: {
      errorMessage: 'Invalid password',
      notEmpty: true,
      isAlphanumeric: true,
      isLength: {
        options: { min: 8, max: 12 },
        errorMessage: 'Password should be betweem 8 and 12 character',
      },
    },
    gender: { errorMessage: 'Invalid gender', notEmpty: true, isString: true },
    phone: {
      errorMessage: 'Invalid phone',
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 12, max: 12 },
        errorMessage: 'phone should be 12 chars',
      },
    },
    userRole: {
      errorMessage: 'Invalid userRole',
      isEmpty: false,
    },
  },
  ['body']
)

export const loginCheckSchema = checkSchema(
  {
    email: { errorMessage: 'Invalid Email', notEmpty: true, isEmail: true },
    password: {
      errorMessage: 'Invalid password',
      notEmpty: true,
      isAlphanumeric: true,
      isLength: {
        options: { min: 8, max: 12 },
        errorMessage: 'Password should be betweem 8 and 12 character',
      },
    },
  },
  ['body']
)
export const changePasswordCheckSchema = checkSchema(
  {
    newPassword: {
      errorMessage: 'Invalid new password',
      notEmpty: true,
      isAlphanumeric: true,
      isLength: {
        options: { min: 8, max: 12 },
        errorMessage: 'Password should be betweem 8 and 12 character',
      },
    },
    oldPassword: {
      errorMessage: 'Invalid old password',
      notEmpty: true,
      isAlphanumeric: true,
      isLength: {
        options: { min: 8, max: 12 },
        errorMessage: 'Password should be betweem 8 and 12 character',
      },
    },
  },
  ['body']
)

export const updateUserDataCheckSchema = checkSchema(
  {
    firstName: { errorMessage: 'Invalid firstName', notEmpty: true },
    lastName: { errorMessage: 'Invalid lastName', notEmpty: true },
    age: { errorMessage: 'Invalid age', notEmpty: true, isNumeric: true },
  },
  ['body']
)
