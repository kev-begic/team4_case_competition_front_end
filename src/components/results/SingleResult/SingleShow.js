import React from 'react';
import './SingleResult.module.css';
import classes from './SingleResult.module.css';
import Aux from '../../../hoc/Aux/Aux';



const singleShow = ( props ) => (
    <Aux>
        <div
            id={props.show.imdb}
            onClick={props.resultsClickedHandler} >
            <h1>{props.show.title}</h1>
            <p>Type: TV Show</p>
            <p>Streaming: {props.show.streaming_platform.join(", ")}</p>
            </div>
    </Aux>
);

export default singleShow;
