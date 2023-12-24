import jwt from 'jsonwebtoken'
import { findByIdDocument } from '../../DB/dbMethods.js'
import User from '../../DB/models/user.model.js'

export const authHandler = () => {
  return async (req, res, next) => {
    // TOKEN_PREFIX
    try {
      const { accesstoken } = req.headers
      if (!accesstoken)
        return next(new Error('You have to login', { cause: 400 }))

      if (!accesstoken.startsWith(process.env.TOKEN_PREFIX))
        return next(new Error('invalid token prefix', { cause: 401 }))

      const token = accesstoken.split(process.env.TOKEN_PREFIX)[1]

      const decodedData = jwt.verify(token, process.env.TOKEN_SECRET_CODE)

      if (!decodedData || !decodedData.id)
        return next(new Error('invalid token payload', { cause: 401 }))

      const findUser = await findByIdDocument(User, decodedData.id)
      if (!findUser.success)
        return next(
          new Error('please signUp first, no user by this id', {
            cause: findUser.status,
          })
        )

      req.authUser = findUser.result
      next()
    } catch (error) {
      next(new Error('catch error in auth middleware', { cause: 500 }))
    }
  }
}
