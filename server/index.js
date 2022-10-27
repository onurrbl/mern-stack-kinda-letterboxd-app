const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')

const app = express()

// app.use(express.json());

app.use('', userRoutes)

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, }
  )
  .then(() => {
    app.listen(port)
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err)
  })