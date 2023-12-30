const reqKeys = ['body', 'query', 'params', 'headers']

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    let errors = []
    for (let key of reqKeys) {
      const result = schema[key]?.validate(req[key], { abortEarly: false })
      if (result?.error) {
        errors.push(...result.error.details.map((err) => err.message))
      }
    }

    if (errors.length) {
      return res.status(400).json({
        message: 'validation error',
        errors,
      })
    }
    next()
  }
}

export default validationMiddleware
