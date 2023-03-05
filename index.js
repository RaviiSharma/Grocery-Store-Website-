const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./src/routes/route.js");
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log('MongoDB is connected successfully'))
    .catch((error) => console.log(error))

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})