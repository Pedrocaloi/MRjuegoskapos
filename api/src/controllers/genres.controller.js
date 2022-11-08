require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db');

const initialGenres = async () => {
    try{
        const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let promiseArray = data.results.map(e => {
            const newGenre = Genre.create({
                name: e.name
            });
        });
        await Promise.all(promiseArray)
        console.log('Géneros cargados en la DB');
    }catch(e){
        res.status(404).send(e.message);
    }
}

const getGenres = async (req, res) => {
    try{
        const genresDb = await Genre.findAll({})
        res.json(genresDb);
    }catch(e){
        res.status(404).send(e.message);
    }
}

module.exports = { getGenres, initialGenres };