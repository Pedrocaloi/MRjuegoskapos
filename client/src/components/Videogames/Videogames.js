import React from 'react';
import Videogame from '../Videogame/Videogame.js';
import Pagination from '../Pagination/Pagination.js';
import Spinner from '../Spinner/Spinner.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getVideogames,
    getGenres,
    filterGamesByOrigin,
    filterGamesByGenres,
    sortByName,
    sortByRating
} from '../../redux/actions/index.js';

import './Videogames.css';

export default function Videogames(){
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const allGenres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch]);

    const [currentPage, setCurrentPage] = useState(1); //Seteo n° de pag
    const [gamesPerPage] = useState(16); //Seteo la cantidad de elementos por pag
    const indexOfLastGame = currentPage * gamesPerPage; //Guardo la posicion del último elemento a mostrar
    const indexOfFirstGame = indexOfLastGame - gamesPerPage; //Guardo la posicion del primer elemento a mostrar
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame); //Obtengo los elementos por pagina
    const [order, setOrder] = useState(''); //Modificamos el ordenamiento de los juegos
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    function handleFilterByGenres(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterGamesByGenres(e.target.value));
    }

    function handleFilterByOrigin(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterGamesByOrigin(e.target.value));
    }

    function handleSortByName(e){
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleSortByRating(e){
        e.preventDefault();
        dispatch(sortByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    return(
        <div className='container mx-auto'>
            <div className='container flex-row shrink'>
                <ul className='flex gap-3 m-10'>  
                    <li className=''>
                        <select className='block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={e => {
                                handleSortByName(e)
                                e.target.parentNode.parentElement.childNodes[1].childNodes[0].options[0].selected = true
                            }}>
                            <option className='' value='selected' hidden>Ordenar por Nombre</option>
                            <option className='' value='asc'>A - Z</option>
                            <option className='' value='desc'>Z - A</option>
                        </select>
                    </li>
                    <li className=''>
                        <select className='block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={e => {
                                handleSortByRating(e)
                                e.target.parentNode.parentElement.childNodes[0].childNodes[0].options[0].selected = true
                            }}>
                            <option className='' value='selected' hidden>Ordenar por Rating</option>
                            <option className='' value='asc'>0⭐ - 5⭐</option>    
                            <option className='' value='desc'>5⭐ - 0</option> 
                        </select>
                    </li>
                    <li className=''>
                        <select className='block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={e => {
                               handleFilterByGenres(e)
                               e.target.parentNode.parentNode.childNodes[3].childNodes[0].options[0].selected = true 
                            }}>
                            <option className='' key={0} value='all'>Todos los Géneros</option>
                            {allGenres?.sort(function(a, b){
                                if(a.name < b.name) return - 1;
                                if(a.name > b.name) return 1;
                                return 0;
                            }).map(e => {
                                return(
                                    <option 
                                        className=''
                                        key={e.id}
                                        value={e.name}
                                    >{e.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className=''>
                        <select className='block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                            onChange={e =>{
                                handleFilterByOrigin(e)
                                e.target.parentNode.parentNode.childNodes[2].childNodes[0].options[0].selected = true
                            }}>
                            <option className='' value='all'>Todos los Juegos</option>
                            <option className='' value='api'>Juegos existentes</option>
                            <option className='' value='created'>Juegos creados</option>
                        </select>
                    </li>
                </ul>
            </div>
            {/* <Spinner /> */}
            {allVideogames.length === 0 ? <Spinner/> : 
                <div className='container h-full w-full grid grid-cols-4 gap-3 mx-auto justify-items-center'>
                    {
                        currentGames?.map(game => {
                            return <Videogame 
                                key={game.id} 
                                route={game.id} 
                                name={game.name}
                                genres={game.genres}
                                image={game.background_image ? game.background_image : (game.image ? game.image : 'https://media.istockphoto.com/photos/video-gaming-console-man-playing-rpg-strategy-game-picture-id1324673294?b=1&k=20&m=1324673294&s=170667a&w=0&h=Cv-F1d5n6nPr_VydhJ0D82u2uiyCZ1dK1ZqBwTzjq5A=')}/>
                        })
                    }
                </div>
            }
            <Pagination 
                className='h-fit'
                gamesPerPage={gamesPerPage}
                allVideogames={allVideogames.length}
                pagination={pagination}
                currentPage={currentPage}/>
        </div>
    )
}