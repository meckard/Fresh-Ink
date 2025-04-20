const express = require('express')
const router = express.Router()
const cors = require('cors')
const productUtils = require('../Utils/productUtils')

module.exports = (app) => {
  app.use(cors())
  app.use('/products', router)

  router.get('/', async (req, res, next) => {
    try {
      const result = await productUtils.getAllProducts()

      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  })

  router.get('/:productId', async (req, res, next) => {
    const {productId} = req.params
    try {
      const result = await productUtils.getProductById(productId)

      res.status(200).send(result.rows)
    } catch (err) {
      next(err)
    }
  })
}
