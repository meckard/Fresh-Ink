const userLoader = require('../Routes/userRoute.js')
const authLoader = require('../Routes/authRouter.js')
const passportLoader = require('../Loaders/passport.js')
const expressLoader = require('./express.js')
const productsLoader = require('../Routes/productRouter.js')
const cartLoader = require('../Routes/cartRouter.js')
const orderLoader = require('../Routes/orderRouter.js')

//connecting loaders to app
module.exports = async (app) => {
  const expressApp = await expressLoader(app)
  const passport = await passportLoader(expressApp)
  await userLoader(app)
  await productsLoader(app)
  await authLoader(app, passport)
  await cartLoader(app)
  await orderLoader(app)
}
