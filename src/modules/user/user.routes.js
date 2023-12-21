import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as userControllers from './user.controllers.js'
const userRouter = Router()
/*
1-signUp
2-login --> with create token
3-change password (user must be logged in)
4-update user (age , firstName , lastName)(user must be logged in)
5-delete user(user must be logged in) 
6-soft delete(user must be logged in)
*/

userRouter.post('/signUp', expressAsyncHandler(userControllers.signUp))
export default userRouter
