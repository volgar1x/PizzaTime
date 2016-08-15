import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import TraktService from '../Services/Trakt'

import MovieListView from '../Components/MovieListView'
import {Sizes} from '../Theme'


class Movies extends Component {
  constructor(props, context) {
    super(props, context)

    const trakt = new TraktService()

    this.state = {
      fail: false,
      loading: true,
      movies: [],
    }

    trakt.getMovies()
    .then((movies) => {
      this.setState({
        loading: false,
        movies,
      })
    })
    .catch((err) => {
      this.setState({
        failure: err,
        loading: false,
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MovieListView movies={this.state.movies} onSelectMovie={this._selectMovie}/>
      </View>
    )
  }

  _selectMovie = (movie) => {
    Actions.movie({movie, title: movie.title})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Sizes.navBar,
  },
})

export default Movies
