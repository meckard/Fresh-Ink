const express = require('express')
const router = express.Router()
const cartUtil = require('../Utils/cartUtils')
const orderUtil = require('../Utils/orderUtils')
const productUtil = require('../Utils/productUtils')

module.exports = (app) => {
  app.use('/cart', router)

  router.get('/my_cart', async (req, res, next) => {
    try {
      const cart = await cartUtil.findCartByUser(req.user.id)

      if (!cart) {
        const result = await cartUtil.newCart(req.user.id)

        return result
      }

      const getItems = await cartUtil.findItemsByCart(cart.id)
      res.status(200).send(getItems)
    } catch (err) {
      next(err)
    }
  })

  router.post('/my_cart/add_item', async (req, res, next) => {
    const { productId } = req.body

    try {
      const cart = await cartUtil.findCartByUser(req.user.id)
      const product = await productUtil.getProductById(productId)

      if (!cart) {
        const result = await cartUtil.newCart(req.user.id)

        return result
      }

      const addItem = await cartUtil.addItemToCart(
        productId,
        cart.id,
        product.rows[0].price,
      )
      res.status(200).send(addItem[0])
    } catch (err) {
      next(err)
    }
  })

  router.delete('/delete_item', async (req, res, next) => {
    const { itemId } = req.body

    console.log(req.user.id)

    try {
      const deleteItem = await cartUtil.deleteItemFromCart(itemId)

      res.status(200).send(deleteItem)
    } catch (err) {
      next(err)
    }
  })

  router.post('/checkout', async (req, res, next) => {
    const { cartId } = req.body

    try {
      const getItems = await cartUtil.getItemPrice(cartId)

      const total = getItems.reduce((total, item) => {
        return (total += Number(item.price))
      }, 0)

      const newOrder = await orderUtil.createOrder(total, req.user.id)

      const items = await getItems.map((item) => {
        return [
          {
            quantity: Number(item.quantity),
            price: item.price,
            orderId: newOrder[0].id,
            productId: item.product_id,
          },
        ]
      })

      const addItems = await orderUtil.addItems(items)

      //add payment logic at some point

      cartUtil.checkedOut(cartId)
      const order = await orderUtil.completeOrder(newOrder[0].id)

      res.status(200).send(await orderUtil.getOrderById(newOrder[0].id))
    } catch (err) {
      next(err)
    }
  })
}
