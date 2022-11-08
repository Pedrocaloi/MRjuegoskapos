import React from 'react';

import './Pagination.css';

export default function Pagination({gamesPerPage, allVideogames, pagination, currentPage}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allVideogames/gamesPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    if(allVideogames){
        return (
            <nav>
                <ul className='flex'>
                    <button className='bg-gray-700 text-zinc-100 rounded-lg p-2.5 m-2 mt-10 mb-10 hover:bg-gray-900 duration-200 hover:cursor-pointer' disabled ={currentPage<=1} onClick={()=> pagination(currentPage - 1) }>{"⮜"}</button>
                    {pageNumbers.length > 1 && 
                    pageNumbers.map(number => (
                        <li key={number} className='inline'>
                            <button className='bg-gray-700 text-zinc-100 rounded-lg p-2.5 m-2 mt-10 mb-10 hover:bg-gray-900 duration-200 hover:cursor-pointer' onClick={() => pagination(number)}><strong>{number}</strong></button>
                        </li>
                    ))}
                    <button className='bg-gray-700 text-zinc-100 rounded-lg p-2.5 m-2 mt-10 mb-10 hover:bg-gray-900 duration-200 hover:cursor-pointer' disabled={pageNumbers.length < currentPage + 1 ? true : false} onClick={()=>pagination(currentPage + 1)}>{"⮞"}</button>
                </ul>
            </nav>
        )
    } else {
        return null
    }

    
}