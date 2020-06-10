import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import './ClickedContent.module.css';
import classes from './ClickedContent.module.css';
import SingleShow from '../results/SingleResult/SingleShow'




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
            <br></br>
            <p>Overview: {props.show.overview}</p>
        </div>
        <div className={classes.suggested}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <SingleShow show={props.otherResults[0]} />
                            
                        </td>
                        <td>
                            <SingleShow show={props.otherResults[1]} />
                        </td>
                        <td>
                            <SingleShow show={props.otherResults[2]} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Aux>
);

export default clickedShow;