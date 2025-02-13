const express = require('express')
const router = express.Router()
const db = require('../queries')
const cors = require('cors')

module.exports = (app) => {
  app.use(cors())
  app.use('/products', router)

  router.get('/', async (req, res, next) => {
    try {
      const statement = 'SELECT * FROM public.products'
      const values = []

      const result = await db.query(statement, values)
      console.log(result.rows)

      res.status(200).send(result.rows)
    } catch (err) {
      next(err)
    }
  })

  router.get('/:productId', async (req, res, next) => {
    try {
      const { productId } = req.params
      console.log(productId)
      const statement = 'SELECT * FROM public.products WHERE id = $1'
      const values = [productId]

      const result = await db.query(statement, values)

      res.status(200).send(result.rows)
    } catch (err) {
      next(err)
    }
  })
}
