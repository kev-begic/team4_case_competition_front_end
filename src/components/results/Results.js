import React from 'react';

import './SingleResult/SingleResult.module.css';
import SingleMovie from './SingleResult/SingleMovie';
import SingleShow from './SingleResult/SingleShow';
import classes from './Results.module.css';

let fillTopTen = (array, clickHandler) => {
    const result = [];
    let num = 10;

    for(const [index, value] of array.slice(0, num).entries()){
<<<<<<< HEAD
        if("release_date" in value){
=======
        if ('release_date' in value) {
>>>>>>> 01855cdde98b7e5373ad94c3d11668cfbfbdc767
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
