const {createPool} = require('mysql')
require('dotenv').config()

const db = createPool({
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    password : '',
    database : 'rest_api',
    connectionLimit : 10
})

module.exports = db