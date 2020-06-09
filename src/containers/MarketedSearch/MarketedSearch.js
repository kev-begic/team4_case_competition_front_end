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
      "netflix", "hbo"
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
      "netflix", "amazon_prime"
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

class MarketedSearch extends Component {

    // Full state
    state = {
        uniqueID: 0,
        top_n_movies: [ ], //subset of ALL_CONTENT
        movie_clicked: false,
        show_this_advertisement: "id_for_advertisement",

        search_state : {
            user_query: "Search",
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
        let movies_array = [...this.state.top_n_movies]
        movies_array = this.populateTopMoviesFromSearch();
        let top_stream = this.show_this_advertisement;
        top_stream = this.findTopStreamingPlatform(movies_array);
        this.setState({
          search_state : updatedSearchState,
          top_n_movies : movies_array,
          show_this_advertisement : top_stream
        });
    }

    movieClickedHandler = (event) => {
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

    // updates top streaming platform for user based on search results
    findTopStreamingPlatform(movies_array) {
      let platform_map = new Map();
      platform_map.set("hbo", 0);
      platform_map.set("amazon_prime", 0);
      platform_map.set("netflix", 0);
      for (var movie of movies_array) {
        let platform_array = movie.streaming_platform;
        for (var platform of platform_array){
          let curr_total = platform_map.get(platform);
          platform_map.set(platform, curr_total + 1);
        }
      }
      console.log(platform_map);
      var get_entries = platform_map.entries();
      let highest_tally = "hbo";
      for(var ele of get_entries)
        if (ele[1] > platform_map.get(highest_tally)) {
          highest_tally = ele[0];
        }
        return highest_tally;
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
                    results={this.state.top_n_movies}
                    resultsClickedHandler={this.movieClickedHandler}
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
