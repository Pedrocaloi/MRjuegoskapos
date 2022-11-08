import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions/index.js';

import './SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name !== ''){
            let found = getVideogames(name)
            dispatch(found)
            setName('');
        }
    }

    return(
        <div className='flex flex-row space-x-2'>
            <input 
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type='text' 
                placeholder='Buscar juego...' 
                onChange={e => handleInputChange(e)}
                value={name}
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-s py-2 px-3 rounded-lg inline-flex items-center duration-200' onClick={e => handleSubmit(e)}>Buscar</button>

            
        </div>
    )

}