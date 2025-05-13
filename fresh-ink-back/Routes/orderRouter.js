const express = require('express')
const router = express.Router()
const util = require('../Utils/orderUtils')
const userUtil = require('../Utils/userUtils')
const stripe = require('stripe')(
  process.env.STRIPE_DEV_KEY,
  { apiVersion: '2025-03-31.basil' },
)

module.exports = (app) => {
  app.use('/orders', router)

  const YOUR_DOMAIN = 'https://localhost:3000'

  router.get('/', async (req, res, next) => {
    try {
      const response = await util.getOrders()

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  router.post('/new_order', async (req, res, next) => {
    const { email } = req.body
    const user = await userUtil.findUserByEmail(email)
    console.log('user', user)
    console.log('email', email)

    try {
      const response = await util.createOrder(req.body, user.id)
      console.log('response', response)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  router.get('/my_orders/:userId', async (req, res, next) => {
    const { userId } = req.params
    console.log('id', userId)
    console.log(req.params)
    try {
      const response = await util.getOrderById(userId)

      console.log('response', response)

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1R6hzdB3ds8m2oajdcxAhxTH',
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `https://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    console.log('session', session)

    res.json({ client_secret: session.client_secret })
  })

  app.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
    )

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    })
  })

  router.post('/complete_order', async (req, res, next) => {
    const { orderId } = req.body

    console.log('orderId', orderId)

    try {
      const response = await util.completeOrder(orderId)

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
