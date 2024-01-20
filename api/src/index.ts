import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import products from './products/products.route'
import errorHandler from './middleware/errorHandler'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

app.use('*', logger(), prettyJSON())
app.use('/api/*', cors())

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to my SoSaa API!',
  })
})

app.route('/api', products)

app.notFound((ctx) => ctx.json({ message: 'Not Found' }, 404))
app.onError(errorHandler)

export default {
  port: 3030,
  fetch: app.fetch,
}
