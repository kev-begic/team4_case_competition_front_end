import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';


const searchFunction = ( props ) => (
    <Aux>
        <p>{props.searchState}</p>
        <SearchBar 
            searchString={props.searchState} 
            searchHandler={props.searchChangeHandler}/> 
        <SearchButton 
            buttonHandler={props.searchPerformedHandler}/>
    </Aux>
);

export default searchFunction;