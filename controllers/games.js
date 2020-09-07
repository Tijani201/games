import { Op } from 'sequelize'
import models from '../models/index'

const gamesModel = models.Games

class Games {
    static welcome(req, res) {
      res.status(200).send({ message: 'Welcome to Games Api' })
    }

    static getAllGames(req, res) {
        gamesModel.findAll().then((games) => {
          res.status(200).send({ message: 'Games fetched successfully', games })
        })
      }

      static getSingleGames(req, res) {
        const id = parseInt(req.params.id)
        gamesModel
          .findOne({
            where: {
              id
            }
          })
          .then((games) => {
            if (!games) {
              return res.status(404).send({
                message: 'games not found'
              })
            }
            return res
              .status(200)
              .send({ message: `Single games found ${id} sucessfully`, games })
          })
      }

      static addGames(req, res) {
        gamesModel.create({
          title: req.body.title,
          genres: req.body.genres,
          year: req.body.year,
          price: req.body.price,
          like: req.body.likes,
          description: req.body.description
        }).then((newGame) => {
          return res
            .status(201)
            .send({ message: 'Game added successfully', data: newGame })
        })
      }
  }
  
  export default Games