import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as userControllers from './user.controllers.js'
import * as userDataValidationSchemas from '../../utils/dataValidationSchemas/user.dataValidatorSchema.js'
import { authHandler } from '../../middlewares/authHandler.js'
const userRouter = Router()
/*
1-signUp
2-login --> with create token
3-change password (user must be logged in)
4-update user (age , firstName , lastName)(user must be logged in)
5-delete user(user must be logged in) 
6-soft delete(user must be logged in)
*/

userRouter.post(
  '/signUp',
  userDataValidationSchemas.signUpCheckSchema,
  expressAsyncHandler(userControllers.signUp)
)
userRouter.post(
  '/login',
  userDataValidationSchemas.loginCheckSchema,
  expressAsyncHandler(userControllers.login)
)
userRouter.put(
  '/changePassword',
  userDataValidationSchemas.changePasswordCheckSchema,
  authHandler(),
  expressAsyncHandler(userControllers.changePassword)
)
userRouter.put(
  '/updateProfile',
  userDataValidationSchemas.updateUserDataCheckSchema,
  authHandler(),
  expressAsyncHandler(userControllers.updateUser)
)
userRouter.put(
  '/deactivateAccount',
  authHandler(),
  expressAsyncHandler(userControllers.deactivateUser)
)
userRouter.delete(
  '/deleteProfile',
  authHandler(),
  expressAsyncHandler(userControllers.deleteUser)
)
export default userRouter
