import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import SearchFunction from '../../components/SearchFunction/SearchFunction';
import Advertisement from '../../components/Advertisement/Advertisement';
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

  },

  {
    "title": "Inner",
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

  },

  {
    "title": "Park",
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

    // callBack that automatically sends event
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

    // Send POST request to back-end
    sendStateToBackEnd() {
      console.log('sending state');
    }

    componentDidMount() {
      // Initialize movie array...
      window.addEventListener("beforeunload", this.sendStateToBackEnd);
    }
    
    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.sendStateToBackEnd);
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
        let movies_array = [...this.state.top_n_movies ]
        movies_array = this.populateTopMoviesFromSearch();
        this.setState({
          top_n_movies : movies_array
        });
    }

    movieClickedHandler = (event) => {
      console.log("here");
        let updatedMovieClickedState = {
            ...this.state.clicked_movie_state
        };
        updatedMovieClickedState.clicked_movie_id = 7;
        this.setState({
            clicked_movie_id : updatedMovieClickedState
        });
    };

    // based on user search query, get 10 matching movies/shows to display
    populateTopMoviesFromSearch() {
      // matches user_query to all titles in the ALL_CONTENT array
      let exact_matches = ALL_CONTENT.filter(movie => movie.title.toLowerCase().includes(this.state.search_state.user_query.toLowerCase()));
      if (exact_matches.length < 10) {
        let query_array = this.state.search_state.user_query.split(" ");
        return this.getMoreMatchingTitles(exact_matches, query_array);
      } else {
        return exact_matches;
      }
    }

    // if not enough matches, filter on less words in the query - recur until 10 matches found
    getMoreMatchingTitles(exact_matches, query_array) {
      if (exact_matches.lenght >= 10 | query_array.length === 0) {
        return exact_matches;
      } else {
        let join_query = query_array.join(" ");
        let just_titles = exact_matches.map(movie => movie.title);
        let filtered_out_matches = ALL_CONTENT.filter(movie => !just_titles.includes(movie.title));
        let new_matches = filtered_out_matches.filter(movie => movie.title.toLowerCase().includes(join_query.toLowerCase()));
        // combine original matches with new matches
        let joined_array = exact_matches.concat(new_matches);
        // shorten the search query by one term
        query_array.pop();
        return this.getMoreMatchingTitles(joined_array, query_array);
      }
    }

    // Updates search_state.user_query 
    searchQueryChangedHandler = (event) => {
        const query = event.target.value;
        let updatedSearchState = {
            ...this.state.search_state
        };
        updatedSearchState.user_query = query;
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

    // Updates search_state on user button click of enter
    searchPerformedChangedHandler = () => {
        this.resetSearchState();

        let updatedSearchState = {
            ...this.state.search_state
        };

        console.log("search performed");

        updatedSearchState.is_search_performed = true;

        let movies_array = {
          ...this.state.top_n_movies
        };

        movies_array = this.populateTopMoviesFromSearch();

        this.setState({
            top_n_movies : movies_array,
            search_state : updatedSearchState,
            clicked_movie_state : this.resetMovieState()
        });
        
        console.log("movies coming");
        console.log(movies_array);
        console.log(this.state.top_n_movies);
    }

    // updates top streaming platform for user based on search results
    findTopStreamingPlatform() {

    }

    render() {
        return(
            <Aux>
              <Advertisement 
                streamingPlatform={this.state.clicked_movie_state.top_streaming_platform}/>
              <SearchFunction
                  searchState={this.state.search_state.user_query}
                  searchChangeHandler={this.searchQueryChangedHandler}
                  searchPerformedHandler={this.searchPerformedChangedHandler}/>
              <Results
                  results={this.state.top_n_movies}
                  resultsClickedHandler={this.movieClickedHandler}
                />
            </Aux>
        );
    }
}

export default MarketedSearch;