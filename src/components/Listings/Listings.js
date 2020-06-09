import React from 'react';

import Listing from './Listing/Listing';
import classes from './Listings.module.css';

const listing = ( props ) => {

    let otherListings = props.listings.map( (listing) => {
        let reformattedObject = { };

        reformattedObject["title"] = listing.title;
        reformattedObject["stream_platforms"] = listing.streaming_platform; 
        reformattedObject["release_date"] = listing.release_date;
        reformattedObject["overview"] = listing.overview;

        return <Listing 
            key={listing.imdb}
            dataKey={listing.imdb}
            information={reformattedObject}
            listingHandler={props.listingClicked}/>;
    });

    return (
        <div className={classes.Listings} >
        {otherListings}
        </div>
    )
};

export default listing;