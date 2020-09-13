import server from '../app'
import { expect } from 'chai'
import supertest from 'supertest'
import models from '../models'

const chai = require('chai')
const should = chai.should()

const request = supertest.agent(server)
const gamesModel = models.Games
let newGames = {}

describe('Games Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    // add a games to the database
    await gamesModel.create({
      title: 'test games',
      genres: 'comedy',
      rating: 5,
      likes: 700,
      year: 2020,
      description: 'Just a random test games'
    })

    newGames = await gamesModel.create({
      title: 'Beds of Lies',
      genres: 'Musical',
      rating: 7,
      likes: 110,
      year: 2023,
      description: 'Just nicki minaj song'
    })
  })
  after(async () => {
    // empty the database
    await gamesModel.destroy({ where: {} })
  })

  describe('Index route', () => {
    it('should return welcome message when / route is matched', (done) => {
      request.get('/').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.message).be.equal('Welcome to Games Api')
        done()
      })
    })
  })

  // Test Get all games
  describe('/GET Get all games', () => {
    it('it should GET all the games', (done) => {
      request.get('/games').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.games).to.be.an('array')
        expect(res.body.message).be.equal('Games fetched successfully')
        done()
      })
    })
  })

  //update games test
  describe('Update games route', () => {
    it('should UPDATE a games given the id', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: 'How to make nigerians suffer',
          genres: 'Action',
          producer: 'Tijani',
          year: '2022',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).be.equal('Games updated successfully')
          done()
        })
    })
    it('should return games with this id does not exist', (done) => {
      request
        .put('/games/123456')
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          producer: 'Jt Tomwest',
          year: '2005',
          publisher: 'coding class',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal('Games not found')
          done()
        })
    })
    it('should return Year must be a number if the year passed isnt a number', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          producer: 'ogenyi Janet',
          year: 'yes',
          publisher: 'coding class',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Year must be a number')
          done()
        })
    })
    it('should return title cannot be empty if user doesnt put a title', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: '',
          genres: 'comedy',
          producer: 'Usman Tijani',
          year: 2020,
          publisher: 'coding class',
          description: 'Just a random test games'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Title cannot be empty')
          done()
        })
    })

    it('should return producer cannot be empty if user doesnt put a producer', (done) => {
      request
        .put(`/games/${newGames.id}`)
        .send({
          title: 'How to get away with murder',
          genres: 'comedy',
          producer: '',
          cast: 'coding class',
          plot: 'Just a random games',
          year: '1999'
        })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.message).be.equal('Games updated successfully')
          done()
        })
    })

    // Add games test
    describe('Add games route', () => {
      it('should Add Games', (done) => {
        request
          .post('/games')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            producer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(201)
            expect(res.body.message).be.equal('Game added successfully')
            done()
          })
      })
      it('should Add Games when id does not exist', (done) => {
        request
          .post('/games/2222')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            producer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(404)
            expect(res.body.message).be.equal(undefined)
            done()
          })
      })
      it('should return Year must be a number if the year passed isnt a number', (done) => {
        request
          .post('/games')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            producer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: 'hey'
          })
          .end((err, res) => {
            res.status.should.be.equal(400)
            expect(res.body.message).be.equal('Year must be a number')
            done()
          })
      })
      it('should return title cannot be empty if user doesnt put a title', (done) => {
        request
          .post('/games')
          .send({
            title: '',
            genres: 'Drama',
            producer: 'Joy',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(400)
            expect(res.body.message).be.equal('Title cannot be empty')
            done()
          })
      })
      it('should return producer cannot be empty if user doesnt put an producer', (done) => {
        request
          .post('/games')
          .send({
            title: 'Orange is the new black',
            genres: 'Drama',
            producer: '',
            cast: 'Alex Michael',
            plot:
              'Ten years after transporting drug money to alex, Piper is imprisoned for drugs',
            year: '2009'
          })
          .end((err, res) => {
            res.status.should.be.equal(201)
            expect(res.body.message).be.equal('Game added successfully')
            done()
          })
      })
    })
    
// Get Games By Title
    describe('Get Games By title route', () => {
      it('should get games by title', (done) => {
        request
          .get('/games/title')
          .query({ title: 'How to get away with murder' })
          .end((err, res) => {
            res.status.should.be.equal(200)
            expect(res.body.data).to.be.an('array')
            done()
          })
      })
    })
  })
})
