import React from 'react';
import './SingleResult.module.css';
import classes from './SingleResult.module.css';
import Aux from '../../hoc/Aux/Aux';



const singleMovie = ( props ) => (


    <Aux>
        <div 
            type="text"
            className={classes.box}
            >
            <h1>{props.movie.title} ({props.movie.release_date.substring(0, 4)})</h1>
            <p>Type: Movie</p>
            <p>Streaming: {props.movie.streaming_platform}</p>
            </div>
    </Aux>
);

export default singleMovie;