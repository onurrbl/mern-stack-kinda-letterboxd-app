const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String },
    rating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true }
)

reviewSchema.post('save', async function (review) {
  const movie = await Movie.findById(review.movie)
  movie.rating =
    movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length
  await movie.save()
})

const movieSchema = mongoose.Schema({
  title: {
    type: String,
  },
  categories: [{ type: String }],
  thumbnail: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  year: { type: Number },
  description: { type: String },
  reviews: { type: [reviewSchema], default: [] },
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
