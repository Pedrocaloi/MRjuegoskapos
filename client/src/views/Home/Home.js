import React from 'react';

import Nav from '../../components/Nav/Nav.js';
import Videogames from '../../components/Videogames/Videogames.js';

import './Home.css'

export default function Home(){
    return(
        <div className=' min-h-screen h-max'>
            <Nav/>
            <Videogames/>
        </div>
    )
}