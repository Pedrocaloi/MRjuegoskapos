const express = require('express');
// const db = require('../db');
// const {Videogame, Genre} = require('../db');
const {getVideogames, getVideogameById, postVideogames} = require('../controllers/videogame.controller')

const routes = express();

routes.get('/', getVideogames)
routes.get('/:videogameId', getVideogameById)
routes.post('/', postVideogames)


module.exports = routes;