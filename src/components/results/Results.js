import React from 'react';
import './SingleResult/SingleResult.module.css';
import SingleMovie from './SingleResult/SingleMovie';
import SingleShow from './SingleResult/SingleShow';



let fillTopTen = ( array ) => {
    console.log("called");
    const result = [];
    for(const [index, value] of array.entries()){
        if("title" in value){
            result.push(<SingleMovie key={value.imdb} movie={value} />);
        } else{
            result.push(<SingleShow key={value.imdb} show={value} />);
        }
    }
    console.log(result);
    return(
        <div>
            {result}
        </div>
            
    );
}

const results = ( props ) => {return(fillTopTen(props.results))};


export default results;