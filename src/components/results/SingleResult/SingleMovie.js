import React from 'react';
import './SingleResult.module.css';
import classes from './SingleResult.module.css';
import Aux from '../../../hoc/Aux/Aux';



const singleMovie = ( props ) => (
    <div type="text" className={classes.box} onClick={props.resultsClickedHandler}>
            <h1>{props.movie.title} ({props.movie.release_date.substring(0, 4)})</h1>
            <p>Type: Movie</p>
            <div>Streaming: {props.movie.streaming_platform.join(", ")}</div>
        </div>

);

function formatList( list ) {
    return (
        <ul>
        {list.map(item => <li>{item}</li>)}
        </ul>
    );
  }

export default singleMovie;
