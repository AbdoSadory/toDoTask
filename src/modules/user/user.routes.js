import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as userControllers from './user.controllers.js'
import * as userDataValidationSchemas from './user.dataValidatorSchema.js'
import { authHandler } from '../../middlewares/authHandler.js'
import validationMiddleware from '../../middlewares/validationMiddleware.js'
import uploadingFilesHandler from '../../middlewares/uploadingfilesHandler.js'
const userRouter = Router()
/*
1-signUp
2-login --> with create token
3-change password (user must be logged in)
4-update user (age , firstName , lastName)(user must be logged in)
5-delete user(user must be logged in) 
6-soft delete(user must be logged in)
7-add profile pic
*/
userRouter.get(
  '/profile',
  authHandler(),
  expressAsyncHandler(userControllers.getProfile)
)
userRouter.post(
  '/signUp',
  validationMiddleware(userDataValidationSchemas.signUpSchema),
  expressAsyncHandler(userControllers.signUp)
)
userRouter.post(
  '/login',
  validationMiddleware(userDataValidationSchemas.loginSchema),
  expressAsyncHandler(userControllers.login)
)
userRouter.put(
  '/changePassword',
  authHandler(),
  validationMiddleware(userDataValidationSchemas.changePasswordSchema),
  expressAsyncHandler(userControllers.changePassword)
)
userRouter.put(
  '/updateProfile',
  authHandler(),
  validationMiddleware(userDataValidationSchemas.updateUserDataSchema),
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

userRouter.post(
  '/addProfileImage',
  authHandler(),
  uploadingFilesHandler({ filePath: 'profileImages' }).single('profileImg'),
  expressAsyncHandler(userControllers.uploadProfileImage)
)
export default userRouter
