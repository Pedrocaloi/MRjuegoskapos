import React from 'react';
import { Link } from 'react-router-dom';
import LandingText from '../../img/LandingText.png';

import './LandingPage.css';


export default function LandingPage(){
    return(
        <div className='container h-screen mx-auto flex flex-col'>
            <img src={LandingText}/>
            <Link to='/home'>
                <button className='bg-gray-800 hover:bg-gray-700 text-white font-bold text-2xl py-4 px-6 border-b-4 border-red-700 hover:border-red-500 rounded duration-300 mt-10'>Ir a Home</button>
            </Link>
        </div>
    )
}

