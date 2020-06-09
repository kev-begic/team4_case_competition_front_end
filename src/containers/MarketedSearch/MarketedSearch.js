import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'
import SearchFunction from '../../components/SearchFunction/SearchFunction';
import Results from '../../components/results/Results'

// Array of all movies and shows required for initial search
const ALL_CONTENT = [{
    "title": "In the Shadow of the Moon",
    "release_date": "2019-09-21",
    "rating": "NR",
    "streaming_platform": [
      "netflix"
    ],
    "production_companies": [
      "42",
      "Automatik Entertainment",
      "Nightshade Productions"
    ],
    "imdb": "tt8110640",
    "vote_count": 196,
    "vote_average": 6.2,
    "original_language": "en",
    "popularity": 48.123,
    "overview": "In 1988, Philadelphia police officer Thomas \"Locke\" Lockhart, hungry to become a detective, begins tracking a serial killer whose crimes defy scientific explanation. When the killer mysteriously resurfaces nine years later, Locke's obsession with finding the truth threatens to destroy his career, his family, and possibly his sanity."
  },
  {
    "title": "In the Tall Grass",
    "release_date": "2019-09-19",
    "rating": "NR",
    "streaming_platform": [
      "netflix"
    ],
    "production_companies": [
      "Copperheart Entertainment"
    ],
    "imdb": "tt4687108",
    "vote_count": 301,
    "vote_average": 5.5,
    "original_language": "en",
    "popularity": 72.919,
    "overview": "After hearing a young boy's cry for help, a sister and brother venture into a vast field of tall grass in Kansas but soon discover there may be no way out ... and that something evil lurks within."
  },
  {
    "title": "El Camino: A Breaking Bad Movie",
    "release_date": "2019-10-11",
    "rating": "NR",
    "streaming_platform": [
      "netflix"
    ],
    "production_companies": [
      "Sony Pictures Television",
      "High Bridge Productions",
      "Gran Via Productions"
    ],
    "imdb": "tt9243946",
    "vote_count": 580,
    "vote_average": 7.3,
    "original_language": "en",
    "popularity": 140.641,
    "overview": "In the wake of his dramatic escape from captivity, Jesse Pinkman must come to terms with his past in order to forge some kind of future."

}];

class MarketedSearch extends Component {

    // Full state
    state = {
        uniqueID: 0,
        top_n_movies: [ ], //subset of ALL_CONTENT
        movie_clicked: false,
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

    searchQueryChangedHandler = (event) => {
        const query = event.target.value;
        let updatedSearchState = {
            ...this.state.search_state
        };
        updatedSearchState.user_query = query;
        console.log(updatedSearchState.user_query);
        this.setState({
            search_state : updatedSearchState
        });
    };

    searchPerformedChangedHandler = (event) => {
        let updatedSearchState = {
            ...this.state.search_state
        };
        updatedSearchState.is_search_performed = true;
        console.log("clicked button")
        console.log(updatedSearchState.user_query);
        this.setState({
            search_state : updatedSearchState
        });

        // populate top_n_movies
    }

    render() {
        return( 
            <Aux>
                <SearchFunction 
                    searchState={this.state.search_state.user_query} 
                    searchChangeHandler={this.searchQueryChangedHandler} 
                    searchPerformedHandler={this.searchPerformedChangedHandler}/>
                
                {/* change to top n movie state */}
                <Results 
                    results={ALL_CONTENT} 
                 />

                {/*
                    Data Analytics by pulling from our own API
                    - Most clicked movie
                    - Recommended streamer provide
                 */}
            </Aux>
        );
    }
}

export default MarketedSearch;