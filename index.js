const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
dotenv.config()

const app = express()
app.use(express.json())

const url = process.env.DB_CONNECT
mongoose.connect(url,{ useNewUrlParser: true }, ()=> console.log(`Contected to mongoose`))

app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`))


//npm start