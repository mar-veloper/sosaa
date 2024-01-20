import { Hono } from 'hono'
import Prisma from '../prisma/client'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', logger())
app.use('/api/*', cors())

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to my SoSaa API!',
  })
})

app.get('/api/products', async (c) => {
  try {
    const products = await Prisma.product.findMany()
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
})

export default {
  port: 3030,
  fetch: app.fetch,
}
