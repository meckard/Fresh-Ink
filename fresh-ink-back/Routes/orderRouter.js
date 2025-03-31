const express = require('express')
const router = express.Router()
const util = require('../Utils/orderUtils')
const userUtil = require('../Utils/userUtils')
const stripe = require('stripe')(
  'sk_test_51R6LPsB3ds8m2oajXQCBJilGgiPbZP2xJdz0bWiKxaDBzPuGjiac8W3mjFosR4FBTDEy9YmOLjbabf5ydrRyoUc900YLtCSK6u',
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
    console.log(req.body)
    const {email} = req.body
    const user = await userUtil.findUserByEmail(email)
    console.log(user)

    try{
      const response = await util.createOrder()
    } catch(err) {
      next(err)
    }
  }) 

  router.get('/my_orders', async (req, res, next) => {
    const { id } = req.user

    try {
      const response = await util.getOrderById(id)

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
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    res.send({ clientSecret: session.client_secret })
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
