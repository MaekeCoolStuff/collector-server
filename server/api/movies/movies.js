var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/collector');
var movieRouter = require('express').Router();
var movies = [{ name: 'Movie' }];
var id = 0;

var MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    watched: {
        type: Boolean,
        required: true
    },
    watchDate: Date,
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    summaryFile: Buffer,
    relatedGames: [],
    filmLocation: {
        city: String,
        country: String
    },
    movieGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
    }
});

var updateId = function(req, res, next) {
    if(!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

movieRouter.param('id', function(req, res, next, id) {
    var movie = _.find(movies, { id: id });

    if(movie) {
        req.movie = movie;
        next();
    } else {
        res.send();
    }
});


movieRouter.get('/', function(req, res) {
    res.json(movies);
});

movieRouter.get('/:id', function(req, res) {
    var movie = req.movie; //_.find(movies, { id: req.params.id });
    res.json(movie || {});
});

movieRouter.post('/', updateId, function(req, res) {
    var movie = req.body;
    movies.push(movie);

    var Movie = mongoose.model('movie', MovieSchema);
    Movie.create(movie).then(function(addedMovie) {
        res.json(addedMovie || {});
    });
});

movieRouter.put('/:id', function(req, res) {
    var update = req.body;
    if(update.id) {
        delete update.id
    };
    
    var movie = req.movie;
    if(!movies[movie]) {
        res.send();
    } else {
        var updatedMovie = _.assign(movies[movie], update);
        res.json(updatedMovie);
    }
});

movieRouter.delete('/:id', function(req, res) {
    var movie = req.movie;
    if(!movies[movie]) { 
        res.send();
    } else {
        var deletedMovie = movies[movie];
        movies.splice(movie, 1);
        res.json(deletedMovie);
    }
});

module.exports = movieRouter;