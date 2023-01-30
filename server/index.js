const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const { errorHandler } = require('./middleware/errorMiddleware');
const movieRoutes = require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes)
app.use('/api/movies', movieRoutes)

app.use(errorHandler);

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