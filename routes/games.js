import express from 'express'

import Games from '../controllers/games'

const router = express.Router()

/* GET home page. */
router.get('/games', Games.getAllGames)
router.get('/game/:id', Games.getSingleGames)
router.post('/games', Games.addGames)
router.put('/games/:id', Games.updateGames)
router.get('/games/rating', Games.getGamesByRating)
router.get('/games/likes', Games.getGamesByLikes)
router.get('/games/title', Games.getGamesByTitle)
router.get('/games/genres', Games.getGamesBygenres)
router.get('/games/year', Games.getGamesByYear)
module.exports = router
