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
      console.log("router result", result)

      res.status(200).send(result)
    } catch (err) {
      next(err)
    }
  })

  router.get('/:productId', async (req, res, next) => {
    const {productId} = req.params
    console.log("product id", productId)
    try {
      const result = await productUtils.getProductById(productId)
      console.log("id result", result.rows)

      res.status(200).send(result.rows)
    } catch (err) {
      next(err)
    }
  })
}
