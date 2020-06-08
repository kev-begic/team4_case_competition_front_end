import React from 'react';
import './SingleMovie.module.css';
import classes from './SingleMovie.module.css';
import Aux from '../../hoc/Aux/Aux';



const singleMovie = ( props ) => (
    <Aux>
        <div type="text"
    className={classes.box}>
            <h1>{props.movie.title}</h1>
            <p>{props.movie.release_date}</p>
            </div>
    </Aux>
);

export default singleMovie;