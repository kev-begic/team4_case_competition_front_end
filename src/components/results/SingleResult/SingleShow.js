import React from 'react';
import './SingleResult.module.css';
import classes from './SingleResult.module.css';
import Aux from '../../../hoc/Aux/Aux';



const singleShow = ( props ) => (
    <div
        id={props.show.imdb}
        className={classes.box}
        onClick={props.resultsClickedHandler} >
        <h1>{props.show.title}</h1>
        <p>Type: TV Show</p>
        <p>Streaming: {props.show.streaming_platform.join(", ")}</p>
        </div>
);

export default singleShow;
