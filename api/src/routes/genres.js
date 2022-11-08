const { Router } = require('express');
// const db = require('../db');
// const {Videogame, Genre} = require('../db');
const routes = Router();
const { getGenres } = require('../controllers/genres.controller');

routes.route('/').get(getGenres);

module.exports = routes;