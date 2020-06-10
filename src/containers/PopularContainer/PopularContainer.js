import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './PopularContainer.module.css';

class PopularContainer extends Component {
    state = {
        mostClickedMovieLoaded: false,
        mostClickedMovieIdLoaded: false,
        mostCommonPlatformLoaded: false,
        mostClickedShowIdLoaded: false,
        mostClickedMovie: "Tarzan",
        mostClickedMovieId: "id",
        mostCommonPlatform: "Bazinga"
    }

    componentDidMount() {
        this.getMostClickedMovieId();
        this.getMostCommonPlatform();
    }
    getMostClickedMovieById (id) {
      fetch('https://casecomp.konnectrv.io/movie/' + id)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              mostClickedMovieIdLoaded: true,
              mostClickedMovie: responseJson.title
            })
          })
          .catch((error) => {
            console.error(error);
          });
    }
    getMostClickedShowById (id) {
      fetch('https://casecomp.konnectrv.io/show/' + id)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              mostClickedShowIdLoaded: true,
              mostClickedMovie: responseJson.title
            })
          })
          .catch((error) => {
            console.error(error);
          });
    }
    getMostClickedMovieId() {
      const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
      }
    fetch('https://7b1is9shg5.execute-api.us-east-2.amazonaws.com/FirstProd/topmovie', options)
        .then((response) => response.json())
        .then((response) => {
          if (response.isMovie === '1') {
          this.getMostClickedMovieById(response.id)
          } else {
            this.getMostClciekdShowbyId(response.id)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getMostCommonPlatform() {
      fetch('https://7b1is9shg5.execute-api.us-east-2.amazonaws.com/FirstProd/topplatform')
          .then((response) => response.text())
          .then((responseJson) => {
            this.setState({
              mostCommonPlatformLoaded : true,
              mostCommonPlatform : responseJson.replace(/"/g, "")
            })
        })
        .catch((error) => {
          console.log(error);
        });
    }
    render() {
      const {mostClickedMovieIdLoaded, mostCommonPlatformLoaded} = this.state;
      if (!mostClickedMovieIdLoaded && !mostCommonPlatformLoaded) {
        return (
          <Aux>
              <span>Top Movie: temp</span>
              <span>Top Platform: temp</span>
          </Aux>
        )
      } else {
      return (
        <Aux>
            <span>Top Feature: {this.state.mostClickedMovie}</span>
            <span className={classes.Capitalize}>Top Platform: {this.state.mostCommonPlatform}</span>
        </Aux>
      )
    }
  }
}

export default PopularContainer;