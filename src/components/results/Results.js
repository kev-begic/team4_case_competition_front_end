import React from 'react';

import './SingleResult/SingleResult.module.css';
import SingleMovie from './SingleResult/SingleMovie';
import SingleShow from './SingleResult/SingleShow';
import classes from './Results.module.css';

let fillTopTen = (array, clickHandler) => {
    const result = [];
    let num = 10;

    for(const [index, value] of array.slice(0, num).entries()){
        if ('release_date' in value) {
            result.push(<SingleMovie key={Math.random()} movie={value} resultsClickedHandler={clickHandler}/>);
        } else {
            result.push(<SingleShow key={Math.random()} show={value} resultsClickedHandler={clickHandler}/>);
        }
    }

    return(
        <table className={classes.results}>
            <tbody>
                {createTable(result)}
            </tbody>
            
        </table>
    );
}

let createTable = (arrayOfDisplays) => {
    let result = [];
    for(let i = 0; i < arrayOfDisplays.length; i=i+2 ){
        if(i+1 < arrayOfDisplays.length){
            result.push((<tr key={Math.random()}><td>{arrayOfDisplays[i]}</td><td>{arrayOfDisplays[i+1]}</td></tr>));
        } else{
            result.push(<tr key={Math.random()}><td>{arrayOfDisplays[i]}</td></tr>)
        }
    }
    return(result);
}

const results = (props) => {return(fillTopTen(props.results, props.resultsClickedHandler))};

export default results;
