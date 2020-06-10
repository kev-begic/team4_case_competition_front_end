import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import './ClickedContent.module.css';
import SingleMovie from '../results/SingleResult/SingleMovie'
import classes from './ClickedContent.module.css'
import SingleShow from '../results/SingleResult/SingleShow'

const clickedMovie = ( props ) => (

    <Aux>
        <div>
            <h1>{props.movie.title}</h1>
            <table> 
                <tbody>
                <tr>
                    <td>Rating: {props.movie.rating}</td>
                    <td>Popularity: {props.movie.popularity}</td>
                </tr>
                <tr>
                    <td>Vote Average: {props.movie.vote_average}</td>
                    <td>Vote Count: {props.movie.vote_count}</td>
                </tr>
                <tr>
                    <td>Format: Movie</td>
                    <td>Original Language: {props.movie.original_language}</td>
                </tr>
                </tbody>
            </table>
            <br></br>
            <p>Released: {props.movie.release_date}</p>
            <p >Streaming Platforms: {props.movie.streaming_platform.join(", ")}</p>
            <p>Production Companies: {props.movie.production_companies.join(", ")}</p>
            <p>Overview: {props.movie.overview}</p>    
        </div>
        <br></br>
        <hr/>
        <div className={classes.suggested}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {getDisplay(props.otherResults[0], props.resultsClickedHandler)}
                        </td>
                        <td>
                            {getDisplay(props.otherResults[1], props.resultsClickedHandler)}
                        </td>
                        <td>
                            {getDisplay(props.otherResults[2], props.resultsClickedHandler)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Aux>
);

let getDisplay = (object, resultsClickedHandler) => {
    let result;
    console.log(object);
    if("release_date" in object){
        result = <SingleMovie key={Math.random()} movie={object} resultsClickedHandler={resultsClickedHandler} />;
    } else{
        result = <SingleShow key={Math.random()} show={object} resultsClickedHandler={resultsClickedHandler} />;
    }
    return(result);
}

export default clickedMovie;