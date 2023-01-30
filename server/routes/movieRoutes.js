const express = require('express')
const router = express.Router()
const {requireAuth} = require('../middleware/authMiddleware')
const { addMovie, getMovies, addMovieToFavorite, reviewMovie} = require('../controllers/movieController')


// /api/movies
router.get('/get', getMovies)
router.post('/add/movie', requireAuth, addMovie)
router.post('/:id/add/favorite', requireAuth, addMovieToFavorite)
router.post('/:id/review', requireAuth, reviewMovie)


module.exports = router
