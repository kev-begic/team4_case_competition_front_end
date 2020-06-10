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
      movies_array = this.populateTopMoviesFromSearch();
      if (movies_array.length === 0) {
        movies_array = this.getContentFromPlatform("netflix");
        console.log(movies_array);
      }

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
        console.log(event.currentTarget);
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

    // based on user search query, get 10+ matching movies/shows to display
    populateTopMoviesFromSearch() {
      // combines all_shows and all_movies arrays
      let all_content_array = this.state.all_movies.concat(this.state.all_shows).sort();
      let exact_matches = [];
      let query_array = this.state.search_state.user_query.toLowerCase().split(" ");
      if (query_array.length === 1) {
        // look for titles that have same first word as a single term query
        exact_matches = all_content_array.filter(content => content.title.toLowerCase().split(" ")[0].includes(query_array[0]));
      } else {
        // look for exact query matches
        exact_matches = all_content_array.filter(content => content.title.toLowerCase().includes(this.state.search_state.user_query.toLowerCase()));
      }

      let just_titles = exact_matches.map(movie => movie.title);
      let filtered_out_matches = all_content_array.filter(content => !just_titles.includes(content.title));
      if (exact_matches.length < 10 && query_array.length > 1) {
        let first_word_matches = filtered_out_matches.filter(content => content.title.toLowerCase().split(" ")[0].includes(query_array[0]));
        let new_matches = exact_matches.concat(first_word_matches);
        if (new_matches.length < 10) {
          return this.getMoreMatchingTitles(new_matches, query_array);
        } else {
          return new_matches
        }

      } else if (exact_matches.length < 10) {
        let new_matches = filtered_out_matches.filter(content => content.title.toLowerCase().includes(this.state.search_state.user_query.toLowerCase()));
        if (new_matches.length < 10) {
          return this.getMoreMatchingTitles(new_matches, query_array);
        } else {
          return new_matches
        }

      } else {
        return exact_matches;
      }
    }

    // if not enough matches, filter on less words in the query - recur until 10 matches found
    getMoreMatchingTitles(exact_matches, query_array) {
      if (exact_matches.lenght >= 10 | query_array.length === 0) {
        return exact_matches;
      } else {
        let all_content_array = this.state.all_movies.concat(this.state.all_shows).sort();
        let join_query = query_array.join(" ");
        let just_titles = exact_matches.map(content => content.title);
        let filtered_out_matches = all_content_array.filter(content => !just_titles.includes(content.title));
        let new_matches = filtered_out_matches.filter(content => content.title.toLowerCase().includes(join_query.toLowerCase()));
        // combine original matches with new matches
        let joined_array = exact_matches.concat(new_matches);
        // shorten the search query by one term each iteration
        query_array.pop();
        return this.getMoreMatchingTitles(joined_array, query_array);
      }
    }

    // function is called if no results returned from search
    getContentFromPlatform(platform) {
      let all_content_array = this.state.all_movies.concat(this.state.all_shows).sort();
      return all_content_array.filter(content => content.streaming_platform.includes(platform));
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
      let suggested = [];
      let resultObject = null;
      for ( let i = 0; i < this.state.top_n_movies.length; ++i ) {
        console.log(this.state.top_n_movies[i].imdb, this.state.clicked_movie_state.clicked_movie_id);
        if ( this.state.top_n_movies[i].imdb === this.state.clicked_movie_state.clicked_movie_id) {
          resultObject = this.state.top_n_movies[i];
        } else {
          suggested.push(this.state.top_n_movies[i]);
        }
      }

      // making sure there are at least three recommended movies at all times, this could be better with an
      //algorithm based on description or some other heuristic in the future 
      let i = 0;
      while(suggested.length < 3){
        let currentMovie = this.state.all_movies[i];
        if ( !(currentMovie.imdb === this.state.clicked_movie_state.clicked_movie_id)) {
            if (currentMovie.streaming_platform.includes(this.state.clicked_movie_state.streaming_platform)){
              suggested.push(this.state.all_movies[i]);
            }
          }
          i++;

      }

      if ('release_date' in resultObject) {
        return (
        <ClickedMovie 
          movie={resultObject} 
          otherResults={suggested} 
          resultsClickedHandler={this.movieClickedHandler}/>
        );
      }
      return (
        <ClickedShow 
          show={resultObject} 
          otherResults={suggested} 
          resultsClickedHandler={this.movieClickedHandler} 
      />);
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
