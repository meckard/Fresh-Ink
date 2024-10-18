const Pool = require('pg').Pool
const { PG } = require('./config.js')

const pool = new Pool({
  user: PG.PGUSER,
  host: PG.PGHOST,
  database: PG.PGDATABASE,
  password: PG.PGPASSWORD,
  port: PG.PGPORT,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
