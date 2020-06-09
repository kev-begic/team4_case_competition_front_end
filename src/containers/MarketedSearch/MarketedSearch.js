import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import SearchFunction from '../../components/SearchFunction/SearchFunction';
import Advertisement from '../../components/Advertisement/Advertisement';

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

const clicked_test = [{
        "title": "Halloween",
        "release_date": "2018-10-18",
        "rating": "R",
        "streaming_platform": [
          "hbo"
        ],
        "production_companies": [
          "Universal Pictures",
          "Blumhouse Productions",
          "Trancas International Films",
          "Rough House Pictures"
        ],
        "imdb": "tt1502407",
        "vote_count": 2315,
        "vote_average": 6.4,
        "original_language": "en",
        "popularity": 28.043,
        "overview": "Laurie Strode comes to her final confrontation with Michael Myers, the masked figure who has haunted her since she narrowly escaped his killing spree on Halloween night four decades ago."
      },
      {
        "title": "Bad Times at the El Royale",
        "release_date": "2018-10-04",
        "rating": "NR",
        "streaming_platform": [
          "hbo"
        ],
        "production_companies": [
          "20th Century Fox",
          "Goddard Textiles",
          "TSG Entertainment"
        ],
        "imdb": "tt6628394",
        "vote_count": 1728,
        "vote_average": 6.8,
        "original_language": "en",
        "popularity": 18.966,
        "overview": "Lake Tahoe, 1969. Seven strangers, each one with a secret to bury, meet at El Royale, a decadent motel with a dark past. In the course of a fateful night, everyone will have one last shot at redemption."
      }
]

class MarketedSearch extends Component {

    state = {
        uniqueID: 0,
        top_n_movies: [ ], //subset of ALL_CONTENT
        show_this_advertisement: "id_for_advertisement",

        search_state : {
            user_query: " ",
            is_search_performed: false
        },

        clicked_movie_state : {
            movie_clicked: false,
            clicked_movie_id : "some_string_12kjbk31j4",
            top_streaming_platform : "netflix", // taken from max of top_n_movies
            movies_on_platform : [ ]
        }
    };

    // Updates search_state.user_query 
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

    // Method to allow Enter-Key to update search_state.user_query
    pressEnterHandler = ( event ) => {
        if (event.key === 'Enter') {
            this.searchPerformedChangedHandler();
        }
    }

    // Clears search_state
    resetSearchState = () => {
        let updatedSearchState = {
            ...this.state.search_state
        };
        
        updatedSearchState.user_query = " ";
        updatedSearchState.is_search_performed = false;

        return updatedSearchState;
    }

    // Clears clicked_movie_state
    resetMovieState = () => {
        let updatedMovieState = {
            ...this.state.clicked_movie_state
        };

        updatedMovieState.movie_clicked = false;
        updatedMovieState.clicked_movie_id = " ";
        updatedMovieState.top_streaming_platform = "netflix";
        updatedMovieState.movies_on_platform = [ ];

        return updatedMovieState;
    }

    // Updates search_state on user button click of enter
    searchPerformedChangedHandler = () => {
        let updatedSearchState = {
            ...this.state.search_state
        };

        console.log("search performed");

        updatedSearchState.is_search_performed = true;

        this.setState({
            search_state : updatedSearchState,
            clicked_movie_state : this.resetMovieState()
        });

        console.log(this.state);
        this.sendStateToBackEnd();
    }

    // Modified listing for movie/show clicked;; modify for Carrie implementation
    clickedListingHandler = ( event ) => {
        const newListingID = event.currentTarget.getAttribute('id');
        let updatedMovieState = {
            ...this.state.clicked_movie_state
        };
        updatedMovieState.movie_clicked = true;
        updatedMovieState.clicked_movie_id = newListingID;

        // TODO: Given newListingID, find item in ALL_CONTENT 
        // setting top_streaming_platform to 1) the single platform 2) whatever playform we rank highest
        // && find 3 movies related to that platform/movie

        // _TESTING_ CODE
        updatedMovieState.top_streaming_platform = "hbo";
        updatedMovieState.movies_on_platform = clicked_test; // not actual functionality
        // EO_TESTING_ CODE

        console.log("updated movie state")
        console.log(updatedMovieState);

        this.setState({
            clicked_movie_state : updatedMovieState,
            search_state : this.resetSearchState()
        });
    }

    // Send POST request to back-end
    sendStateToBackEnd() {
      console.log('sending state');
    }

    componentDidMount() {
      window.addEventListener("beforeunload", this.sendStateToBackEnd);
    }
    
    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.sendStateToBackEnd);
    }

    render() {
        return( 
          <Aux>
            <Advertisement 
                streamingPlatform={this.state.clicked_movie_state.top_streaming_platform}/>
            <SearchFunction 
                searchState={this.state.search_state.user_query} 
                searchChangeHandler={this.searchQueryChangedHandler} 
                searchPerformedHandler={this.searchPerformedChangedHandler}
                pressEnter={this.pressEnterHandler} />
          </Aux>
        );
    }
}

export default MarketedSearch;