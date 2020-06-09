import React from 'react';

import classes from './SearchBar.module.css';

const searchBar = (props) => {
    return (
            <input 
            type="text"
            placeholder="Find the right movie/television show..."
            className={classes.SearchBar}
            onChange={props.searchHandler}
            onKeyDown={props.enterHandler}
            value={props.searchString} />
    );
}

export default searchBar;