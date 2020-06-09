import React from 'react';
import './SingleResult/SingleResult.module.css';
import SingleMovie from './SingleResult/SingleMovie';
import SingleShow from './SingleResult/SingleShow';



let fillTopTen = ( array, clickList ) => {
    console.log("called");
    const result = [];
    for(const [index, value] of array.entries()){
        if("title" in value){
            result.push(<SingleMovie 
                key={value.imdb} 
                movie={value} 
                listingHandler={clickList}/>);
        } else{
            result.push(<SingleShow 
                key={value.imdb} 
                show={value}
                listingHandler={clickList}/>);
        }
    }
    console.log(result);
    return(
        <div>
            {result}
        </div>
            
    );
}

const results = ( props ) => {return(fillTopTen(props.results, props.clickList))};


export default results;