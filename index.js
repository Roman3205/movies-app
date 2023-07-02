let express = require('express')
let app = express()
let port = 3003

app.listen(port, function() {
    console.log(`http://localhost:` + port)
})

let cors = require('cors')
app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json())

let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/movie-app')

let movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    ageLimit: Number,
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    briefPlot: String,
    genre: [String],
    link: String,
    reviews: [{
        type: mongoose.ObjectId,
        ref: 'review'
    }],
    image: String
})

let reviewSchema = new mongoose.Schema({
    author: String,
    text: String
}, {
    timestamps: true
})

let Movie = mongoose.model('movie', movieSchema)
let Review = mongoose.model('review', reviewSchema)

app.get('/all', async function(req,res) {
    let movies = await Movie.find()

    res.send(movies)
})

app.get('/action', async function(req,res) {
    let movies = await Movie.find({genre: 'Action'})

    res.send(movies)
})

app.get('/thriller', async function(req,res) {
    let movies = await Movie.find({genre: 'Thriller'})

    res.send(movies)
})

app.get('/fantasy', async function(req,res) {
    let movies = await Movie.find({genre: 'Fantasy'})

    res.send(movies)
})

app.get('/top', async function(req,res) {
    let movies = await Movie.find({rating: {$gte: 8}})

    res.send(movies)
})

app.get('/movie', async function(req,res) {
    let id = req.query.id

    let movie = await Movie.findOne({_id: id}).populate({
        path: 'reviews',
        options: {sort: {createdAt: -1}}
    })
    
    if(!movie) {
        res.status(404).send('Error')
        return
    }

    res.send(movie)
})

app.post('/review', async function(req,res) {
    let id = req.body.id
    let text = req.body.text

    let review = new Review({
        author: 'Anonymous',
        text: text
    })

    await review.save()

    let movie = await Movie.findOne({_id: id}).populate('reviews')
    movie.reviews.push(review._id)

    await movie.save()

    res.send(200)
})