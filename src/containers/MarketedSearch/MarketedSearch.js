import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import SearchFunction from '../../components/SearchFunction/SearchFunction';
import Advertisement from '../../components/Advertisement/Advertisement';
import Results from '../../components/results/Results'
// import getMovie from '../../api/get/getMovie'
// import getMovieID from '../../api/get/getMovieID'
// import getShow from '../../api/get/getShow'
// import getShowID from '../../api/get/getShowID'
import postUserID from '../../api/post/postUserID'
import postState from '../../api/post/postState'

class MarketedSearch extends Component {
    // Full state
    state = {

        all_movies: [],
        all_shows: [],

        moviesLoaded: false,
        showsLoaded: false,

        uniqueID: 0, // userID 
        top_n_movies: [ ],
        show_this_advertisement: "netflix", //topStreamingPlatformForSearch

        search_state : {
            user_query: "", // userQuery
            is_search_performed: false // searchPerformed
        },

        clicked_movie_state : {
            movie_clicked: false, // movieClicked
            clicked_movie_id : "", // movieID
            clicked_movie_obj: { },
            streaming_platform : "netflix", // taken from max of top_n_movies
            movies_on_platform : []
        }
    };

    // Send POST request to back-end
    sendPostState() {
      console.log('sending state');
    }

    componentWillMount() {
      this.renderMovies();
      this.renderShows();
    }

    componentDidMount() {
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

    renderMovies() {
      fetch('https://casecomp.konnectrv.io/movie')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              moviesLoaded: true,
              all_movies : responseJson })
          })
          .catch((error) => {
            console.error(error);
          });
    }

    renderMovieById(id) {
      fetch('https://casecomp.konnectrv.io/movie/' + id)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState(prevState => ({
              clicked_movie_state : {
                ...prevState.clicked_movie_state,
                clicked_movie_obj : responseJson,
                streaming_platform : responseJson.streaming_platform.join(" ")
              }
            }))
          })
          .catch((error) => {
            console.error(error);
          });
    }

    renderShows() {
      fetch('https://casecomp.konnectrv.io/show')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              showsLoaded: true,
              all_shows : responseJson })
          })
          .catch((error) => {
            console.error(error);
          });
    }

    renderShowById(id) {
      fetch('https://casecomp.konnectrv.io/show/' + id)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              clicked_show_obj : responseJson }) // Not yet in state
          })
          .catch((error) => {
            console.error(error);
          });
    }

    // Method to allow Enter-Key to update search_state.user_query
    pressEnterHandler = ( event ) => {
      if (event.key === 'Enter') {
          this.searchPerformedChangedHandler();
      }
    }

    searchQueryChangedHandler = (event) => {
      const query = event.target.value;
      let updatedSearchState = {
          ...this.state.search_state
      };
      updatedSearchState.user_query = query;
      this.setState({
          search_state : updatedSearchState
      });
    }

    searchPerformedChangedHandler = (event) => {
      let updatedSearchState = {
          ...this.state.search_state
      };

      updatedSearchState.is_search_performed = true;

      let movies_array = [...this.state.top_n_movies]
      movies_array = this.populateTopMoviesFromSearch(10);

      let top_stream = this.show_this_advertisement;
      top_stream = this.findTopStreamingPlatform(movies_array);

      this.setState({
        search_state : updatedSearchState,
        top_n_movies : movies_array,
        show_this_advertisement : top_stream
      });
    }

    movieClickedHandler = (event) => {
        const newListingId = event.currentTarget.getAttribute('id');
        this.renderMovieById(newListingId);

        let suggested_movies = this.populateTopMoviesFromSearch(2);
        suggested_movies.shift();

        let updatedResult = {
            ...this.state.clicked_movie_state
        };

        updatedResult.clicked_movie_id = newListingId;
        updatedResult.movie_clicked = true;
        updatedResult.movies_on_platform = suggested_movies;

        this.setState({
            clicked_movie_state : updatedResult, 
            search_state : this.resetSearchState()
        });
    };

    // based on user search query, get 10 matching movies/shows to display
    populateTopMoviesFromSearch( numMatches ) {
      // matches user_query to all titles in the ALL_CONTENT array
      let exact_matches = this.state.all_movies.filter(movie => movie.title.toLowerCase().includes(this.state.search_state.user_query.toLowerCase()));
      if (exact_matches.length < numMatches ) {
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
        let filtered_out_matches = this.state.all_movies.filter(movie => !just_titles.includes(movie.title));
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

      let get_entries = platform_map.entries();
      let highest_tally = "hbo";

      for(let ele of get_entries)
        if (ele[1] > platform_map.get(highest_tally)) {
          highest_tally = ele[0];
        }
        return highest_tally;
    }

    render() {
      const {moviesLoaded, showsLoaded} = this.state;

      if (!moviesLoaded && !showsLoaded) {
        return <div>Hang tight, we're doing awesome stuff...</div>
      } else {
        return(
            <Aux>
              <Advertisement 
                streamingPlatform={this.state.show_this_advertisement}/>
              <SearchFunction
                  searchState={this.state.search_state.user_query}
                  searchChangeHandler={this.searchQueryChangedHandler}
                  searchPerformedHandler={this.searchPerformedChangedHandler}
                  pressEnter={this.pressEnterHandler} />
              <Results
                  results={this.state.top_n_movies}
                  resultsClickedHandler={this.movieClickedHandler}
                />
            </Aux>
        );
        }
    }
}

export default MarketedSearch;