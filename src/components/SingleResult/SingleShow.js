import React from 'react';
import './SingleResult.module.css';
import classes from './SingleResult.module.css';
import Aux from '../../hoc/Aux/Aux';



const singleShow = ( props ) => (
    <Aux>
        <div 
            type="text"
            className={classes.box}
            >
            <h1>{props.show.title}</h1>
            <p>Type: TV Show</p>
            <p>Streaming: {formatList(props.show.streaming_platform)}</p>
            </div>
    </Aux>
);

function formatList( list ) {
    return (
        <ul>
        {list.map(item => <li>{item}</li>)}
        </ul>
    );
  }

export default singleShow;