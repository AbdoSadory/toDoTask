export const authorizationHandler = (...userRole) => {
  /*
  checking the userRole of the authUser if he's authorized to request the api
  */
  return async (req, res, next) => {
    const { authUser } = req
    // console.log(userRole.includes(authUser.userRole))
    const isUserAuthorizer = userRole.includes(authUser.userRole)

    if (!isUserAuthorizer) {
      return next(new Error('This user is not Authorized', { cause: 403 }))
    }
    req.isUserAuthorized = true // for more security
    next()
  }
}

export default authorizationHandler
