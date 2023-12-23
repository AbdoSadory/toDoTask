import { validationResult } from 'express-validator'
import * as dbMethods from '../../../DB/dbMethods.js'
import User from '../../../DB/models/user.model.js'
import bcryptjs from 'bcryptjs'
import generateUserToken from '../../utils/generateUserToken.js'

export const getProfile = async (req, res, next) => {
  /*
  Check token in middleware
  1- get profile data 
  */
  const { authUser } = req
  const user = await dbMethods.findByIdDocument(User, authUser._id)
  if (!user.success) {
    return next(
      new Error(user.message, {
        cause: user.status,
      })
    )
  }
  res.status(user.status).json({ message: user.message, user: user.result })
}
export const signUp = async (req, res, next) => {
  /*
  1- Check on Incoming Data using express validator
  2- Check on email if it's duplicated
  3- Hashing Password
  4- Create User
  */
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }
  const { firstName, lastName, age, email, password, gender, phone, userRole } =
    req.body
  const isUserExisted = await dbMethods.findOneDocument(User, { email })
  if (isUserExisted.success) {
    return next(
      new Error('User is already existed with this Email Address', {
        cause: 400,
      })
    )
  }
  const username = firstName.trim() + ' ' + lastName.trim()
  const hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT))
  const newUser = await dbMethods.createDocument(User, {
    username,
    age,
    email,
    password: hashedPassword,
    gender,
    phone,
    userRole,
  })

  if (!newUser.success) {
    return next(new Error(newUser.message, { cause: newUser.status }))
  }

  res.status(newUser.status).json({
    message: 'User has been created successfully',
    user: newUser.result,
  })
}
export const login = async (req, res, next) => {
  /*
  1- Check on Incoming Data using express validator 
  2- Find User with email
  3- Check if incoming password doesn't match the Database hashed password
  4- Create Token
  5- Send token and profile data
  */
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }

  const { email, password } = req.body
  const user = await dbMethods.findOneDocument(User, { email })
  if (!user.success) {
    return next(
      new Error('Invalid login credentials', {
        cause: user.status,
      })
    )
  }

  const isPasswordMatched = bcryptjs.compareSync(password, user.result.password)
  if (!isPasswordMatched) {
    return next(
      new Error('Invalid login credentials', {
        cause: 401,
      })
    )
  }
  const token = generateUserToken({ id: user.result._id.toString() })
  res
    .status(user.status)
    .json({ message: user.message, user: user.result, token })
}

export const changePassword = async (req, res, next) => {
  /*
  Check token in middleware
  1- Check on Incoming Data using express validator 
  2- Check if incoming password doesn't match the Database hashed password
  3- Hashing Password
  4- update password
  */
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }
  const { newPassword, oldPassword } = req.body
  const { authUser } = req
  const isPasswordCorrect = bcryptjs.compareSync(oldPassword, authUser.password)
  if (!isPasswordCorrect) {
    return next(
      new Error("Old password doesn't match your password", { cause: 400 })
    )
  }
  const hashedNewPassword = bcryptjs.hashSync(
    newPassword,
    parseInt(process.env.SALT)
  )

  const updateUser = await dbMethods.findByIdAndUpdateDocument(
    User,
    authUser._id,
    { password: hashedNewPassword }
  )

  if (!updateUser.success) {
    return next(new Error(updateUser.message, { cause: updateUser.status }))
  }

  res
    .status(updateUser.status)
    .json({ message: updateUser.message, user: updateUser.result })
}

export const updateUser = async (req, res, next) => {
  /*
  Check token in middleware
  1- Check on Incoming Data using express validator 
  2- update user data
  */
  const result = validationResult(req)
  if (result.errors.length) {
    let errorMsgs = ''
    result.errors.forEach((element) => {
      errorMsgs += ', ' + element.msg
    })
    return next(new Error(errorMsgs, { cause: 400 }))
  }
  const { firstName, lastName, age } = req.body
  const { authUser } = req
  const username = firstName.trim() + ' ' + lastName.trim()
  const updateUser = await dbMethods.findByIdAndUpdateDocument(
    User,
    authUser._id,
    { username, age }
  )

  if (!updateUser.success) {
    return next(new Error(updateUser.message, { cause: updateUser.status }))
  }

  res
    .status(updateUser.status)
    .json({ message: updateUser.message, user: updateUser.result })
}

export const deleteUser = async (req, res, next) => {
  /*
  Check token in middleware
  1- Delete user data 
  */
  const { authUser } = req
  const deleteUser = await dbMethods.findByIdAndDeleteDocument(
    User,
    authUser._id
  )

  if (!deleteUser.success) {
    return next(new Error(deleteUser.message, { cause: deleteUser.status }))
  }

  res.status(deleteUser.status).json({ message: deleteUser.message })
}

export const deactivateUser = async (req, res, next) => {
  /*
  Check token in middleware
  1- Deactivate user data 
  */
  const { authUser } = req
  const updateUser = await dbMethods.findByIdAndUpdateDocument(
    User,
    authUser._id,
    { isDeleted: true }
  )

  if (!updateUser.success) {
    return next(new Error(updateUser.message, { cause: updateUser.status }))
  }

  res.status(updateUser.status).json({
    message:
      'Account is deactivated successfully and will be active once you login ',
  })
}
