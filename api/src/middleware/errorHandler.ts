import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

const errorHandler = (err: Error, ctx: Context) => {
  if (err instanceof HTTPException) {
    const isStringified = isJson(err.message)
    return ctx.json(
      { error: isStringified ? JSON.parse(err.message) : err.message },
      err.status
    )
  }
  return ctx.json({ message: err.message || 'Internal Server Error' }, 500)
}

export default errorHandler

function isJson(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
