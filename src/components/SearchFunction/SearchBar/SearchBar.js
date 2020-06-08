import React from 'react';

import classes from './SearchBar.module.css';

const searchBar = (props) => {

    return <input 
        type="text"
        className={classes.MakesRed}
        onChange={props.searchHandler}
        value={props.searchString} />;
}

export default searchBar;