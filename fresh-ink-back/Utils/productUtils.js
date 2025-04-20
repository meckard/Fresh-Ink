const db = require('../queries')

const getAllProducts = async () => {
  const statement = 'SELECT * FROM public.products'
  const values = []

  const result = await db.query(statement, values)
  return result.rows
}

const getProductById = async (id) => {
  console.log(id)
  const statement = 'SELECT * FROM public.products WHERE id = $1'
  const values = [id]

  const result = await db.query(statement, values)
  return result
}

module.exports = {
  getProductById,
  getAllProducts,
}
