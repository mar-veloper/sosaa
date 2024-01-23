import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import Prisma from '../../prisma/client'
import { productSchema } from './product.schema'

const products = new Hono()

products.get('/products', async (ctx) => {
  try {
    const products = await Prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return ctx.json(products, 200, {
      'content-type': 'application/json',
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

products.get('/products/:id', async (ctx) => {
  const { id } = ctx.req.param()

  const product = await Prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (product === null) {
    throw new HTTPException(404, { message: 'Product not found' })
  }

  return ctx.json(product, 200, {
    'content-type': 'application/json',
  })
})

products.post('/products', async (ctx) => {
  const data = await ctx.req.json()

  const { name, price, description } = data

  const validation = productSchema.safeParse({ name, price, description })

  if (!validation.success) {
    throw new HTTPException(400, { message: validation.error.message })
  }

  const product = await Prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  })

  return ctx.json(product, 201, {
    'content-type': 'application/json',
  })
})

export default products
