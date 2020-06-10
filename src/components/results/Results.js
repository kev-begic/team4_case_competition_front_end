import React from 'react';

import './SingleResult/SingleResult.module.css';
import SingleMovie from './SingleResult/SingleMovie';
import SingleShow from './SingleResult/SingleShow';
import Aux from '../../hoc/Aux/Aux';
import classes from './Results.module.css';

let fillTopTen = (array, clickHandler) => {
    const result = [];
    let num = 10;

    for(const [index, value] of array.slice(0, num).entries()){
        if ("title" in value) {
            result.push(<SingleMovie key={Math.random()} movie={value} resultsClickedHandler={clickHandler}/>);
        } else {
            result.push(<SingleShow key={Math.random()} show={value} resultsClickedHandler={clickHandler}/>);
        }
    }
    return(
        <div className={classes.Results}>
            {result}
        </div>
    );
}

const results = (props) => {return(fillTopTen(props.results, props.resultsClickedHandler))};


export default results;
