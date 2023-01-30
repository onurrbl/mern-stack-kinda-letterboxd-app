const asyncHandler = require('express-async-handler')
const Movie = require('../models/movieModel')
const User = require('../models/userModel')



// acces public
const getMovies = asyncHandler(async (req, res, next) => {
    const movies = await Movie.find({})
    res.json(movies)
})

// acces private
// require auth
const addMovieToFavorite = asyncHandler(async (req, res, next) => { 
    const {movieId} = req.params.id

    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(400)
        throw new Error('Invalid user data')
    }
    const movie = Movie.findById(movieId)
    if (!movie) {
        res.status(400)
        throw new Error('Invalid movie data')
    }
    user.favoriteMovies.push(movieId)
    await user.save()
    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        favoriteMovies: user.favoriteMovies,})
})

// acces private
// require auth
const reviewMovie = asyncHandler(async (req, res, next) => {
    const { comment, rating } = req.body
    const movieId = req.params.id

    const movie = await Movie.findById(movieId)
    if (!movie) {
        res.status(400)
        throw new Error('There is no movie with this id')
    }
    const review = {
        user: req.user._id,
        comment,
        rating
    }
    movie.reviews.push(review)
    movie.rating = movie.reviews.reduce((sum, review) => sum + review.rating, 0) / movie.reviews.length
    await movie.save()

    
    res.status(201).json({
        id: movie._id,
        title: movie.title,
        description: movie.description,
        categories: movie.categories,
        year: movie.year,
        rating: movie.rating,
        reviews: movie.reviews,})
})



// acces private
// admin only
const addMovie = asyncHandler(async (req, res, next) => {
  const { title, description, categories, year, rating } = req.body
  const movie = await Movie.create({
    title,
    description,
    categories,
    year,
    rating,
  })
  if (!movie) {
    res.status(400)
    throw new Error('Invalid movie data')
  }
  res.status(201).json({
    id: movie._id,
    title: movie.title,
    description: movie.description,
    categories: movie.categories,
    year: movie.year,
    rating: movie.rating,
  })
})

module.exports = { addMovie, getMovies, addMovieToFavorite, reviewMovie }