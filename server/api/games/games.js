var gameRouter = require('express').Router();
var games = [{ name: 'Game'}];
var id = 0;

var updateId = function(req, res, next) {
    if(!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

gameRouter.param('id', function(req, res, next, id) {
    var game = _.find(games, { id: id });

    if(game) {
        req.game = game;
        next();
    } else {
        res.send();
    }
});

gameRouter.route('/')
    .get(function(req, res) {
        res.json(games);
    })
    .post(updateId, function(req, res) {
        var game = req.body;
    
        games.push(game);
    });

gameRouter.route('/:id')
    .get(function(req, res) {
        var game = req.game;
        res.json(game || {});
    })
    .delete(function(req, res) {
        var game = req.game;
        if(!games[game]) { 
            res.send();
        } else {
            var deletedGame = games[game];
            games.splice(game, 1);
            res.json(deletedGame);
        }
    })
    .put(function(req, res) {
        var update = req.body;
        if(update.id) {
            delete update.id
        };
        
        var game = req.game;
        if(!games[game]) {
            res.send();
        } else {
            var updatedGame = _.assign(games[game], update);
            res.json(updatedGame);
        }
    });

module.exports = gameRouter;