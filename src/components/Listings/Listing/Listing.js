import React from 'react';

import classes from './Listing.module.css';

const listing = ( props ) => {
    return (
        <div className={classes.ListingItem}
             onClick={props.listingHandler} 
             id={props.dataKey}
        >
            <h2>{props.information.title}</h2>
            <p>{props.information.stream_platforms.join(' ')}</p>
            <p>{props.information.release_date}</p>
            <p>{props.information.overview}</p>
        </div>
    );
};

export default listing;