import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import { useHistory, Link } from 'react-router-dom';

import './Nav.css'; 
export default function Nav(){
    const history = useHistory();
    
    return(
        <nav className='nav mx-auto h-24 container flex flex-row' >           
            <div className='container space-x-10'>
                <Link to={'/home'}>
                    <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center duration-200'>Home</button> 
                </Link>                   
                <Link to={'/form'}>
                    <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center duration-200'>Añadir Videojuego</button>
                </Link>                   
            </div>
            <div className=''>                 
                {history.location.pathname === '/home'? <SearchBar />: <></>}                 
            </div> 
        </nav>
    )
}