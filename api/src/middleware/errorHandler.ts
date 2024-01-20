import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

const errorHandler = (err: Error, ctx: Context) => {
  if (err instanceof HTTPException) {
    return ctx.json({ error: JSON.parse(err.message) }, err.status)
  }
  return ctx.json({ message: err.message || 'Internal Server Error' }, 500)
}

export default errorHandler
