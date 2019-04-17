var router = require('express').Router();

router.use('/movies', require('./movies/movies'));
router.use('/games', require('./games/games'));

module.exports = router;