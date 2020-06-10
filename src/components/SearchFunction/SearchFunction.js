import React from 'react';

import classes from './SearchFunction.module.css'

import Aux from '../../hoc/Aux/Aux';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';


const searchFunction = ( props ) => (
    <div className={classes.SearchFunction}>
        <SearchBar 
            searchString={props.searchState} 
            searchHandler={props.searchChangeHandler}
            enterHandler={props.pressEnter} /> 
        <SearchButton 
            buttonHandler={props.searchPerformedHandler}/>
    </div>
);

export default searchFunction;