require('dotenv').config();
const axios = require('axios');
const {Videogame, Genre} = require('../db');
const {API_KEY} = process.env;
const {Op} = require('sequelize');

const getVideogames = async (req, res) => {
    // nos trae background_immage, name y genres

    try{
        const { name } = req.query;
        if(name){
            
            let dataDb = await Videogame.findAll({
                limit: 15,
                attributes: ['id','name','image','rating','create_in_db'],
                include: Genre,
                where:{
                    name:{
                        [Op.like]: '%'+name+'%' 
                    }
                }
            });
            
            let json1 = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=40`);
            let data = [].concat(json1.data.results);
            let dataFilt = [];
            
            data.forEach(e => {
                dataFilt.push({
                    id: e.id,
                    background_image: e.background_image,
                    name: e.name,
                    genres: e.genres,
                    rating: e.rating
                })
            });

            let allData = [].concat(dataFilt, dataDb)
            if(data.length < 1 && dataDb < 1) throw new Error('No se encontraron resultados.')
            else res.json(allData)

        } else {
          
            let dataDb = await Videogame.findAll({
                attributes: ['id','name', 'image', 'rating', 'create_in_db'],
                include: Genre 
            });

            let json1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`);
            let json2 = await axios.get(json1.data.next);
            let json3 = await axios.get(json2.data.next);
            let data = [].concat(json1.data.results, json2.data.results, json3.data.results);
            let dataFilt = [];

            data.forEach(e => {
                dataFilt.push({
                    id: e.id,
                    background_image: e.background_image,
                    name: e.name,
                    genres: e.genres,
                    rating: e.rating
                });
            });

            let allData = [].concat(dataFilt, dataDb);
            res.json(allData);
        }
    }catch(e){
        res.status(404).send(e.message);
    }
}

const getVideogameById = async (req, res) => {
    
    const { videogameId } = req.params;
    try{    
        if(videogameId && videogameId.length > 7){
            let findDb = await Videogame.findByPk(videogameId, {include: Genre});
            // console.log(findDb)
            if(findDb.dataValues?.id) res.json(findDb);
            else {throw new Error(`No existe ningun juego en la Base de datos con el id: ${videogameId}`)};
        } else if(videogameId){
            let { data } = await axios.get(`https://api.rawg.io/api/games/${videogameId}?&key=${API_KEY}`);
            if(data.hasOwnProperty('id')) res.json(data);
            else {throw new Error(`No existe ningun videojuego en la API con el id: ${videogameId}`)};
        } else {
            throw new Error('No se recibió ningun id por parametros');
        }
    }catch(e){
        res.status(404).send(e.message);
    }
}

const postVideogames = async (req, res) => {
    // bg, name y genres
    // 15 juegos por pag

    const { name, description, release_date, rating, platforms, image, idGenres } = req.body;
    if(!(name && description && platforms)) throw new Error('No se recibieron todos los parámetros obligatorios')
    try{
        const newVideogame = await Videogame.create({
            name,
            description,
            release_date,
            rating,
            platforms,
            image
        })
        if(idGenres && idGenres.length >= 1){
            idGenres.map(async e =>{
                let genre = await Genre.findByPk(e)
                await newVideogame.setGenres(genre)
            })
        }
        res.send('Videojuego cargado correctamente')
    }catch(e){
        res.status(404).send(e.message)
    }
}

module.exports = {getVideogames, getVideogameById, postVideogames}