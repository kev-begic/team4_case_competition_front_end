import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'
import SearchFunction from '../../components/SearchFunction/SearchFunction';
import Advertisement from '../../components/Advertisement/Advertisement';
import Results from '../../components/results/Results'
import ClickedMovie from '../../components/ClickedContent/ClickedMovie';
import ClickedShow from '../../components/ClickedContent/ClickedShow';

import postUserID from '../../api/post/postUserID'
import postState from '../../api/post/postState'

class MarketedSearch extends Component {
    state = {
        all_movies: [],
        all_shows: [],

        moviesLoaded: false,
        showsLoaded: false,
        allLoaded: false,

        uniqueID: 0, // userID 
        top_n_movies: [ ],
        show_this_advertisement: "netflix", //topStreamingPlatformForSearch

        search_state : {
            user_query: "", // userQuery
            is_search_performed: false // searchPerformed
        },

        clicked_movie_state : {
            movie_clicked: false, // movieClicked
            is_movie: false,
            clicked_movie_id : "", // movieID
            clicked_movie_obj: { },
            streaming_platform : "hbo", // taken from max of top_n_movies
            movies_on_platform : []
        }
    };

    sendPostState( payload ) {
      console.log('sending updated state to endpoing2');
      console.log( payload );
      postState(payload);
    }

    // Source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
    createUniqueIdentifier() {
      let dt = new Date().getTime();
      let uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
      });
      return uuid;
    }

    componentDidMount() {
      this.renderMovies();
      this.renderShows();
      
      window.addEventListener("beforeunload", this.sendPostState);

      let newUserID = this.createUniqueIdentifier();
      
      this.setState({
        uniqueID : newUserID
      });

      console.log("sending new userID to endpoint1");
      postUserID(newUserID);
      console.log(newUserID);
    }

    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.sendPostState);
    }

    // Clears search_state
    resetSearchState = () => {
      let updatedSearchState = {
          ...this.state.search_state
      };
      
      updatedSearchState.user_query = "";
      updatedSearchState.is_search_performed = false;

      return updatedSearchState;
    }   

    // Clears clicked_movie_state
    resetMovieState = () => {
      let updatedMovieState = {
          ...this.state.clicked_movie_state
      };

      updatedMovieState.movie_clicked = false;
      updatedMovieState.is_movie = false;
      updatedMovieState.clicked_movie_id = " ";
      updatedMovieState.top_streaming_platform = "hbo";
      updatedMovieState.movies_on_platform = [ ];
      updatedMovieState.clicked_movie_obj = { };

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

    renderMovieById (id) {
      fetch('https://casecomp.konnectrv.io/movie/' + id)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState(prevState => ({
              clicked_movie_state : {
                ...prevState.clicked_movie_state,
                clicked_movie_obj : responseJson,
                streaming_platform : responseJson.streaming_platform.join(" ")
              },
              show_this_advertisement: responseJson.streaming_platform[0]
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
            this.setState(prevState => ({
              clicked_movie_state : {
                ...prevState.clicked_movie_state,
                clicked_movie_obj : responseJson,
                streaming_platform : responseJson.streaming_platform.join(" ")
              },
              show_this_advertisement: responseJson.streaming_platform[0]
            }))
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

    searchOccuredParsed( isSearch, infoOne = "", movieStreamingPlatform= "" ) {
      let parsedState = { };

      // General state
      parsedState.userID = this.state.uniqueID;

      if ( isSearch ) {
        parsedState.topStreamingPlatformForSearch = infoOne;

        // Search State
        parsedState.searchPerformed = true;
        parsedState.userQuery = this.state.search_state.user_query;

        // Result state
        parsedState.movieClicked = false;
        parsedState.movieID = "";
        parsedState.movieStreamingPlatform = "";
      } else {
        parsedState.topStreamingPlatformForSearch = "";

        parsedState.searchPerformed = false;
        parsedState.userQuery = "";
  
        // Result state
        parsedState.movieClicked = true;
        parsedState.movieID = infoOne;
        parsedState.movieStreamingPlatform = movieStreamingPlatform;
      }

      return parsedState;
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

      let parsedState = this.searchOccuredParsed(true, top_stream);

      this.setState({
        search_state : updatedSearchState,
        top_n_movies : movies_array,
        show_this_advertisement : top_stream,
        clicked_movie_state: this.resetMovieState()
      }, this.sendPostState(parsedState));
    }

    movieClickedHandler = (event) => {

        const newListingId = event.currentTarget.getAttribute('id');
        this.renderMovieById(newListingId);

        let suggested_movies = this.populateTopMoviesFromSearch(2);

        let isMovie = false;
        if ('release_date' in suggested_movies[0]) {
          isMovie = true;
        }

        suggested_movies.slice(1, 4);

        let updatedResult = {
            ...this.state.clicked_movie_state
        };

        updatedResult.clicked_movie_id = newListingId;
        updatedResult.movie_clicked = true;
        updatedResult.movies_on_platform = suggested_movies;
        updatedResult.is_movie = isMovie;

        const platforms = event.currentTarget.getAttribute('platforms');

        let parsedState = this.searchOccuredParsed(false, newListingId, platforms);

        this.setState({
            clicked_movie_state : updatedResult, 
            search_state : this.resetSearchState()
        }, this.sendPostState(parsedState));
        console.log("end movie click handler");
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

    determineClickedContent() {
      let resultObject;
      for ( let i = 0; i < this.state.top_n_movies.length; ++i ) {
        if ( this.state.top_n_movies[i].imdb === this.state.clicked_movie_state.clicked_movie_id) {
          resultObject = this.state.top_n_movies[i];
        }
      }

      if ('release_date' in resultObject) {
        return (<ClickedMovie movie={resultObject} />);
      }
      return (<ClickedShow show={resultObject} />);
    }

    determineConditionalRender () {
      console.log("calling conditionalRender");

      if ( !this.state.clicked_movie_state.movie_clicked ) {
        return (
          <Results
            results={this.state.top_n_movies}
            resultsClickedHandler={this.movieClickedHandler} /> 
        );
      };

      return this.determineClickedContent();
    };

    render() {
      const { moviesLoaded, showsLoaded } = this.state;

      if (!moviesLoaded && !showsLoaded) {
        return <div>Hang tight, we're doing awesome stuff...</div>
      } else {
        let bottom = this.determineConditionalRender();
        return(
            <Aux>
              <Advertisement 
                streamingPlatform={this.state.show_this_advertisement} />
              <SearchFunction
                searchState={this.state.search_state.user_query}
                searchChangeHandler={this.searchQueryChangedHandler}
                searchPerformedHandler={this.searchPerformedChangedHandler}
                pressEnter={this.pressEnterHandler} />
              { bottom }
            </Aux>
        );
        }
    }
}

export default MarketedSearch;