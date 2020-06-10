import React from 'react';
import './SingleResult.module.css';
import classes from './SingleResult.module.css';



const singleMovie = ( props ) => (
    <div 
        id={props.movie.imdb} 
        platforms={props.movie.streaming_platform.join(" ")}
        className={classes.box} 
        onClick={props.resultsClickedHandler}>
        <h1>{props.movie.title} ({props.movie.release_date.substring(0, 4)})</h1>
        <p>Type: Movie</p>
        <div>Streaming: {props.movie.streaming_platform.join(", ")}</div>
    </div>
);


export default singleMovie;
