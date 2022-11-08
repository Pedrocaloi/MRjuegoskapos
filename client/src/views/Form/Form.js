import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogame, getPlatforms }from '../../redux/actions/index.js';
import Nav from '../../components/Nav/Nav.js';

import style from './Form.module.css';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Tu juego debe tener un nombre';
    }
    else if(input.name.length > 30){
        errors.name = 'Es un nombre muy largo';
    }
    else if(!input.description){
        errors.description = 'Debes ingresar una descripcion';
    }
    else if(input.description.length < 10){
        errors.description = 'La descripcion es muy corta';
    }
    else if(!input.release_date){
        errors.release_date = 'Debes ingresar una fecha de lanzamiento';
    }
    else if(!input.rating){
        errors.rating = 'Es necesario ingresar una puntuacion';
    }
    else if(isNaN(parseInt(input.rating))){
        errors.rating = 'La puntuacion debe ser un numero';
    }
    else if(parseInt(input.rating) > 5){
        errors.rating = 'La puntuacion debe ser menor o igual a 5';
    }
    else if(parseInt(input.rating) < 0){
        errors.rating = 'La puntuacion debe ser mayor a 0';
    }
    else if (!input.image){
        errors.image = 'Debes ingresar el link de una imagen';
    }
    else if(input.platforms.length < 1){
        errors.platforms = 'Debes ingresar al menos una plataforma';
    }
    else if(input.platforms.length > 7){
        errors.platforms = 'Demasiadas plataformas seleccionadas';
    }
    else if(input.genres.length < 1){
        errors.genres = 'Debes seleccionar al menos 1 genero';
    }
    return errors;
}

export default function Form(){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const allGenres = useSelector(state => state.genres);
    const allPlatforms = useSelector(state => state.platforms);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name:'',
        description:'',
        release_date:'',
        rating:'',
        platforms:[],
        image:'',
        genres: []
    })

    useEffect(() => {
        dispatch(getPlatforms());
    },[dispatch]);
    useEffect(() => {
        dispatch(getGenres())
    },[dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    function handleSelect(e){
        let encontrado = false;
        
        input.genres.map(el => {
            if(el.name === e.target.value){
                encontrado = true;
            }
            return null;
        })
        if(!encontrado){
            let idGenre = '';

            allGenres.map(gen => {
                if(e.target.value === gen.name){
                    idGenre = gen.id
                }
                return null;
            })
            setInput({
                ...input,
                genres: [...input.genres, {name: e.target.value, id: idGenre}]
            })
        }
    }

    function handleSelectPf(e){
        let encontrado = false;

        input.platforms.map(el => {
            if(el === e.target.value){
                encontrado = true;
            }
            return null;
        })
        if(!encontrado){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!Object.getOwnPropertyNames(errors).length && input.name && input.description && input.release_date && input.rating && input.platforms && input.genres.length){
            let genresIds = [];

            input.genres.map(e => genresIds.push(e.id))
            dispatch(postVideogame({
                name: input.name,
                description: input.description,
                release_date: input.release_date,
                rating: input.rating,
                platforms: input.platforms,
                image: input.image,
                idGenres: genresIds
            }));
            alert('Juego creado con exito! 🎮');
            setInput({
                name:'',
                description:'',
                release_date:'',
                rating:'',
                platforms:'',
                image:'',
                genres: []
            })
            history.push('/home');
        }else{
            setErrors(validate({
                ...input, 
                [e.target.name]: e.target.value
            }))
        }
    }

    function handleDeleteGenres(e){
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre.name !== e)
        })
    }

    function handleDeletePf(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(pf => pf !== e)
        })
    }

    return (
        <div className='min-h-screen'>
            <Nav/>
            <div className={style.formContainer}>
                <form onSubmit={e => handleSubmit(e)} className={style.form}>
                    <div className={style.boxInputs}>
                        <div className={style.boxLabelInput}>
                            <label className={style.formLabel}>Nombre</label>
                            <input className={style.formInput} type="text" value={input.name} name='name' onChange={e => handleChange(e)}/>
                            {
                                errors.name && (
                                    <p className={style.error}>{errors.name}</p>
                                )
                            }
                        </div>
                        <div className={style.boxLabelInput}>
                            <label className={style.formLabel}>Descripción</label>
                            <input className={style.formInput} type='text' value={input.description} name='description' onChange={e => handleChange(e)}/>
                            {
                                errors.description && (
                                    <p className={style.error}>{errors.description}</p>
                                )
                            }
                        </div>
                        <div className={style.boxLabelInput}>
                            <label className={style.formLabel}>Fecha de Lanzamiento</label>
                            <input className={style.formInputDate} type='date' value={input.release_date} name='release_date' onChange={e => handleChange(e)}/>
                            {
                                errors.release_date && (
                                    <p className={style.error}>{errors.release_date}</p>
                                )
                            }
                        </div>
                        <div className={style.boxLabelInput}>
                            <label className={style.formLabel}>Puntuación</label>
                            <input className={style.formInput} type='text' value={input.rating} name='rating' onChange={e => handleChange(e)}/>
                            {
                                errors.rating && (
                                    <p className={style.error}>{errors.rating}</p>
                                )
                            }
                        </div>
                        <div className={style.boxLabelInput}>
                            <label className={style.formLabel}>Imagen</label>
                            <input className={style.formInput} type='text' value={input.image} name='image' onChange={e => handleChange(e)}/>
                            {
                                errors.image && (
                                    <p className={style.error}>{errors.image}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className={style.boxSelects}>
                        <div className={style.boxSelect}>
                            <select className={style.formSelect} onChange={e => {
                                handleSelectPf(e)
                                e.target.options[0].selected = true
                            }}>
                            <option value='selected' hidden>Plataforma/s</option>
                            {
                                allPlatforms?.sort(function(a, b){
                                    if(a < b) return - 1;
                                    if(a > b) return 1;
                                    return 0;
                                }).map(platform => {
                                    return (
                                        <option className={style.selectOption} value={platform} key={platform}>{platform}</option>
                                    )
                                })
                            }
                            </select>
                            <div className={style.boxGenresSelected}>
                                {
                                    errors.platforms && (input.platforms.length < 1) && (
                                        <p className={style.error}>{errors.platforms}</p>
                                    )
                                }
                                {
                                    input.platforms.map(el => {
                                        return (
                                            <div key={el} className={style.cube}>
                                                <div className={style.cubeContent}>
                                                    <p className={style.LiText}>{el}</p>
                                                    <button className={style.LiButton} onClick={() => handleDeletePf(el)}>❌</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={style.boxSelect}>
                            <select className={style.formSelect} onChange={e => {
                                handleSelect(e)
                                e.target.options[0].selected = true
                            }}>
                            <option value='selected' hidden>Genero/s</option>
                            {
                                allGenres?.sort(function(a, b){
                                    if(a.name < b.name) return - 1;
                                    if(a.name > b.name) return 1;
                                    return 0;
                                }).map(genre => {
                                    return (
                                        <option className={style.selectOption} value={genre.name} key={genre.id}>{genre.name}</option>
                                    )
                                })
                            }
                            </select>
                            <div className={style.boxGenresSelected}>
                                {
                                    input.genres.length < 1 && (
                                        <p className={style.error}>{errors.genre}</p>
                                    )
                                }
                                {
                                    input.genres.map(el => {
                                        return (
                                            <div key={el.id} className={style.cube}>
                                                <div className={style.cubeContent}>
                                                    <p className={style.LiText}>{el.name}</p>
                                                    <button className={style.LiButton} onClick={() => handleDeleteGenres(el.name)}>❌</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={style.boxButton}>
                        <button className={style.formButton} type='submit'>
                            <div className={style.formButtonContent}>
                                Guardar
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}