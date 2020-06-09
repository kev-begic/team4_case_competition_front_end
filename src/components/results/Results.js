import React from 'react';
import './SingleResult/SingleResult.module.css';
import SingleMovie from './SingleResult/SingleMovie';
import SingleShow from './SingleResult/SingleShow';



let fillTopTen = ( array ) => {
    console.log("called");
    const result = [];
    let num = 10;
    if (array.length < 10) {
      let num = array.length
    }
    for(const [index, value] of array.slice(0, num).entries()){
        if("title" in value){
            result.push(<SingleMovie key={Math.random()} movie={value} resultsClickedHandler={value.resultsClickedHandler}/>);
        } else{
            result.push(<SingleShow key={Math.random()} show={value} />);
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
