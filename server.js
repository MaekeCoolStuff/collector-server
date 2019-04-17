const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var _ = require('lodash');
var morgan = require('morgan');

var movieRouter = require('./routers/movies');
var gameRouter = require('./routers/games');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/movies', movieRouter);
app.use('/games', gameRouter);

app.use(function(err, req, res, next) {
    if(err) {
        console.log(err);
        res.status(500).send(err);
    }
});
app.get('/', (req, res) => res.send('Hello World'));

module.exports = app;