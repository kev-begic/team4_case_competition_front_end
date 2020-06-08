import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'

// Array of all movies and shows required for initial search
const ALL_CONTENT = [ ];

class MarketedSearch extends Component {

    // Full state
    state = {
        uniqueID: 0,
        top_n_movies: [ ], //subset of ALL_CONTENT
        show_this_advertisement: "id_for_advertisement",

        search_state : {
            user_query: "updated for each character user types",
            is_search_performed: false
        },

        clicked_movie_state : {
            clicked_movie_id : "some_string_12kjbk31j4",
            top_streaming_platform : "hbo, amazon_prime, etc", // taken from max of top_n_movies
            movies_on_platform : [ ]
        }
    };
    
    render() {
        
        console.log(this.state);

        return( 
            <Aux>
                <div>Advertisement</div>
                <div>Search Bar ~OR~ Current Movie</div>
                <div>Top N Movies</div>
            </Aux>
        );
    }
}

export default MarketedSearch;