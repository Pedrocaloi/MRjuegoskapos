import axios from 'axios';
import { type } from './types'
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.REACT_APP_HOST 


//==========================================================================================//

export function getVideogames(name){
    return async function(dispatch){
        let json;
        if(name){
            json = await axios.get(`${url}/videogames?name=${name}`);               
        } else {
            json = await axios.get(`${url}/videogames`);
        }
        return dispatch({
            type: type.GET_VIDEOGAMES,
            payload: json.data
        });
    }
}

//====================================//

export function getGenres(){
    return async function(dispatch){
        let { data } = await axios.get(`${url}/genres`);
        return dispatch({
            type: type.GET_GENRES,
            payload: data
        });
    }
}

//====================================//

export function getPlatforms(){
    return async function(dispatch) {
        let json1 = await axios.get(`https://api.rawg.io/api/platforms?key=01a3c6d9e8d94958bf14355441d93af1`);
        let json2 = await axios.get(`https://api.rawg.io/api/platforms?key=01a3c6d9e8d94958bf14355441d93af1&page=2`)
        let data = [].concat(json1.data.results, json2.data.results)
        let dataFilt = data.map(e => e.name)
        return dispatch({
            type: type.GET_PLATFORMS,
            payload: dataFilt
        })
    }
}

//====================================//

export function filterGamesByGenres(payload){
    return{
        type: type.FILTER_BY_GENRES,
        payload,
    }
}

//====================================//

export function filterGamesByOrigin(payload){
    return {
        type: type.FILTER_BY_ORIGIN,
        payload
    }
}

//====================================//

export function sortByName(payload){
    return{
        type: type.SORT_BY_NAME,
        payload
    }
}

//====================================//

export function sortByRating(payload){
    return {
        type: type.SORT_BY_RATING,
        payload
    }
}

//====================================//

export function postVideogame(payload){
    return async function(){
        axios.post(`${url}/videogames`, payload);
        return{type: type.POST_GAME}
    }
}

//====================================//

export function getDetail(id){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`${url}/videogames/${id}`);
            return dispatch({
                type: type.GET_DETAIL,
                payload: data
            })
        }catch(e){
            console.log(e.message)
        }
    }
}

//====================================//

export function cleanDetail(){
    return async function(dispatch){
        try{
            return dispatch({
                type: type.GET_DETAIL,
                payload: ''
            })
        }catch(e){
            console.log(e)
        }
    }
}

//==========================================================================================//