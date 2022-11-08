import React from 'react';
import { Link } from 'react-router-dom';

import './Videogame.css';

export default function Videogame({name, genres, image, route}){
    return(
        <div className='w-11/12 h-56 text-center bg-zinc-800 duration-300 hover:bg-zinc-700 rounded-2xl shadow-lg shadow-zinc-600 hover:cursor-pointer hover:-translate-y-0.5'>
            <Link to={`videogames/${route}`}>
                <img className='w-11/12 h-3/6 m-3 rounded-2xl' src={image} alt={name} />
                <div className='font-bold text-xl flex-col '>
                    <h1 className='text-gray-400 text-base my-3'>{name}</h1>
                    <h3 className='text-gray-500 text-xs '>{genres.map((g, i) => {
                        if(genres.length - 1 === i) return g.name;
                        else return g.name + ' - ';
                    })}</h3>
                </div>
            </Link>
        </div>
    )
}