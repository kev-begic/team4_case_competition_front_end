import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import './ClickedContent.module.css';
import classes from './ClickedContent.module.css';
import SingleShow from '../results/SingleResult/SingleShow'
import SingleMovie from '../results/SingleResult/SingleMovie'




const clickedShow = ( props ) => (
    <Aux>
        <div>
            <h1>{props.show.title}</h1>
            <table> 
                <tbody>
                <tr>
                    <td>Popularity: {props.show.popularity}</td> 
                </tr>
                <tr>
                    
                    <td>Vote Average: {props.show.vote_average}</td>
                    <td>Vote Count: {props.show.vote_count}</td>
                </tr>
                <tr>
                    <td>Format: Movie</td>
                    <td>Original Language: {props.show.original_language}</td>
                </tr>
                </tbody>
            </table>
            <br></br>
            <p>Streaming Platforms: {props.show.streaming_platform.join(", ")}</p>
            <p>Production Companies: {props.show.production_companies.join(", ")}</p>
            <p>Overview: {props.show.overview}</p>
        </div>
        <br></br>
        <hr></hr>
        <div className={classes.suggested}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {getDisplay(props.otherResults[0])}
                            
                        </td>
                        <td>
                        {getDisplay(props.otherResults[1])}
                        </td>
                        <td>
                        {getDisplay(props.otherResults[2])}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Aux>
);

let getDisplay = (object) => {
    let result;
    console.log(object);
    if("release_date" in object){
        result = <SingleMovie movie={object} />;
    } else{
        result = <SingleShow show={object} />;
    }
    return(result);
}

export default clickedShow;