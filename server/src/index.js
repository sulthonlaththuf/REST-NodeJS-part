const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(cors(
    origin = "http://localhost:3000"
))

const router = (routeArgs) => {
    return require('./' + routeArgs)
}

app.use('/api/employee', router('employee'))

app.use((req, res, next) => {
    if(!req.route) return next(new Error(`Not Found - ${req.originalUrl}`))
    next()
})

app.use((error, req, res, next) => {
    const {message} = error
    res.json({message})
})

const port = process.env.PORT || 1337
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)    
})