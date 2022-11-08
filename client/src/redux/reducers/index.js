import { type } from '../actions/types';

//==== Seteamos el Estado Global Inicial ======//

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
    platforms: []
}

//==== Seteamos los Reducers ======//

//Al usar state.allVideogames en lugar de state.videogames, cada vez que aplique un filtro, state.videogames va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allVideogames, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case type.GET_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case type.GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case type.FILTER_BY_GENRES:
            const allVideogames = state.allVideogames;
            const genresFiltered = action.payload === 'all' ? allVideogames : allVideogames.filter(game => {
               if(game.genres.length > 0){
                    let gamesFiltered = game.genres.map(gen => gen.name);
                    return gamesFiltered.includes(action.payload);
               } 
               return true;
            })
            return{
                ...state,
                videogames: genresFiltered
            }
        case type.FILTER_BY_ORIGIN:
            const all = state.allVideogames;
            const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(e => e.create_in_db) : all.filter(e => !e.create_in_db);
            return{
                ...state,
                videogames: originFiltered
            }
        case type.SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ?
                state.videogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1;
                    }
                    return 0
                }) :
                state.videogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                videogames: sortedName
            }
        case type.SORT_BY_RATING:
            const sortedRating = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    return parseInt(a.rating) - parseInt(b.rating);
                })  :
                state.videogames.sort(function (a, b) {
                    return parseInt(b.rating) - parseInt(a.rating);
                })
            return{
                ...state,
                videogames: sortedRating
            }
        case type.POST_GAME:
            return{
                ...state
            }
        case type.GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case type.CLEAN_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case type.GET_PLATFORMS:
            return{
                ...state,
                platforms: action.payload
            }
        default:
            return state
    }

}

