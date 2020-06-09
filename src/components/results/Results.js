import React from 'react';
import './SingleResult/SingleResult.module.css';
import SingleMovie from './SingleResult/SingleMovie';
import SingleShow from './SingleResult/SingleShow';



let fillTopTen = (array, clickHandler) => {
    console.log("called");
    const result = [];
    let num = 10;
    if (array.length < 10) {
      let num = array.length
    }
    for(const [index, value] of array.slice(0, num).entries()){
        if("title" in value){
            result.push(<SingleMovie key={Math.random()} movie={value} resultsClickedHandler={clickHandler}/>);
        } else{
            result.push(<SingleShow key={Math.random()} show={value} resultsClickedHandler={clickHandler}/>);
        }
    }
    console.log(result);
    return(
        <div>
            {result}
        </div>

    );
}

const results = (props) => {return(fillTopTen(props.results, props.resultsClickedHandler))};


export default results;
