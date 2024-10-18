const db = require('../queries')

const getOrders = async () => {
  const statement = 'SELECT * FROM public.orders'

  const response = await db.query(statement, [])

  if (response.rows?.length) {
    return response.rows
  }
}

const getPendingOrders = async () => {
  const statement = 'SELECT * FROM public.orders WHERE status = "Pending"'

  const response = await db.query(statement, [])

  if (response.rows?.length) {
    return response.rows
  }
}

const getCompletedOrders = async () => {
  const statement = 'SELECT * FROM public. WHERE status = "Completed"'

  const response = await db.query(statement, [])

  if (response.rows?.length) {
    return response.rows
  }
}

const getOrderById = async (id) => {
  const statement = 'SELECT * FROM public.order WHERE id = $1'

  const response = await db.query(statement, [id])

  if (response.rows?.length) {
    return response.rows
  }
}

const createOrder = async (total, userId) => {
  const statement = `INSERT INTO public.order (total, user_id) VALUES (${total}, ${userId}) RETURNING *`

  const response = await db.query(statement, [])

  if (response.rows?.length) {
    return response.rows
  }

  return null
}

const deleteOrder = async (orderId) => {
  const statement = 'DELETE FROM public.order WHERE id = $1'
  const values = [orderId]

  const response = await db.query(statement, values)

  return response.rows
}

const addItems = async (items) => {
  const itemQuery = items.map(async (item) => {
    const statement = `INSERT INTO public.order_item (quantity, price, order_id, product_id) VALUES (${item[0].quantity}, ${item[0].price}, ${item[0].orderId}, ${item[0].productId})`

    const response = await db.query(statement, [])

    if (response.rows?.length) {
      return response.rows
    }

    return null
  })

  return itemQuery
}

const completeOrder = async (orderId) => {
  const statement = "UPDATE public.order SET status = 'complete' WHERE id = $1"
  const values = [orderId]

  const response = await db.query(statement, values)

  if (response.rows?.length) {
    console.log('Order completed')
    return response.rows
  }

  return null
}

module.exports = {
  getOrders,
  getOrderById,
  getCompletedOrders,
  getPendingOrders,
  completeOrder,
  createOrder,
  deleteOrder,
  addItems,
}
