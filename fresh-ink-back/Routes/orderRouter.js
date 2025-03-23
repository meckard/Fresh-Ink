const express = require('express')
const router = express.Router()
const util = require('../Utils/orderUtils')

module.exports = (app) => {
  app.use('/orders', router)

  router.get('/', async (req, res, next) => {
    try {
      const response = await util.getOrders()

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  /* router.post('/new_order', async (req, res, next) => {
    

    try{
      const response = await util.createOrder()
    }
  }) */

  router.get('/my_orders', async (req, res, next) => {
    const { id } = req.user

    try {
      const response = await util.getOrderById(id)

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  router.get('/:orderId', async (req, res, next) => {
    const { id } = req.params

    try {
      const response = await util.getOrderById(id)

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
